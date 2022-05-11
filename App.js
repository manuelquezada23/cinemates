import Main from './Main'
import { Button } from 'react-native';
import WelcomePage from './components/onboarding/WelcomePage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './components/onboarding/SignUp'
import SignIn from './components/onboarding/SignIn'
import InterestGuide from './components/onboarding/InterestGuide'
import Interest from './components/onboarding/Interest'
import MoviesSeen from './components/onboarding/MoviesSeen'
import SyncContacts from './components/onboarding/SyncContacts';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up Your Account" component={SignUp} />
        <Stack.Screen name="Sign In Your Account" component={SignIn} />
        <Stack.Screen name="Interest Guide" component={InterestGuide} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Select Your Interest" component={Interest} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Movies Seen" component={MoviesSeen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Sync Contacts" component={SyncContacts} options={{ headerBackVisible: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const theme = {
  colors: {
    background: 'white',
  },
};
