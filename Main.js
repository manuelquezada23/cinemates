import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './main-pages/HomePage.js'
import NotificationsPage from './main-pages/NotificationsPage.js'
import SearchPage from './main-pages/SearchPage.js'
import UserPage from './main-pages/UserPage.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Image, FlatList, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssetsDisplay from './components/AssetsDisplay.js';
import MovieDisplay from './components/MovieDisplay.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Cinemates') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: () => { return null },
      })}
    >
      <Tab.Screen name="Cinemates" component={HomePage} options={{ gestureEnabled: false }} />
      <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: false, gestureEnabled: false }} />
      <Tab.Screen name="Notifications" component={NotificationsPage} options={{ gestureEnabled: false, headerShown: false }} />
      <Tab.Screen name="User" component={UserPage} options={{ gestureEnabled: false, headerShown: false }} />
    </Tab.Navigator>
  )
}

function Main() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="AssetsDisplay" component={AssetsDisplay} options={{headerTintColor: "black"}}/>
        <Stack.Screen name="MovieDisplay" component={MovieDisplay} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
