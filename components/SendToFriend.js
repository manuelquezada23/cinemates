import { View, TouchableOpacity, StyleSheet, Image, Text, FlatList, TextInput, Share } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../assets/icon-filler.png';

const contactsData = [
    { id: "1", name: "Manuel Quezada", selected: false },
    { id: "2", name: "Esteban Gonzalez", selected: false },
    { id: "3", name: "Jaime Torres", selected: false },
    { id: "4", name: "Aixa Belmont", selected: false },
    { id: "5", name: "Maya Fleischer", selected: false },
    { id: "6", name: "Jose Urruticoechea", selected: false },
    { id: "7", name: "Tatiana Mandis", selected: false },
    { id: "8", name: "Ethan Polley", selected: false },
    { id: "9", name: "Laeticia Cherfan", selected: false },
    { id: "10", name: "Kyra Haddad", selected: false },
    { id: "11", name: "Sofia Vaca Narvaja", selected: false },
    { id: "12", name: "Mariana Alvaro", selected: false },
    { id: "13", name: "Daniel Civita", selected: false },
    { id: "14", name: "Daniel Erath", selected: false },
    { id: "15", name: "Josh Gindi", selected: false },
]


function SendToFriend({ navigation, route }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [input, onChangeText] = React.useState("");
    const [contacts, setContacts] = React.useState(contactsData);
    const [disabledInput, setDisabledInput] = useState(false)

    useEffect(() => {
        const RBSheet = route.params.sheet;
        RBSheet.current.close();
    })

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        if (query.length === 0) {
            setContacts(contactsData)
        } else {
            let filteredContacts = contacts.slice();
            filteredContacts = filteredContacts.filter(f => (f.name.toLowerCase().includes(searchQuery.toLowerCase())))
            setContacts(filteredContacts)
        }
    }

    const onChangeInput = (text) => {
        onChangeText(text)
        if (text.length === 0) {
            setDisabledInput(false)
        } else {
            setDisabledInput(true)
        }
    }

    async function moreOptions() {
        try {
            const result = await Share.share({
                message:
                    'Cool Cinemates message would go here!',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function RatingFlatListComponent(props) {
        let status = props.friend.selected

        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.checkIcon} onPress={() => {
                    const newStatus = !status;
                    let newContacts = contactsData.slice();
                    const index = newContacts.findIndex((obj => obj.id === props.friend.id));
                    newContacts[index].selected = newStatus
                    setContacts(newContacts)
                }}>
                    <Ionicons name={status ? "checkbox" : "square-outline"} size={25}></Ionicons>
                </TouchableOpacity>
                <Image style={styles.contactPicture} source={IconFiller}></Image>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{props.friend.name}</Text>
                    <Text style={styles.subName}>2k Followers</Text>
                </View>
            </View>
        );
    }

    return (
        <React.Fragment>
            <View style={styles.customHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back-outline" size={25}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Send to Friend</Text>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    selectionColor={"black"}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                <TouchableOpacity style={styles.moreOptions} onPress={() => { moreOptions() }}>
                    <Text style={styles.moreOptionsText}>More Options</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={contacts}
                style={styles.mainView}
                renderItem={({ item }) => (
                    <RatingFlatListComponent friend={item} />
                )}
                keyExtractor={item => item.id}
                numColumns={1} />
            <View style={styles.bottomBar}>
                <TextInput
                    style={styles.input}
                    placeholder={"Add a Comment"}
                    onChangeText={onChangeInput}
                    value={input}
                    selectionColor={"black"}
                />
                <TouchableOpacity disabled={disabledInput ? false : true}>
                    <View style={styles.sendIcon} opacity={disabledInput ? 1 : 0.5}>
                        <Ionicons name="paper-plane-outline" size={23} />
                    </View>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        flexGrow: 1,
        backgroundColor: "white"
    },
    customHeader: {
        display: "flex",
        flexDirection: "row",
        height: 140,
        backgroundColor: "white"
    },
    headerTitle: {
        position: "absolute",
        bottom: 62,
        left: 40,
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 20,
    },
    backButton: {
        position: "absolute",
        bottom: 60,
        left: 0,
        marginLeft: 20,
    },
    searchBar: {
        position: "absolute",
        bottom: 10,
        left: 0,
        backgroundColor: "#F2F2F2",
        marginLeft: 20,
        height: 30,
        width: "90%",
    },
    checkIcon: {
        justifyContent: "center"
    },
    itemContainer: {
        width: "93%",
        height: 55,
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: 20
    },
    contactPicture: {
        margin: 3,
        width: 40,
        height: 40,
        resizeMode: 'stretch',
        borderRadius: 8,
        alignSelf: "center",
        marginLeft: 10,
    },
    contactName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    subName: {
        color: "#777777",
        fontSize: 12
    },
    contactInfo: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10,
        width: "77%",
        justifyContent: "center"
    },
    bottomBar: {
        width: "100%",
        height: 100,
        backgroundColor: "white",
    },
    input: {
        position: "absolute",
        top: 15,
        left: 20,
        height: 45,
        width: "75%",
        borderRadius: 100,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderColor: "#F2F2F2"
    },
    sendIcon: {
        width: 40,
        height: 40,
        position: "absolute",
        top: 20,
        right: 20,
        borderRadius: 20,
        backgroundColor: "#FF3D60",
        justifyContent: "center",
        alignItems: "center"
    },
    moreOptions: {
        position: "absolute",
        right: 20,
        bottom: 62
    },
    moreOptionsText: {
        color: "#FF3D60",
        fontWeight: "bold"
    }
});

export default SendToFriend;
