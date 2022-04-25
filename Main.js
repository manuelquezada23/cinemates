import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './main-pages/HomePage.js'
import NotificationsPage from './main-pages/NotificationsPage.js'
import SearchPage from './main-pages/SearchPage.js'
import UserPage from './main-pages/UserPage.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Image, FlatList, Button } from 'react-native';

const Tab = createBottomTabNavigator();

function Main({ navigation }) {
  return (
    <NavigationContainer independent={true}>
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
        <Tab.Screen name="Cinemates" component={HomePage} options={{gestureEnabled: false}}/>
        <Tab.Screen name="Search" component={SearchPage} options={{headerShown: false, gestureEnabled: false}}/>
        <Tab.Screen name="Notifications" component={NotificationsPage} options={{gestureEnabled: false, headerShown: false}}/>
        <Tab.Screen name="User" component={UserPage} options={{gestureEnabled: false, headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;
