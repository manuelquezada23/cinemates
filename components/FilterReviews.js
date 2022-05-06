import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';

const ratings = [5, 4, 3, 2, 1]

class RatingFlatListComponent extends React.Component {
    state = {
        status: false,
    }
    render() {
        return (
            <View style={styles.ratingsFilterContainer}>
                <TouchableOpacity style={styles.ratingsFiltersBox} onPress={() => {
                    const newStatus = !this.state.status;
                    this.setState({
                        status: newStatus,
                    });
                }}>
                    <Ionicons name={this.state.status ? "checkbox" : "square-outline"} size={25}></Ionicons>
                </TouchableOpacity>
                <View style={styles.ratingsFilterStars}>
                    <Stars
                        half={true}
                        spacing={4}
                        display={this.props.rating}
                        starSize={50}
                        count={5}
                        fullStar={<Ionicons name="star"></Ionicons>}
                        emptyStar={<Ionicons name="star-outline"></Ionicons>}
                        halfStar={<Ionicons name="star-half-outline"></Ionicons>} />
                </View>
            </View>
        );
    }
}

function FilterReviews() {
    const [onlyCinemates, setOnlyCinemates] = useState(true)
    const [everyone, setEveryone] = useState(false)

    function applyFilter() {
        console.log("filter applied")
    }

    return (
        <View style={styles.mainView}>
            <Text style={styles.header}>FILTER</Text>
            <View style={styles.filters}>
                <TouchableOpacity
                    onPress={() => {setOnlyCinemates(true), setEveryone(false)}}
                    style={onlyCinemates ? styles.selectedGenre : styles.genre}>
                    <Text style={onlyCinemates ? styles.selectedGenreText : styles.genreText}>Only Cinemates</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {setOnlyCinemates(false), setEveryone(true)}}
                    style={everyone ? styles.selectedGenre : styles.genre}>
                    <Text style={everyone ? styles.selectedGenreText : styles.genreText}>Everyone</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subHeader}>Rating</Text>
            <View style={styles.ratingFilters}>
                <FlatList
                    data={ratings}
                    columnWrapperStyle={styles.ratingsFilterContainerBig}
                    renderItem={({ item }) => (
                        <RatingFlatListComponent rating={item} />
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
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    filters: {
        width: "90%",
        marginTop: 10,
        display: "flex",
        flexDirection: "row"
    },
    filtersContainer: {
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
    },
    ratingFilters: {
        marginRight: 40,
        width: 150,
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
    },
    ratingsFilterContainerBig: {
        display: "flex",
        flexDirection: "column",
    },
    ratingsFilterContainer: {
        marginBottom: 10,
        justifyContent: "center"
    },
    ratingsFilterStars: {
        position: "absolute",
        top: 7,
        left: 30
    }
});


export default FilterReviews;
