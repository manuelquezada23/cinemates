import { View, Text, StyleSheet, Image, FlatList, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../../assets/icon-filler.png'
import Ionicons from 'react-native-vector-icons/Ionicons';

const friendSuggestionsData = [
    { name: "Guy Hawkins", info: "9 mutual friends", id: "16" },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "17" },
    { name: "Devon Lane", info: "9 mutual friends", id: "18" },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "19" },
    { name: "Jerome Bell", info: "9 mutual friends", id: "20" },
]
const currentUserData = {
    friends: [
        { id: "1", name: "Manuel Quezada" },
        { id: "2", name: "Esteban Gonzalez" },
        { id: "3", name: "Jaime Torres" },
        { id: "4", name: "Aixa Belmont" },
        { id: "5", name: "Maya Fleischer" },
        { id: "6", name: "Jose Urruticoechea" },
        { id: "7", name: "Tatiana Mandis" },
        { id: "8", name: "Ethan Polley" },
        { id: "9", name: "Laeticia Cherfan" },
        { id: "10", name: "Kyra Haddad" },
        { id: "11", name: "Sofia Vaca Narvaja" },
        { id: "12", name: "Mariana Alvaro" },
        { id: "13", name: "Daniel Civita" },
        { id: "14", name: "Daniel Erath" },
        { id: "15", name: "Josh Gindi" },
    ]
}

const inviteToCinematesData = [
    { name: "Guy Hawkins", info: "9 mutual friends", id: "21" },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "22" },
    { name: "Devon Lane", info: "9 mutual friends", id: "23" },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "24" },
    { name: "Guy Hawkins", info: "9 mutual friends", id: "25" },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "26" },
    { name: "Devon Lane", info: "9 mutual friends", id: "27" },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "28" },
    { name: "Guy Hawkins", info: "9 mutual friends", id: "29" },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "30" },
    { name: "Devon Lane", info: "9 mutual friends", id: "31" },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "32" },
]

function SyncContacts({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [addFriends, setAddFriends] = useState(true)
    const [myFriends, setMyFriends] = useState(false)

    const [friendSuggestions, setFriendSuggestions] = useState(friendSuggestionsData)
    const [currentUser, setCurrentUser] = useState(currentUserData)
    const [inviteToCinemates, setInviteToCinemates] = useState(inviteToCinematesData)

    const [numberOfFriendSuggestions, setNumberOfFriendSuggestions] = useState(friendSuggestions.length)
    const [numberOfInviteToCinemates, setNumberOfInviteToCinemates] = useState(inviteToCinemates.length)

    useEffect(() => {
        if (numberOfFriendSuggestions === 0 && numberOfInviteToCinemates === 0) {
            navigation.navigate("Main")
        }
    })

    function changeTab(tab) {
        if (tab === "addFriends") {
            setAddFriends(true)
            setMyFriends(false)
        } else {
            setMyFriends(true)
            setAddFriends(false)
        }
    }

    function friendSuggestionAction(type, user) {
        if (type === "add") {
            let newCurrentUser = currentUser;
            newCurrentUser.friends.push({ id: user.id, name: user.name })
            setCurrentUser(newCurrentUser)
        }
        let newFriendSuggestions = friendSuggestions.slice();
        newFriendSuggestions.splice(newFriendSuggestions.indexOf(user), 1);
        setFriendSuggestions(newFriendSuggestions)
        let newNumber = numberOfFriendSuggestions - 1;
        setNumberOfFriendSuggestions(newNumber)
    }

    function inviteToCinematesAction(type, user) {
        if (type === "invite") {
            console.log("inviting " + user.name + " to Cinemates!")
        }
        let newInviteToCinemates = inviteToCinemates.slice();
        newInviteToCinemates.splice(newInviteToCinemates.indexOf(user), 1);
        setInviteToCinemates(newInviteToCinemates)
        let newNumber = numberOfInviteToCinemates - 1;
        setNumberOfInviteToCinemates(newNumber)
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Main")} title="Done" color="#FF3D60" />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.mainView}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            <View style={styles.tabs}>
                <TouchableOpacity style={addFriends ? styles.tab : styles.tabSelected} onPress={() => { changeTab("addFriends") }}>
                    <Text style={styles.tabText}>Add Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity style={myFriends ? styles.tab : styles.tabSelected} onPress={() => { changeTab("myFriends") }}>
                    <Text style={styles.tabText}>My Friends ({currentUser.friends.length})</Text>
                </TouchableOpacity>
            </View>
            {addFriends &&
                <ScrollView style={styles.grid}>
                    {numberOfFriendSuggestions !== 0 &&
                        <Text style={styles.subTitle}>Friend Suggestions ({friendSuggestions.length})</Text>
                    }
                    {friendSuggestions.map((user) => (
                        <View style={styles.itemContainer} key={user.id}>
                            <Image style={styles.contactPicture} source={IconFiller}></Image>
                            <Text style={styles.contactName}>{user.name}</Text>
                            <Text style={styles.subName}>{user.info}</Text>
                            <TouchableOpacity onPress={() => { friendSuggestionAction("add", user) }} style={styles.addButton}><Text style={styles.addButtonText}>+ Add</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { friendSuggestionAction("close", user) }} style={styles.clearButton}><Ionicons name="close-outline" size={20}></Ionicons></TouchableOpacity>
                        </View>
                    ))}
                    {numberOfInviteToCinemates !== 0 &&
                        <Text style={styles.subTitle}>Invite to Cinemates ({inviteToCinemates.length})</Text>
                    }
                    {inviteToCinemates.map((user) => (
                        <View style={styles.itemContainer} key={user.id}>
                            <Image style={styles.contactPicture} source={IconFiller}></Image>
                            <Text style={styles.contactName}>{user.name}</Text>
                            <Text style={styles.subName}>{user.info}</Text>
                            <TouchableOpacity onPress={() => { inviteToCinematesAction("invite", user) }} style={styles.addButton}><Text style={styles.addButtonText}>+ Invite</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { inviteToCinematesAction("close", user) }} style={styles.clearButton}><Ionicons name="close-outline" size={20}></Ionicons></TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            }
            {myFriends &&
                < FlatList
                    data={currentUser.friends}
                    style={styles.grid}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer} key={item.id}>
                            <Image style={styles.contactPicture} source={IconFiller}></Image>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.subName}>Cinemates</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    numColumns={1}
                />
            }
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
    searchBar: {
        borderRadius: 8,
        borderColor: "#CCCCCC",
        height: 32,
        width: "90%",
        top: 15
    },
    title: {
        color: "black",
        width: "100%",
        marginTop: 70,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    grid: {
        marginTop: 20,
        width: "98%",
        flexGrow: 1,
        marginLeft: 30,
        // height: "50%"
    },
    itemContainer: {
        width: "93%",
        height: 60,
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
    addButton: {
        position: "absolute",
        right: 30,
        borderRadius: 100,
        borderColor: "#FF3D60",
        borderWidth: 1,
        height: 30,
        width: 90,
        justifyContent: "center",
        alignItems: "center",
        top: 10
    },
    clearButton: {
        position: "absolute",
        right: 0,
        top: 15
    },
    addButtonText: {
        fontWeight: "bold",
        color: "#FF3D60"
    },
    subName: {
        color: "#777777",
        position: "absolute",
        left: 55,
        top: 30,
        fontSize: 12
    },
    moreInfo: {
        position: "absolute",
        top: 10,
        right: 10
    },
    tabs: {
        height: 35,
        backgroundColor: "#F2F2F2",
        marginTop: 30,
        borderRadius: 8,
        padding: 3,
        display: "flex",
        flexDirection: "row",
        width: "90%",
    },
    tab: {
        height: "100%",
        backgroundColor: "white",
        width: "50%",
        borderRadius: 6,
        justifyContent: "center"
    },
    tabSelected: {
        height: "100%",
        backgroundColor: "transparent",
        width: "50%",
        borderRadius: 6,
        justifyContent: "center"
    },
    tabText: {
        textAlign: "center"
    },
});

export default SyncContacts;
