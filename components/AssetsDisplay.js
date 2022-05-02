import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import MoreInfo from '../assets/more-info.png'
import RBSheet from "react-native-raw-bottom-sheet";
import MoreOptions from "../components/MoreOptions"
import React, { useRef, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import FilterBy from './FilterBy';

const size = (Dimensions.get('window').width / 3) - (Dimensions.get('window').width * 0.035);

const movies = [
    { id: "1", uri: require('../assets/1.jpg') },
    { id: "2", uri: require('../assets/2.jpg') },
    { id: "3", uri: require('../assets/3.jpg') },
    { id: "4", uri: require('../assets/4.jpg') },
    { id: "5", uri: require('../assets/5.jpg') },
    { id: "6", uri: require('../assets/1.jpg') },
    { id: "7", uri: require('../assets/2.jpg') },
    { id: "8", uri: require('../assets/3.jpg') },
    { id: "9", uri: require('../assets/4.jpg') },
    { id: "10", uri: require('../assets/5.jpg') },
    { id: "11", uri: require('../assets/1.jpg') },
    { id: "12", uri: require('../assets/2.jpg') },
    { id: "13", uri: require('../assets/3.jpg') },
    { id: "14", uri: require('../assets/4.jpg') },
    { id: "15", uri: require('../assets/5.jpg') },
    { id: "16", uri: require('../assets/1.jpg') },
    { id: "17", uri: require('../assets/2.jpg') },
    { id: "18", uri: require('../assets/3.jpg') },
    { id: "19", uri: require('../assets/4.jpg') },
    { id: "20", uri: require('../assets/5.jpg') },
]

function HeaderRight() {
    const refRBSheet = useRef();
    function moreInfoOnMovie() {
        console.log("cool")
        refRBSheet.current.open()
    }

    return (
        <View style={{ display: "flex", flexDirection: "row"}}>
            <RBSheet
                ref={refRBSheet}
                height={650}
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
                <FilterBy />
            </RBSheet>
            <TouchableOpacity style={{marginRight: 15}}>
                <Ionicons name="search-outline" size={24}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 5}} onPress={moreInfoOnMovie}>
                <Ionicons name="filter-outline" size={24}></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

function AssetsDisplay({ route, navigation }) {

    const { title } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: JSON.stringify(title).replace(/"/g, ''),
            title: "",
            headerRight: () => (
                <HeaderRight />
            ),
        })
    }, [navigation]);

    const refRBSheet = useRef();
    function moreInfoOnMovie() {
        refRBSheet.current.open()
    }

    return (
        <View style={styles.mainView}>
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
                <MoreOptions />
            </RBSheet>

            <FlatList
                data={movies}
                style={styles.grid}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={moreInfoOnMovie}>
                        <Image style={styles.item} source={item.uri}></Image>
                        <Image style={styles.moreInfo} source={MoreInfo}></Image>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={3} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
        backgroundColor: "white"
    },
    grid: {
        marginTop: 10,
        width: "90%",
        flexGrow: 1,
        height: "100%",
        marginBottom: 50
    },
    itemContainer: {
        width: size,
        height: 160,
    },
    item: {
        flex: 1,
        margin: 3,
        backgroundColor: 'white',
        width: null,
        height: null,
        resizeMode: 'stretch',
        borderRadius: 8,
    },
    moreInfo: {
        position: "absolute",
        top: 10,
        right: 10
    },
});


export default AssetsDisplay;
