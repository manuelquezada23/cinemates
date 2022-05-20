import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Button, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../assets/icon-filler.png'

const assetsDisplay = [
    { id: "1", uri: require('../assets/1.jpg'), type: "movie", title: "Joker", selected: false },
    { id: "2", uri: require('../assets/2.jpg'), type: "show", title: "Star Wars", selected: false },
    { id: "3", uri: require('../assets/3.jpg'), type: "movie", title: "Uncharted", selected: false },
    { id: "4", uri: require('../assets/4.jpg'), type: "show", title: "Encanto", selected: false },
    { id: "5", uri: require('../assets/5.jpg'), type: "movie", title: "Star Wars", selected: false },
    { id: "6", uri: require('../assets/1.jpg'), type: "show", title: "Joker", selected: false },
    { id: "7", uri: require('../assets/2.jpg'), type: "movie", title: "Star Wars", selected: false },
    { id: "8", uri: require('../assets/3.jpg'), type: "show", title: "Uncharted", selected: false },
    { id: "9", uri: require('../assets/4.jpg'), type: "movie", title: "Encanto", selected: false },
    { id: "10", uri: require('../assets/5.jpg'), type: "show", title: "Star Wars", selected: false },
    { id: "11", uri: require('../assets/1.jpg'), type: "movie", title: "Joker", selected: false },
    { id: "12", uri: require('../assets/2.jpg'), type: "show", title: "Star Wars", selected: false },
    { id: "13", uri: require('../assets/3.jpg'), type: "movie", title: "Uncharted", selected: false },
    { id: "14", uri: require('../assets/4.jpg'), type: "show", title: "Encanto", selected: false },
    { id: "15", uri: require('../assets/5.jpg'), type: "movie", title: "Star Wars", selected: false },
    { id: "16", uri: require('../assets/1.jpg'), type: "show", title: "Joker", selected: false },
    { id: "17", uri: require('../assets/2.jpg'), type: "movie", title: "Star Wars", selected: false },
    { id: "18", uri: require('../assets/3.jpg'), type: "show", title: "Uncharted", selected: false },
    { id: "19", uri: require('../assets/4.jpg'), type: "movie", title: "Encanto", selected: false },
    { id: "20", uri: require('../assets/5.jpg'), type: "show", title: "Star Wars", selected: false },
]

function SendRecommendation({ navigation, route }) {
    const { name } = route.params
    const { request } = route.params
    const { color } = route.params

    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchBarPressed, setSearchBarPressed] = React.useState(false);
    const [movieFilter, setMovieFilter] = useState(false)
    const [tvShowsFilter, setTVShowsFilter] = useState(false)
    const [assets, setAssets] = useState(assetsDisplay)
    const [bottomBarHeight, setHeight] = useState(80)
    const [messageOffset, setMessageOffset] = useState(30)
    const [showMessage, setShowMessage] = useState(false)
    const [fadeAnim] = useState(new Animated.Value(0));

    const [text, setText] = useState('')
    const [disableSend, setDisableSend] = useState(true)

    const onChangeText = (text) => {
        setText(text)
        if (text.length === 0) {
            setDisableSend(true)
        } else {
            setDisableSend(false)
        }
    }

    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const onKeyboardShow = event => {
        setKeyboardOffset(event.endCoordinates.height)
        setHeight(60)
        setMessageOffset(0)
    }
    const onKeyboardHide = () => {
        setKeyboardOffset(0);
        setHeight(80)
        setMessageOffset(30)
    }
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    useEffect(() => {
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

        return () => {
            keyboardDidShowListener.current.remove();
            keyboardDidHideListener.current.remove();
        };
    }, []);

    const onChangeSearch = (query) => {
        if (query.length === 0) {
            setSearchBarPressed(false)
            setSearchQuery('')
            setAssets(assetsDisplay)
            setMovieFilter(false)
            setTVShowsFilter(false)
        } else {
            setSearchBarPressed(true)
            setSearchQuery(query)

            let filteredAssets = assetsDisplay.slice();
            filteredAssets = filteredAssets.filter(f => (f.title.toLowerCase().includes(searchQuery.toLowerCase())))

            //movie filter
            if (movieFilter && !tvShowsFilter) {
                filteredAssets = filteredAssets.filter(f => (f.type === "movie"))
            }
            //tv shows filter
            else if (tvShowsFilter && !movieFilter) {
                filteredAssets = filteredAssets.filter(f => (f.type === "show"))
            }
            setAssets(filteredAssets)
        }
    }

    const clearSearch = () => {
        navigation.goBack()
    }

    function setFilter(filter) {
        if (filter === "movie") {
            if (movieFilter) {
                setMovieFilter(false)
                let filteredAssets = assetsDisplay.slice();
                filteredAssets = filteredAssets.filter(f => (f.title.toLowerCase().includes(searchQuery.toLowerCase())))
                setAssets(filteredAssets)
            } else {
                setMovieFilter(true)
                setTVShowsFilter(false)
                let filteredAssets = assetsDisplay.slice();
                filteredAssets = filteredAssets.filter(f => (f.title.toLowerCase().includes(searchQuery.toLowerCase())))
                filteredAssets = filteredAssets.filter(f => (f.type === "movie"))
                setAssets(filteredAssets)
            }
        } else {
            if (tvShowsFilter) {
                setTVShowsFilter(false)
                let filteredAssets = assetsDisplay.slice();
                filteredAssets = filteredAssets.filter(f => (f.title.toLowerCase().includes(searchQuery.toLowerCase())))
                setAssets(filteredAssets)
            } else {
                setTVShowsFilter(true)
                setMovieFilter(false)
                let filteredAssets = assetsDisplay.slice();
                filteredAssets = filteredAssets.filter(f => (f.title.toLowerCase().includes(searchQuery.toLowerCase())))
                filteredAssets = filteredAssets.filter(f => (f.type === "show"))
                setAssets(filteredAssets)
            }
        }
    }

    const styles = StyleSheet.create({
        mainView: {
            height: "100%",
            width: "100%",
            backgroundColor: "white",
        },
        subView: {
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            height: "80%"
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
        contentSearchViewFilters: {
            display: "flex",
            flexDirection: "row",
            marginTop: 10
        },
        contentSearchViewFilter: {
            height: 40,
            borderRadius: 100,
            borderColor: "#F2F2F2",
            borderWidth: 1,
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            paddingLeft: 15,
            paddingRight: 15,
            marginRight: 10
        },
        contentSearchViewFilterSelected: {
            height: 40,
            borderRadius: 100,
            borderColor: "#F2F2F2",
            borderWidth: 1,
            backgroundColor: "#F2F2F2",
            justifyContent: "center",
            paddingLeft: 15,
            paddingRight: 15,
            marginRight: 10
        },
        movieDisplayGrid: {
            marginTop: 10,
            height: "80%"
        },
        movieDisplayItemContainer: {
            height: 180,
            flex: 1 / 3
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
        sendMessageView: {
            height: bottomBarHeight,
            backgroundColor: "white",
            position: "absolute",
            bottom: keyboardOffset,
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "row"
        },
        sendMessagePicture: {
            marginLeft: 20,
            marginTop: 10,
            height: 35,
            width: 35,
            marginRight: 10
        },
        sendMessageInput: {
            height: 35,
            marginTop: 10,
            width: "70%"
        },
        sendMessageIcon: {
            right: 20,
            top: 15,
            position: "absolute"
        },
        selectedIconView: {
            position: "absolute",
            right: 5,
            bottom: 5,
            width: 25,
            height: 25,
            borderRadius: 12.5,
            backgroundColor: "#FF3D60",
            borderColor: "white",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        updateMessageView: {
            height: 50,
            backgroundColor: "#40AE2E",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: keyboardOffset - 85,
            marginBottom: messageOffset,
        },
        updateMessageViewIcon: {
            marginLeft: 30,
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
        },
        updateMessageViewText: {
            marginLeft: 15,
            color: "white",
            fontSize: 16,
        }
    });

    function Asset(props) {
        let selected = props.item.selected
        function selectAsset() {
            const newStatus = !selected;
            let assetsDuplicate = assets.slice();
            const index = assetsDuplicate.findIndex((obj => obj.id === props.item.id));
            assetsDuplicate[index].selected = newStatus
            setAssets(assetsDuplicate)
        }

        return (
            <TouchableOpacity style={styles.movieDisplayItemContainer} onPress={() => { selectAsset() }}>
                <Image style={styles.movieDisplayItem} source={props.item.uri} defaultSource={props.item.uri}></Image>
                {selected &&
                    <View style={styles.selectedIconView}>
                        <Ionicons name="checkmark-outline" color={"white"} size={15} />
                    </View>
                }
            </TouchableOpacity>
        )
    }

    function sendMessage() {
        setShowMessage(true)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            navigation.navigate("Cinemates", { name: name, request: request, color: color })
        }, 2000);
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.topHeader}>
                <Searchbar
                    placeholder="Search"
                    selectionColor={"black"}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                <View style={styles.cancelButton}>
                    <Button title="Cancel" color="black" onPress={clearSearch} />
                </View>
            </View>
            <View style={styles.subView}>
                <View style={styles.contentSearchViewFilters}>
                    <TouchableOpacity style={movieFilter ? styles.contentSearchViewFilter : styles.contentSearchViewFilterSelected} onPress={() => { setFilter("movie") }}>
                        <Text style={{ fontWeight: "bold" }}>Movies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tvShowsFilter ? styles.contentSearchViewFilter : styles.contentSearchViewFilterSelected} onPress={() => { setFilter("tvShows") }}>
                        <Text style={{ fontWeight: "bold" }}>TV Shows</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={assets}
                    style={styles.movieDisplayGrid}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Asset item={item} />
                    )}
                    keyExtractor={item => item.id}
                    numColumns={3} />
            </View>
            <KeyboardAvoidingView style={styles.sendMessageView}>
                <Image style={styles.sendMessagePicture} source={IconFiller}></Image>
                <TextInput
                    style={styles.sendMessageInput}
                    placeholder={"Add a comment.."}
                    selectionColor={"#FF3D60"}
                    value={text}
                    onChangeText={onChangeText}
                />

                <View style={styles.sendMessageIcon} opacity={disableSend ? 0.5 : 1}>
                    <TouchableOpacity onPress={() => { sendMessage() }}>
                        <Ionicons name="paper-plane" color={"#FF3D60"} size={25} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView>
                {showMessage &&
                    <Animated.View style={[styles.updateMessageView, { opacity: fadeAnim }]}>
                        <View style={styles.updateMessageViewIcon}>
                            <Ionicons name="checkmark-outline" color="#40AE2E" size={15} />
                        </View>
                        <Text style={styles.updateMessageViewText}>Your recommendations have been sent!</Text>
                    </Animated.View>
                }
            </KeyboardAvoidingView>
        </View>
    )
}

export default SendRecommendation;