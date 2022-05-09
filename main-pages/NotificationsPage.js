import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import IconFiller from '../assets/icon-filler.png'
import MoreInfo from '../assets/more-info.png'
import MoreOptions from "../components/MoreOptions"
import React, { useRef, useState } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";

const thisWeek = [
  { type: "user", name: "Jane Cooper", time: "3d" },
  { type: "movie", name: "Leslie Alexander", time: "5d", movieImage: require('../assets/1.jpg') },
  { type: "user", name: "Robert Fox", time: "3d" },
  { type: "user", name: "Jacob Jones", time: "3d" },
]

const thisMonth = [
  { type: "user", name: "Manuel Quezada", time: "3d" },
  { type: "user", name: "Elon Musk", time: "3d" },
  { type: "user", name: "Emma Amselem", time: "3d" },
  { type: "movie", name: "Steve Jobs", time: "5d", movieImage: require('../assets/2.jpg') },
  { type: "user", name: "Mark Zuckerberg", time: "3d" },
  { type: "user", name: "Jeff Bezos", time: "3d" },
]

const suggested = [
  { type: "suggested", name: "Dianne Russell", info: "Followed by Arlene McCoy" },
  { type: "suggested", name: "Robert Fox", info: "Followed by Albert Flores" },
  { type: "suggested", name: "Ralph Edwards", info: "Followed by Annette Black" },
  { type: "suggested", name: "Annette Black", info: "Followed by Jenny Wilson" },
  { type: "suggested", name: "Courtney Henry", info: "Followed by Darrell Steward" },
]


function NotificationsPage() {

  const [notifications, setNofications] = useState({notificationsThisWeek: thisWeek, notificationsThisMonth: thisMonth, suggested})

  const refRBSheet = useRef();

  function moreInfoOnMovie() {
    refRBSheet.current.open()
  }

  function followButton() {
    console.log("follow")
  }


  function renderNotifications(array) {
    return array.map((data) => {
      if (data.type === "user") {
        return (
          <View style={styles.notification} key={data.name}>
            <Image style={styles.image} source={IconFiller}></Image>
            <Text style={styles.userNotificationText}><Text style={{ fontWeight: "bold" }}>{data.name}</Text> started following you. <Text style={{ color: "#777777" }}>{data.time}</Text> </Text>
            <View style={styles.button}><Button title="Follow" color="white" onPress={followButton}></Button></View>
          </View>
        )
      } else if (data.type === "movie") {
        return (
          <View style={styles.notification} key={data.name}>
            <Image style={styles.image} source={IconFiller}></Image>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.movieNotificationText}><Text style={{ fontWeight: "bold" }}>{data.name}</Text> sent you a movie. <Text style={{ color: "#777777" }}>{data.time}</Text></Text>
              <TouchableOpacity style={styles.itemContainer} onPress={moreInfoOnMovie}>
                <Image style={styles.item} source={data.movieImage}></Image>
                <Image style={styles.moreInfo} source={MoreInfo}></Image>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else if (data.type === "suggested") {
        return (
          <View style={styles.notification} key={data.name}>
            <Image style={styles.image} source={IconFiller}></Image>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.suggestedNotificationText}>{data.name}</Text>
              <Text style={styles.subText}>{data.info}</Text>
            </View>
            <View style={styles.button}><Button title="Follow" color="white" onPress={followButton}></Button></View>
          </View>
        )
      }
    })

  }

  return (
    <React.Fragment>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Notifications </Text>
      </View>
      <ScrollView style={styles.mainView}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
        >
          <MoreOptions sheet={refRBSheet} />
        </RBSheet>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>This Week</Text>
          {renderNotifications(notifications.notificationsThisWeek)}
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>This Month</Text>
          {renderNotifications(notifications.notificationsThisMonth)}
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Suggested For You</Text>
          {renderNotifications(notifications.suggested)}
        </View>

      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  header: {
    height: 100,
    backgroundColor: "white"
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: "white",
    position: "absolute",
    left: 20,
    bottom: 10
  },
  block: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    marginTop: 20,
    borderBottomColor: '#777777',
    borderBottomWidth: 0.3,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 15,
    paddingBottom: 20
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: "bold",
    left: 25,
  },
  notification: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 5
  },
  image: {
    height: 40,
    width: 40,
    left: 25
  },
  userNotificationText: {
    fontSize: 15,
    left: 35,
    top: 5,
    maxWidth: "50%"
  },
  button: {
    width: 100,
    backgroundColor: "#FF3D60",
    borderRadius: 100,
    position: "absolute",
    right: 10,
  },
  movieNotificationText: {
    fontSize: 15,
    left: 35,
    top: 5,
    maxWidth: "100%"
  },
  suggestedNotificationText: {
    fontSize: 15,
    left: 35,
    top: 5,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 12,
    left: 35,
    top: 7,
    color: "#777777"
  },
  itemContainer: {
    width: 90,
    height: 130,
    left: 30,
    top: 15
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
    width: null,
    height: null,
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  moreInfo: {
    position: "absolute",
    top: 5,
    right: 5
  },
});

export default NotificationsPage;
