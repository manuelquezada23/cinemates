import { View, Text, StyleSheet, Image, FlatList, Button, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import MoreInfo from '../assets/more-info.png'
import IconFiller from '../assets/icon-filler.png'
import RBSheet from "react-native-raw-bottom-sheet";
import MoreOptions from "../components/MoreOptions"
import { Ionicons } from '@expo/vector-icons';

const size = (Dimensions.get('window').width / 3) - (Dimensions.get('window').width * 0.035);

const movies = [
  { id: "1", uri: require('../assets/1.jpg') },
  { id: "2", uri: require('../assets/2.jpg') },
  { id: "3", uri: require('../assets/3.jpg') },
  { id: "4", uri: require('../assets/4.jpg') },
  { id: "5", uri: require('../assets/5.jpg') },
]

const assetsDisplay = [
  { id: "1", uri: require('../assets/1.jpg'), type: "movie" },
  { id: "2", uri: require('../assets/2.jpg'), type: "show" },
  { id: "3", uri: require('../assets/3.jpg'), type: "movie" },
  { id: "4", uri: require('../assets/4.jpg'), type: "show" },
  { id: "5", uri: require('../assets/5.jpg'), type: "movie" },
  { id: "6", uri: require('../assets/1.jpg'), type: "show" },
  { id: "7", uri: require('../assets/2.jpg'), type: "movie" },
  { id: "8", uri: require('../assets/3.jpg'), type: "show" },
  { id: "9", uri: require('../assets/4.jpg'), type: "movie" },
  { id: "10", uri: require('../assets/5.jpg'), type: "show" },
  { id: "11", uri: require('../assets/1.jpg'), type: "movie" },
  { id: "12", uri: require('../assets/2.jpg'), type: "show" },
  { id: "13", uri: require('../assets/3.jpg'), type: "movie" },
  { id: "14", uri: require('../assets/4.jpg'), type: "show" },
  { id: "15", uri: require('../assets/5.jpg'), type: "movie" },
  { id: "16", uri: require('../assets/1.jpg'), type: "show" },
  { id: "17", uri: require('../assets/2.jpg'), type: "movie" },
  { id: "18", uri: require('../assets/3.jpg'), type: "show" },
  { id: "19", uri: require('../assets/4.jpg'), type: "movie" },
  { id: "20", uri: require('../assets/5.jpg'), type: "show" },
]

const contactsDisplay = [
  { id: "1", name: "Manuel Quezada", info: "Followed by Arlene McCoy" },
  { id: "2", name: "Esteban Gonzalez", info: "Followed by Arlene McCoy" },
  { id: "3", name: "Jaime Torres", info: "Followed by Arlene McCoy" },
  { id: "4", name: "Aixa Belmont", info: "Followed by Arlene McCoy" },
  { id: "5", name: "Maya Fleischer", info: "Followed by Arlene McCoy" },
  { id: "6", name: "Jose Urruticoechea", info: "Followed by Arlene McCoy" },
  { id: "7", name: "Tatiana Mandis", info: "Followed by Arlene McCoy" },
  { id: "8", name: "Ethan Polley", info: "Followed by Arlene McCoy" },
  { id: "9", name: "Laeticia Cherfan", info: "Followed by Arlene McCoy" },
  { id: "10", name: "Kyra Haddad", info: "Followed by Arlene McCoy" },
  { id: "11", name: "Sofia Vaca Narvaja", info: "Followed by Arlene McCoy" },
  { id: "12", name: "Mariana Alvaro", info: "Followed by Arlene McCoy" },
  { id: "13", name: "Daniel Civita", info: "Followed by Arlene McCoy" },
  { id: "14", name: "Daniel Erath", info: "Followed by Arlene McCoy" },
  { id: "15", name: "Josh Gindi", info: "Followed by Arlene McCoy" },
]

const contacts = [
  { id: "1", name: "Theana Doe", info: "Followed By Arlene McCoy" },
  { id: "2", name: "Theba Anderson", info: "Followed By Arlene McCoy" },
  { id: "3", name: "Theroa Waston", info: "Followed By Arlene McCoy" },
  { id: "4", name: "Thenax Fox", info: "Followed By Arlene McCoy" }
]

function SearchPage({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchBarPressed, setSearchBarPressed] = React.useState(false);
  const [content, setContent] = useState(true)
  const [users, setUsers] = useState(false)
  const [movieFilter, setMovieFilter] = useState(false)
  const [tvShowsFilter, setTVShowsFilter] = useState(false)

  const [assets, setAssets] = useState(assetsDisplay)

  const onChangeSearch = (query) => {
    if (query.length === 0) {
      setSearchBarPressed(false)
      setSearchQuery('')
    } else {
      setSearchBarPressed(true)
      setSearchQuery(query)
    }

    let filteredAssets = assetsDisplay.slice();
    //filter content
    if (content) {
      //movie filter
      if (movieFilter && !tvShowsFilter) {
        filteredAssets = filteredAssets.filter(f => (f.type === "movie"))
      }
      //tv shows filter
      else if (tvShowsFilter && !movieFilter) {
        filteredAssets = filteredAssets.filter(f => (f.type === "show"))
      }
      //search both
      else {

      }
    }
    setAssets(filteredAssets)
  }

  const clearSearch = () => {
    setSearchBarPressed(false)
    setSearchQuery('')
  }

  const refRBSheet = useRef();

  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }

  function SearchPopUp() {

    function changeTab(tab) {
      if (tab === "users") {
        setContent(false)
        setUsers(true)
      } else {
        setContent(true)
        setUsers(false)
      }
    }

    function setFilter(filter) {
      if (filter === "movie") {
        if (movieFilter) {
          setMovieFilter(false)
        } else {
          setMovieFilter(true)
          setTVShowsFilter(false)
        }
      } else {
        if (tvShowsFilter) {
          setTVShowsFilter(false)
        } else {
          setTVShowsFilter(true)
          setMovieFilter(false)
        }
      }
    }

    return (
      <View style={styles.searchPopUp}>
        <View style={styles.searchPopUpTabs}>
          <TouchableOpacity style={content ? styles.searchPopUpTab : styles.searchPopUpTabSelected} onPress={() => { changeTab("content") }}>
            <Text style={styles.searchPopUpTabText}>Content</Text>
          </TouchableOpacity>
          <TouchableOpacity style={users ? styles.searchPopUpTab : styles.searchPopUpTabSelected} onPress={() => { changeTab("users") }}>
            <Text style={styles.searchPopUpTabText}>Users</Text>
          </TouchableOpacity>
        </View>

        {content &&
          <View style={styles.contentSearchView}>
            <View style={styles.contentSearchViewFilters}>
              <TouchableOpacity style={movieFilter ? styles.contentSearchViewFilter : styles.contentSearchViewFilterSelected} onPress={() => { setFilter("movie") }}>
                <Text>Movie</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tvShowsFilter ? styles.contentSearchViewFilter : styles.contentSearchViewFilterSelected} onPress={() => { setFilter("tvShows") }}>
                <Text>TV Shows</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={assets}
              style={styles.movieDisplayGrid}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.movieDisplayItemContainer}>
                  <Image style={styles.movieDisplayItem} source={item.uri}></Image>
                  <Image style={styles.movieDisplayMoreInfo} source={MoreInfo}></Image>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              numColumns={3} />
          </View>
        }

        {users &&
          <View style={styles.contentSearchView}>
            <FlatList
              data={contactsDisplay}
              style={styles.searchViewUsers}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.userItemContainer}>
                  <Image style={styles.contactPicture} source={IconFiller}></Image>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.subName}>{item.info}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
              numColumns={1}
            />
          </View>
        }
      </View>
    )
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <Searchbar
          placeholder="Search"
          selectionColor={"black"}
          onChangeText={onChangeSearch}
          clearIcon={<Ionicons name="star"></Ionicons>}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.cancelButton}>
          <Button title="Cancel" color="black" onPress={clearSearch} />
        </View>
      </View>

      {!searchBarPressed &&
        <React.Fragment>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Top Content</Text>
            <View style={styles.button}>
              <Button title="View All" color="#FF3D60" onPress={() => { navigation.navigate("AssetsDisplay", { title: "Top Content" }) }} />
            </View>
          </View>

          <FlatList
            data={movies}
            style={styles.movieGrid}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer} onPress={moreInfoOnMovie}>
                <Image style={styles.item} source={item.uri}></Image>
                <Image style={styles.moreInfo} source={MoreInfo}></Image>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            horizontal={true} />

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent"
              },
              draggableIcon: {
                backgroundColor: "#000"
              }
            }}
          >
            <MoreOptions sheet={refRBSheet} />
          </RBSheet>

          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Top Users</Text>
            <View style={styles.button}>
              <Button title="View All" color="#FF3D60" />
            </View>
          </View>

          <FlatList
            data={contacts}
            style={styles.userGrid}
            renderItem={({ item }) => (
              <View style={styles.userItemContainer}>
                <Image style={styles.contactPicture} source={IconFiller}></Image>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.subName}>{item.info}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={1}
          />
        </React.Fragment>
      }
      {searchBarPressed &&
        <SearchPopUp />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  topHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 60
  },
  searchBar: {
    borderRadius: 8,
    borderColor: "#CCCCCC",
    height: 32,
    width: "70%",
    top: 60,
    left: 20,
  },
  cancelButton: {
    position: "absolute",
    top: 60,
    right: 15
  },
  sectionHeader: {
    width: "100%",
    height: 50,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 18,
    lineHeight: 50,
    fontWeight: "bold",
    left: 20
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 15,
    fontSize: 12
  },
  movieGrid: {
    width: "auto",
    maxHeight: 130,
    flexGrow: 1,
    marginLeft: 20,
    marginRight: 20,
    height: "auto",
  },
  itemContainer: {
    width: 90,
    height: 130,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
    width: null,
    height: null,
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  moreInfo: {
    position: "absolute",
    top: 5,
    right: 5
  },
  userGrid: {
    flexGrow: 1,
    marginLeft: 20,
    height: 50
  },
  userItemContainer: {
    width: "93%",
    height: 50,
    marginTop: 5
  },
  contactPicture: {
    margin: 3,
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  contactName: {
    position: "absolute",
    left: 55,
    top: 8,
    fontSize: 16,
    fontWeight: "bold"
  },
  subName: {
    color: "#777777",
    position: "absolute",
    left: 55,
    top: 30,
    fontSize: 12
  },
  searchPopUp: {
    marginLeft: 20,
    marginRight: 20
  },
  searchPopUpTabs: {
    height: 35,
    backgroundColor: "#F2F2F2",
    marginTop: 15,
    borderRadius: 8,
    padding: 3,
    display: "flex",
    flexDirection: "row"
  },
  searchPopUpTab: {
    height: "100%",
    backgroundColor: "white",
    width: "50%",
    borderRadius: 6,
    justifyContent: "center"
  },
  searchPopUpTabSelected: {
    height: "100%",
    backgroundColor: "transparent",
    width: "50%",
    borderRadius: 6,
    justifyContent: "center"
  },
  searchPopUpTabText: {
    textAlign: "center"
  },
  contentSearchView: {
    display: "flex",
    flexDirection: "column",
    marginTop: 15
  },
  contentSearchViewFilters: {
    display: "flex",
    flexDirection: "row"
  },
  contentSearchViewFilter: {
    height: 30,
    borderRadius: 100,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10
  },
  contentSearchViewFilterSelected: {
    height: 30,
    borderRadius: 100,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10
  },
  movieDisplayItemContainer: {
    width: size,
    height: 160,
  },
  movieDisplayItem: {
    flex: 1,
    margin: 3,
    backgroundColor: 'white',
    width: null,
    height: null,
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  movieDisplayMoreInfo: {
    position: "absolute",
    top: 10,
    right: 10
  },
  movieDisplayGrid: {
    marginTop: 10,
    height: "80%"
  },
  searchViewUsers: {
    height: "85%"
  }
});

export default SearchPage;
