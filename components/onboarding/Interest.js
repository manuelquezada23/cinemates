import React, { Component } from 'react';
import { LogBox, StyleSheet, Text, View, Dimensions, TouchableHighlight, Image, Animated, PanResponder, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons';

const movies = [
    { id: "1", uri: require('../../assets/1.jpg'), title: "Joker", stars: 4.5, rating: 60 },
    { id: "2", uri: require('../../assets/2.jpg'), title: "Star Wars", stars: 3, rating: 52 },
    { id: "3", uri: require('../../assets/3.jpg'), title: "Uncharted", stars: 2.5, rating: 31 },
    { id: "4", uri: require('../../assets/4.jpg'), title: "Encanto", stars: 4, rating: 99 },
    { id: "5", uri: require('../../assets/5.jpg'), title: "Star Wars", stars: 3, rating: 24 },
]

export default class Interest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: movies,
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0,
            moviesSeen: []
        }
    }

    renderCard = (card, index) => {
        return (
            <View style={styles.card}>
                <Image style={styles.movieImage} source={card.uri}></Image>
                <View style={styles.stars}>
                    <Stars
                        half={true}
                        default={card.stars}
                        spacing={4}
                        display={card.stars}
                        count={5}
                        fullStar={<Ionicons name="star"></Ionicons>}
                        emptyStar={<Ionicons name="star-outline"></Ionicons>}
                        halfStar={<Ionicons name="star-half-outline"></Ionicons>} />
                </View>
                <Text style={styles.movieTitle}>{card.title}</Text>
                <View style={styles.circle}>
                    <Text style={styles.circleText}>{card.rating}</Text>
                </View>
            </View>
        )
    };

    onSwiped = (type) => {
        console.log(`on swiped ${type}`)
        if (type === "right") {
            this.state.moviesSeen.push(movies[this.state.cardIndex])
        }
    }

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
        this.props.navigation.navigate('Movies Seen',{ movies: this.state.moviesSeen } )
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Select Your Interest</Text>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    disableBottomSwipe={true}
                    onTapCard={this.swipeLeft}
                    cards={this.state.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={10}
                    renderCard={this.renderCard}
                    onSwipedAll={this.onSwipedAllCards}
                    stackSize={3}
                    stackSeparation={10}
                    backgroundColor="white"
                    marginTop={120}
                    marginBottom={100}
                    overlayLabels={{
                        left: {
                            title: 'Not Seen',
                            style: {
                                label: {
                                    backgroundColor: 'white',
                                    borderColor: 'red',
                                    color: 'red',
                                    borderWidth: 1,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30
                                }
                            }
                        },
                        right: {
                            title: 'Seen',
                            style: {
                                label: {
                                    backgroundColor: 'red',
                                    borderColor: 'white',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30
                                }
                            }
                        },
                        top: {
                            title: 'Watch later',
                            style: {
                                label: {
                                    backgroundColor: 'white',
                                    borderColor: '#3DC089',
                                    color: '#3DC089',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                >
                </Swiper>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 20,
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    card: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#F2F2F2",
        justifyContent: "center",
        backgroundColor: "white"
    },
    movieImage: {
        flex: 1,
        position: "absolute",
        top: 0,
        width: "100%",
        height: "85%",
        resizeMode: "cover",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    stars: {
        textAlign: "center",
        position: "absolute",
        bottom: 60,
        margin: "auto",
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
    },
    movieTitle: {
        textAlign: "center",
        position: "absolute",
        bottom: 20,
        margin: "auto",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
    },
    title: {
        color: "black",
        width: "100%",
        marginTop: 50,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        height: 60,
        marginBottom: 0
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        position: "absolute",
        bottom: -70,
        borderColor: "#BCBCBC",
        borderWidth: 1,
        borderStyle: "dashed",
        alignSelf: "center"
    },
    circleText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center", 
        lineHeight: 50
    }
})