import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import IconFiller from '../assets/icon-filler.png'

function AskForRecommendation() {
    const [color, setColor] = useState("#FF3DA6")
    const [text, onChangeText] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const [fadeAnim] = useState(new Animated.Value(0));
    const [bottomBarHeight, setHeight] = useState(200)
    const [messageOffset, setMessageOffset] = useState(30)
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    const onKeyboardShow = event => {
        setKeyboardOffset(event.endCoordinates.height)
        setHeight(85)
        setMessageOffset(0)
    }
    const onKeyboardHide = () => {
        setKeyboardOffset(0);
        setHeight(200)
        setMessageOffset(30)
    }
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    useEffect(() => {
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

        return () => {
            keyboardDidShowListener.current.remove();
            keyboardDidHideListener.current.remove();
        };
    }, []);

    const onChangeInput = (text) => {
        onChangeText(text)
        if (text.length !== 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }

    const navigation = useNavigation();

    function changeColor(color) {
        setColor(color)
    }

    function sendRecommendation() {
        setShowMessage(true)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            navigation.navigate("AskForRecommendationSuccess")
        }, 2000);
    }

    const styles = StyleSheet.create({
        mainView: {
            height: "100%",
            width: "100%",
            backgroundColor: color,
        },
        topHeader: {
            width: "100%",
            height: 100,
            alignItems: "center",
        },
        topHeaderLeftIcon: {
            position: "absolute",
            left: 20,
            bottom: 10
        },
        topHeaderRightIcon: {
            position: "absolute",
            right: 20,
            bottom: 0,
            borderRadius: 100,
            backgroundColor: "white",
            height: 40,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
        },
        topHeaderRightIconText: {
            fontWeight: "bold",
            color: color,
            fontSize: 16
        },
        textInputView: {
            alignItems: "center",
            backgroundColor: "red",
            width: "90%",
            height: 200,
            marginLeft: 20,
            marginTop: 20,
            flex: 1
        },
        textInputViewTop: {
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
            height: "45%",
            maxWidth: "90%",
            minWidth: "90%",
            marginTop: 200
        },
        profilePicture: {
            width: 45,
            height: 45,
            marginBottom: 25,
            alignSelf: "center",
            marginTop: 60
        },
        recommendationText: {
            fontSize: 20,
            width: "80%",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            alignSelf: "center",
            marginBottom: 50
        },
        container: {
            flex: 1,
        },
        inner: {
            padding: 20,
            flex: 1,
            alignItems: "center",
            width: "100%",
            height: bottomBarHeight,
            position: "absolute",
            bottom: keyboardOffset 
        },
        header: {
            fontSize: 36,
            marginBottom: 48
        },
        textInput: {
            height: 40,
            borderColor: "#000000",
            borderBottomWidth: 1,
            marginBottom: 36
        },
        btnContainer: {
            width: "100%",
            height: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        color: {
            borderWidth: 1,
            borderColor: "white",
            width: 30,
            height: 30,
            borderRadius: 15,
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        updateMessageView: {
            marginBottom: messageOffset,
            height: 50,
            backgroundColor: "#40AE2E",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: keyboardOffset,
        },
        updateMessageViewIcon: {
            marginLeft: 30,
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
        },
        updateMessageViewText: {
            marginLeft: 15,
            color: "white",
            fontSize: 16,
        }
    });

    return (
        <View style={styles.mainView}>
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.topHeaderLeftIcon} onPress={() => { navigation.goBack() }}>
                    <Ionicons name="chevron-back-outline" size={25} color="white" />
                </TouchableOpacity>
                <View style={styles.topHeaderRightIcon} opacity={buttonDisabled ? 0.5 : 1}>
                    <TouchableOpacity onPress={() => { sendRecommendation() }} disabled={buttonDisabled ? true : false}>
                        <Text style={styles.topHeaderRightIconText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Image style={styles.profilePicture} source={IconFiller}></Image>
            <TextInput
                maxLength={200}
                multiline={true}
                value={text}
                onChangeText={onChangeInput}
                selectionColor={"white"}
                placeholder={"Ask for a Recommendation..."}
                style={styles.recommendationText}
            />

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.inner}>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => { changeColor("#FF3DA6") }} style={[styles.color, { backgroundColor: '#FF3DA6' }]}>
                            {(color === "#FF3DA6") &&
                                <Ionicons name="checkmark-outline" color="white" size={20} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { changeColor("#B862DC") }} style={[styles.color, { backgroundColor: '#B862DC' }]}>
                            {(color === "#B862DC") &&
                                <Ionicons name="checkmark-outline" color="white" size={20} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { changeColor("#147CF3") }} style={[styles.color, { backgroundColor: '#147CF3' }]}>
                            {(color === "#147CF3") &&
                                <Ionicons name="checkmark-outline" color="white" size={20} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { changeColor("#0E766C") }} style={[styles.color, { backgroundColor: '#0E766C' }]}>
                            {(color === "#0E766C") &&
                                <Ionicons name="checkmark-outline" color="white" size={20} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { changeColor("#FFA63D") }} style={[styles.color, { backgroundColor: '#FFA63D' }]}>
                            {(color === "#FFA63D") &&
                                <Ionicons name="checkmark-outline" color="white" size={20} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { changeColor("#FF3D3E") }} style={[styles.color, { backgroundColor: '#FF3D3E' }]}>
                            {(color === "#FF3D3E") &&
                                <Ionicons name="checkmark-outline" color="white" size={20} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {showMessage &&
                    <Animated.View style={[styles.updateMessageView, {opacity: fadeAnim}]}>
                        <View style={styles.updateMessageViewIcon}>
                            <Ionicons name="checkmark-outline" color="#40AE2E" size={15} />
                        </View>
                        <Text style={styles.updateMessageViewText}>Your request has been posted</Text>
                    </Animated.View>
                }
            </KeyboardAvoidingView>
        </View>
    )
}

export default AskForRecommendation;