import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import MainButton from '../components/MainButton'
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import MatchingViewImage from '../assets/matching-view-image.png'

function HomePage() {
  const [trailers, setTrailers] = useState(false)
  const [home, setHome] = useState(true)
  const [matching, setMatching] = useState(false)

  function changeTab(tab) {
    if (tab === "trailers") {
      setTrailers(true)
      setHome(false)
      setMatching(false)
    } else if (tab === "home") {
      setTrailers(false)
      setHome(true)
      setMatching(false)
    } else {
      setTrailers(false)
      setHome(false)
      setMatching(true)
    }
  }

  return (
    <React.Fragment>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => { changeTab("trailers") }}>
              <Text style={trailers ? styles.tabsTextSelected : styles.tabsText}>Trailers</Text>
            </TouchableOpacity>
            <Text style={{ color: "white", opacity: 0.5, marginRight: 5, marginLeft: 5 }}>|</Text>
            <TouchableOpacity onPress={() => { changeTab("home") }}>
              <Text style={home ? styles.tabsTextSelected : styles.tabsText}>Home</Text>
            </TouchableOpacity>
            <Text style={{ color: "white", opacity: 0.5, marginRight: 5, marginLeft: 5 }}>|</Text>
            <TouchableOpacity onPress={() => { changeTab("matching") }}>
              <Text style={matching ? styles.tabsTextSelected : styles.tabsText}>Matching</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="paper-plane-outline" size={25} color={"white"}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        {matching &&
          <View style={styles.matchingView}>
            <Image style={styles.matchingViewImage} source={MatchingViewImage}></Image>
            <Text style={styles.matchingHeader}>Coming Soon...</Text>
            <Text style={styles.matchingText}>A group matching feature that finds the perfect movie or show for you to watch with your friend or friends</Text>
            <TouchableOpacity style={styles.notifyMeButton}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>Notify Me</Text>
            </TouchableOpacity>
          </View>
        }

      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsText: {
    fontSize: 16,
    color: "white",
    marginRight: 5,
    marginLeft: 5
  },
  tabsTextSelected: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 5,
    marginLeft: 5
  },
  sendButton: {
    position: "absolute",
    right: 0,
    marginRight: 20
  },
  safeAreaView: {
    backgroundColor: "black",
    height: "100%",
  },
  matchingView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  matchingViewImage: {
    height: "35%",
    resizeMode: "contain"
  },
  matchingHeader: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 35
  },
  matchingText: {
    color: "white",
    fontSize: 14,
    marginTop: 15,
    width: "85%",
    textAlign: "center"
  },
  notifyMeButton: {
    marginTop: 20,
    backgroundColor: "#FF3D60",
    borderRadius: 100,
    color: "white",
    width: "35%",
    height: 35,
    justifyContent: 'center',
    alignItems: "center"
  }
})

export default HomePage;
