import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import React, { } from 'react';

const genres = ["Action", "Animation", "Comedy", "Crime", "Drama", "Experimental", "Fantasy"
    , "Historical", "Horror", "Romance", "Science", "Thriller", "Western", "Other"
]

class GenreFlatListComponent extends React.Component {
    state = {
        status: false,
    }
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    const newStatus = !this.state.status;
                    this.setState({
                        status: newStatus,
                    });
                }}
                style={this.state.status ? styles.selectedGenre : styles.genre}>
                <Text style={this.state.status ? styles.selectedGenreText : styles.genreText}>{this.props.genre}</Text>
            </TouchableOpacity>
        );
    }
}

function FilterBy() {
    let [netflix, setNetflix] = React.useState(false);
    let [hulu, setHulu] = React.useState(false);
    let [disneyplus, setDisneyPlus] = React.useState(false);
    let [appletv, setAppleTV] = React.useState(false);

    function applyFilter() {
        console.log("filter applied")
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.header}>FILTER</Text>
            <Text style={styles.subHeader}>Platform</Text>
            <View style={styles.platforms}>
                <View style={styles.platformRow}>
                    {(netflix === false) &&
                        <TouchableOpacity style={styles.platform} onPress={() => setNetflix(true)}>
                            <Image source={require('../assets/netflix.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                    {(netflix === true) &&
                        <TouchableOpacity style={styles.selectedPlatform} onPress={() => setNetflix(false)}>
                            <Image source={require('../assets/netflix-selected.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                    {(hulu === false) &&
                        <TouchableOpacity style={styles.platform} onPress={() => setHulu(true)}>
                            <Image source={require('../assets/hulu.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                    {(hulu === true) &&
                        <TouchableOpacity style={styles.selectedPlatform} onPress={() => setHulu(false)}>
                            <Image source={require('../assets/hulu-selected.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.platformRow}>
                    {(disneyplus === false) &&
                        <TouchableOpacity style={styles.platform} onPress={() => setDisneyPlus(true)}>
                            <Image source={require('../assets/disneyplus.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                    {(disneyplus === true) &&
                        <TouchableOpacity style={styles.selectedPlatform} onPress={() => setDisneyPlus(false)}>
                            <Image source={require('../assets/disneyplus-selected.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                    {(appletv === false) &&
                        <TouchableOpacity style={styles.platform} onPress={() => setAppleTV(true)}>
                            <Image source={require('../assets/appletv.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                    {(appletv === true) &&
                        <TouchableOpacity style={styles.selectedPlatform} onPress={() => setAppleTV(false)}>
                            <Image source={require('../assets/appletv-selected.png')} style={styles.platformLogo}></Image>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <Text style={styles.subHeader}>Genre</Text>
            <View style={styles.genres}>
                <FlatList
                    data={genres}
                    columnWrapperStyle={styles.genresContainer}
                    renderItem={({ item }) => (
                        <GenreFlatListComponent genre={item} />
                    )}
                    keyExtractor={item => item}
                    numColumns={3} />
            </View>
            <View style={styles.applyButton}>
                <Button onPress={applyFilter} title="Apply" color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        left: 20
    },
    header: {
        fontSize: 14,
        color: "#777777"
    },
    subHeader: {
        marginTop: 25,
        fontSize: 16,
        fontWeight: "bold"
    },
    platforms: {
        display: "flex",
        flexDirection: "column",
        marginTop: 10
    },
    platformRow: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        marginBottom: 10
    },
    platform: {
        borderRadius: 8,
        backgroundColor: "white",
        height: 72,
        width: 165,
        borderColor: "#F2F2F2",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    platformLogo: {
        resizeMode: "contain",
    },
    selectedPlatform: {
        borderRadius: 8,
        backgroundColor: "black",
        height: 72,
        width: 165,
        borderColor: "#F2F2F2",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    genres: {
        width: "90%",
        marginTop: 10
    },
    genresContainer: {
        marginRight: "auto",
    },
    genre: {
        borderRadius: 100,
        borderColor: "#F2F2F2",
        borderWidth: 1,
        height: 35,
        textAlign: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: "white"
    },
    genreText: {
        padding: 20,
        marginBottom: 20,
        fontSize: 16,
        color: "black"
    },
    selectedGenre: {
        borderRadius: 100,
        borderColor: "#F2F2F2",
        borderWidth: 1,
        height: 35,
        textAlign: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: "black"
    },
    selectedGenreText: {
        padding: 20,
        marginBottom: 20,
        fontSize: 16,
        color: "white"
    },
    applyButton: {
        width: "90%",
        marginTop: 15,
        height: 48,
        backgroundColor: "#FF3D60",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#F2F2F2",
        borderWidth: 1,
    }
});


export default FilterBy;
