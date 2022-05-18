import { View, Text, StyleSheet, Image, FlatList, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../../assets/icon-filler.png'
import Ionicons from 'react-native-vector-icons/Ionicons';

const friendSuggestionsData = [
    { name: "Guy Hawkins", info: "9 mutual friends", id: "16", added: false },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "17", added: false },
    { name: "Devon Lane", info: "9 mutual friends", id: "18", added: false },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "19", added: false },
    { name: "Jerome Bell", info: "9 mutual friends", id: "20", added: false },
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
    { name: "Guy Hawkins", info: "9 mutual friends", id: "2433551", invited: false },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "2334542", invited: false },
    { name: "Devon Lane", info: "9 mutual friends", id: "344423", invited: false },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "2434434", invited: false },
    { name: "Guy Hawkins", info: "9 mutual friends", id: "5567825", invited: false },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "264050", invited: false },
    { name: "Devon Lane", info: "9 mutual friends", id: "25748847", invited: false },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "2402048", invited: false },
    { name: "Guy Hawkins", info: "9 mutual friends", id: "2429319", invited: false },
    { name: "Marvin McKinney", info: "9 mutual friends", id: "4532040130", invited: false },
    { name: "Devon Lane", info: "9 mutual friends", id: "342130121", invited: false },
    { name: "Eleanor Pena", info: "9 mutual friends", id: "34123102", invited: false },
]

function SyncContacts({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const [addFriends, setAddFriends] = useState(true)
    const [myFriends, setMyFriends] = useState(false)

    const [friendSuggestions, setFriendSuggestions] = useState(friendSuggestionsData)
    const [currentUser, setCurrentUser] = useState(currentUserData)
    const [currentUserFriends, setCurrentUserFriends] = useState(currentUser.friends)
    const [inviteToCinemates, setInviteToCinemates] = useState(inviteToCinematesData)

    const [numberOfFriendSuggestions, setNumberOfFriendSuggestions] = useState(friendSuggestions.length)
    const [numberOfInviteToCinemates, setNumberOfInviteToCinemates] = useState(inviteToCinemates.length)

    const onChangeSearch = (query) => {
        if (query.length === 0) {
            setSearchQuery('')
            setCurrentUserFriends(currentUser.friends)
            setFriendSuggestions(friendSuggestionsData)
            setInviteToCinemates(inviteToCinematesData)
        } else {
            setSearchQuery(query)

            if (addFriends) {
                let filteredSuggestions = friendSuggestions.slice();
                filteredSuggestions = filteredSuggestions.filter(f => (f.name.toLowerCase().includes(searchQuery.toLowerCase())))
                setFriendSuggestions(filteredSuggestions)
                let filteredInvitations = inviteToCinemates.slice();
                filteredInvitations = filteredInvitations.filter(f => (f.name.toLowerCase().includes(searchQuery.toLowerCase())))
                setInviteToCinemates(filteredInvitations)
            } else if (myFriends) {
                let filteredFriends = currentUser.friends.slice();
                filteredFriends = filteredFriends.filter(f => (f.name.toLowerCase().includes(searchQuery.toLowerCase())))
                console.log(filteredFriends)
                setCurrentUserFriends(filteredFriends)
            }
        }
    }

    function FriendComponent(props) {
        let added = props.currentUser.added;

        function friendSuggestionAction(type) {
            if (type === "add") {
                const newStatus = !added;
                let newFriendSuggestions = friendSuggestions.slice();
                const index = newFriendSuggestions.findIndex((obj => obj.id === props.currentUser.id));
                newFriendSuggestions[index].added = newStatus
                setFriendSuggestions(newFriendSuggestions)

            } else {
                let newFriendSuggestions = friendSuggestions.slice();
                newFriendSuggestions.splice(newFriendSuggestions.indexOf(props.currentUser), 1);
                setFriendSuggestions(newFriendSuggestions)
                let newNumber = numberOfFriendSuggestions - 1;
                setNumberOfFriendSuggestions(newNumber)
            }
        }

        return (
            <View style={styles.itemContainer}>
                <Image style={styles.contactPicture} source={IconFiller}></Image>
                <Text style={styles.contactName}>{props.currentUser.name}</Text>
                <Text style={styles.subName}>{props.currentUser.info}</Text>
                <TouchableOpacity onPress={() => { friendSuggestionAction("add") }} style={added ? styles.addedButton : styles.addButton}><Text style={added ? styles.addedButtonText : styles.addButtonText}>{added ? "Added" : "+ Add"}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { friendSuggestionAction("close") }} style={styles.clearButton}><Ionicons name="close-outline" size={20}></Ionicons></TouchableOpacity>
            </View>
        );
    }

    function InviteComponent(props) {
        let invited = props.currentUser.invited

        function inviteToCinematesAction(type) {
            if (type === "invite") {
                const newStatus = !invited;
                let newInviteToCinemates = inviteToCinemates.slice();
                const index = newInviteToCinemates.findIndex((obj => obj.id === props.currentUser.id));
                newInviteToCinemates[index].invited = newStatus
                setInviteToCinemates(newInviteToCinemates)
                console.log("inviting " + props.currentUser.name + " to Cinemates!")
            } else {
                let newInviteToCinemates = inviteToCinemates.slice();
                newInviteToCinemates.splice(newInviteToCinemates.indexOf(props.currentUser), 1);
                setInviteToCinemates(newInviteToCinemates)
                let newNumber = numberOfInviteToCinemates - 1;
                setNumberOfInviteToCinemates(newNumber)
            }
        }

        return (
            <View style={styles.itemContainer}>
                <Image style={styles.contactPicture} source={IconFiller}></Image>
                <Text style={styles.contactName}>{props.currentUser.name}</Text>
                <Text style={styles.subName}>{props.currentUser.info}</Text>
                <TouchableOpacity onPress={() => { inviteToCinematesAction("invite") }} style={invited ? styles.addedButton : styles.addButton}><Text style={invited ? styles.addedButtonText : styles.addButtonText}>{invited ? "Invited" : "+ Invite"}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { inviteToCinematesAction("close") }} style={styles.clearButton}><Ionicons name="close-outline" size={20}></Ionicons></TouchableOpacity>
            </View>
        );
    }

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
                selectionColor={"black"}
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
                        <FriendComponent key={user.id} currentUser={user} />
                    ))}
                    {numberOfInviteToCinemates !== 0 &&
                        <Text style={styles.subTitle}>Invite to Cinemates ({inviteToCinemates.length})</Text>
                    }
                    {inviteToCinemates.map((user) => (
                        <InviteComponent key={user.id} currentUser={user} />
                    ))}
                </ScrollView>
            }
            {myFriends &&
                < FlatList
                    data={currentUserFriends}
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
        top: 10,
        // backgroundColor: "red"
    },
    addedButton: {
        position: "absolute",
        right: 30,
        borderRadius: 100,
        borderColor: "#FF3D60",
        borderWidth: 1,
        height: 30,
        width: 90,
        justifyContent: "center",
        alignItems: "center",
        top: 10,
        backgroundColor: "#FF3D60"
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
    addedButtonText: {
        fontWeight: "bold",
        color: "white"
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
