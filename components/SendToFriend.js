import { View, TouchableOpacity, StyleSheet, Image, Text, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../assets/icon-filler.png';
import SendIcon from '../assets/send-icon.png'

class RatingFlatListComponent extends React.Component {
    state = {
        status: false,
    }
    render() {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.checkIcon} onPress={() => {
                    const newStatus = !this.state.status;
                    this.setState({
                        status: newStatus,
                    });
                }}>
                    <Ionicons name={this.state.status ? "checkbox" : "square-outline"} size={25}></Ionicons>
                </TouchableOpacity>
                <Image style={styles.contactPicture} source={IconFiller}></Image>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{this.props.friend.name}</Text>
                    <Text style={styles.subName}>2k Followers</Text>
                </View>
            </View>
        );
    }
}

function SendToFriend() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [input, onChangeText] = React.useState("");

    const contacts = [
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
                    value={searchQuery}
                    style={styles.searchBar}
                />
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
                    onChangeText={onChangeText}
                    value={input}
                />
                <TouchableOpacity>
                    <Image style={styles.sendIcon} source={SendIcon}></Image>
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
        backgroundColor: "#F2F2F2",
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
        right: 20
    }
});

export default SendToFriend;
