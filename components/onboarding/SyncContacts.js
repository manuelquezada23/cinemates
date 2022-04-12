import { View, Text, StyleSheet, Image, FlatList, Button } from 'react-native';
import React from 'react';
import { Searchbar } from 'react-native-paper';
import IconFiller from '../../assets/icon-filler.png'

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

function SyncContacts({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate("Main")} title="Done" color="#FF3D60"/>
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
            <FlatList
                data={contacts}
                style={styles.grid}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image style={styles.contactPicture} source={IconFiller}></Image>
                        <Text style={styles.contactName}>{item.name}</Text>
                        <Text style={styles.subName}>Cinemates</Text>
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
    grid: {
        marginTop: 20,
        width: "100%",
        flexGrow: 1,
        marginLeft: 30,
        marginTop: 30,
        height: "50%"
    },
    itemContainer: {
        width: "93%",
        height: 70,
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
    moreInfo: {
        position: "absolute",
        top: 10,
        right: 10
    }
});

export default SyncContacts;
