import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import MainButton from '../MainButton'
import MoreInfo from '../../assets/more-info.png'
import React, { useRef } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import MoreOptions from "../../components/MoreOptions"

const movies = [
    { id: "1", uri: require('../../assets/1.jpg') },
    { id: "2", uri: require('../../assets/2.jpg') },
    { id: "3", uri: require('../../assets/3.jpg') },
    { id: "4", uri: require('../../assets/4.jpg') },
    { id: "5", uri: require('../../assets/5.jpg') },
]
const numColumns = 3;
const size = (Dimensions.get('window').width / numColumns) - (Dimensions.get('window').width * 0.015);

function MoviesSeen({ navigation }) {

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

            <Text style={styles.title}>Movies You Have Seen</Text>
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
                numColumns={numColumns} />
            <MainButton buttonColor="#FF3D60" textColor="white" text="Next" onPress={() => navigation.navigate("Sync Contacts")} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "95%",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 100,
    },
    title: {
        color: "black",
        width: "100%",
        marginTop: 70,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    grid: {
        marginTop: 20,
        width: "100%",
        flexGrow: 1,
        marginLeft: 15,
        height: "50%"
    },
    itemContainer: {
        width: size,
        height: 170,
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
        top: 10,
        right: 10
    },
});

export default MoviesSeen;
