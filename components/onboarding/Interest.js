import React from 'react';
import { LogBox, StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import SeenIcon from '../../assets/seen-icon.png'
import NotSeenIcon from '../../assets/not-seen-icon.png'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const movies = [
    { id: "1", uri: require('../../assets/1.jpg') },
    { id: "2", uri: require('../../assets/2.jpg') },
    { id: "3", uri: require('../../assets/3.jpg') },
    { id: "4", uri: require('../../assets/4.jpg') },
    { id: "5", uri: require('../../assets/5.jpg') },
]

const navigation = null;
const size = 0;

export default class Interest extends React.Component {
    constructor({ navigation }) {
        super()
        this.navigation = navigation;
        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0,
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-30deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })

    }

    UNSAFE_componentWillMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
    }

    renderUsers = () => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        return movies.map((item, i) => {
            if (i < this.state.currentIndex) {
                return null
            }

            else if (i == this.state.currentIndex) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
                        <Animated.View style={{ opacity: this.likeOpacity, position: 'absolute', top: "50%", left: 40, zIndex: 1000 }}>
                            <Image source={SeenIcon} style={{ top: 10 }}></Image>
                        </Animated.View>
                        <Animated.View style={{ opacity: this.dislikeOpacity, position: 'absolute', top: "50%", right: 40, zIndex: 1000 }}>
                            <Image source={NotSeenIcon} style={{ top: 10 }}></Image>
                        </Animated.View>
                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={item.uri} />
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                        key={item.id} style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                        }]}>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Image source={SeenIcon} style={{ top: 10 }}></Image>
                        </Animated.View>
                        <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Image source={NotSeenIcon} style={{ top: 10 }}></Image>
                        </Animated.View>
                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={item.uri} />
                    </Animated.View>
                )
            }
        }).reverse()
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.currentIndex == movies.length) {
                this.navigation.navigate("Movies Seen")
            } 
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Select Your Interest</Text>
                <View style={styles.mainPicture}>
                    {this.renderUsers()}
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: "black",
        width: "100%",
        marginTop: 70,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        height: 60,
        marginBottom: 0
    },
    mainPicture: {
        marginTop: -30,
    },
});