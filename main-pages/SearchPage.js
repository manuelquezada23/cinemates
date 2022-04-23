import { View, Text, StyleSheet, Image, FlatList, Button, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Searchbar } from 'react-native-paper';
import MoreInfo from '../assets/more-info.png'
import IconFiller from '../assets/icon-filler.png'
import RBSheet from "react-native-raw-bottom-sheet";
import MoreOptions from "../components/MoreOptions"

const movies = [
  { id: "1", uri: require('../assets/1.jpg') },
  { id: "2", uri: require('../assets/2.jpg') },
  { id: "3", uri: require('../assets/3.jpg') },
  { id: "4", uri: require('../assets/4.jpg') },
  { id: "5", uri: require('../assets/5.jpg') },
]

const contacts = [
  { id: "1", name: "Theana Doe", info: "Followed By Arlene McCoy" },
  { id: "2", name: "Theba Anderson", info: "Followed By Arlene McCoy" },
  { id: "3", name: "Theroa Waston", info: "Followed By Arlene McCoy" },
  { id: "4", name: "Thenax Fox", info: "Followed By Arlene McCoy" }
]

function SearchPage({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query)
  }

  const refRBSheet = useRef();

  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.topHeader}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.cancelButton}>
          <Button title="Cancel" color="black" />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Top Content</Text>
        <View style={styles.button}>
          <Button title="View All" color="#FF3D60" />
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
        <MoreOptions/>
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
    // flex: 1,
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
});

export default SearchPage;
