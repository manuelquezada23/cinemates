import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../../assets/icon-filler.png'

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
    const [inviteToCinemates, setInviteToCinemates] = useState(inviteToCinematesData)

    const onChangeSearch = (query) => {
        if (query.length === 0) {
            setSearchQuery('')
            setInviteToCinemates(inviteToCinematesData)
        } else {
            setSearchQuery(query)
            let filteredInvitations = inviteToCinemates.slice();
            filteredInvitations = filteredInvitations.filter(f => (f.name.toLowerCase().includes(searchQuery.toLowerCase())))
            setInviteToCinemates(filteredInvitations)
        }
    }

    function InviteComponent(props) {
        let invited = props.currentUser.invited

        function inviteToCinematesAction() {
            const newStatus = !invited;
            let newInviteToCinemates = inviteToCinemates.slice();
            const index = newInviteToCinemates.findIndex((obj => obj.id === props.currentUser.id));
            newInviteToCinemates[index].invited = newStatus
            setInviteToCinemates(newInviteToCinemates)

            if (newStatus === true) {
                console.log("inviting " + props.currentUser.name + " to Cinemates!")
            } else {
                console.log("cancelled invite to " + props.currentUser.name)
            }
        }

        return (
            <View style={styles.itemContainer}>
                <Image style={styles.contactPicture} source={IconFiller}></Image>
                <Text style={styles.contactName}>{props.currentUser.name}</Text>
                <Text style={styles.subName}>{props.currentUser.info}</Text>
                <TouchableOpacity onPress={() => { inviteToCinematesAction() }} style={invited ? styles.addedButton : styles.addButton}><Text style={invited ? styles.addedButtonText : styles.addButtonText}>{invited ? "✓ Invited" : "+ Invite"}</Text></TouchableOpacity>
            </View>
        );
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("FinalStep")} title="Done" color="#FF3D60" />
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
                selectionColor={"#FF3D60"}
                fontSize={16}
            />
            <Text style={styles.subTitle}>INVITE TO CINEMATES</Text>
            <ScrollView style={styles.grid}>
                {inviteToCinemates.map((user) => (
                    <InviteComponent key={user.id} currentUser={user} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        height: "95%",
        marginBottom: 100,
    },
    searchBar: {
        borderRadius: 8,
        borderColor: "#CCCCCC",
        height: 40,
        width: "90%",
        top: 15,
        alignSelf: "center",
        backgroundColor: "#F5F5F5",
        shadowRadius: 0,
        shadowColor: "white",
    },
    grid: {
        marginTop: 15,
        width: "98%",
        flex: 1,
        marginLeft: 20,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 40,
        marginLeft: 20
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
        right: 0,
        borderRadius: 100,
        borderColor: "#FF3D60",
        borderWidth: 1,
        height: 30,
        width: 90,
        justifyContent: "center",
        alignItems: "center",
        top: 10,
    },
    addedButton: {
        position: "absolute",
        right: 0,
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
});

export default SyncContacts;
