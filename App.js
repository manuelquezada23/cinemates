import Main from './Main'
import WelcomePage from './components/onboarding/WelcomePage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';


import SignIn from './components/onboarding/SignIn'
import InterestGuide from './components/onboarding/InterestGuide'
import Interest from './components/onboarding/Interest'
import MoviesSeen from './components/onboarding/MoviesSeen'
import SyncContacts from './components/onboarding/SyncContacts';
import RegisterFirstName from './components/onboarding/RegisterFirstName';
import RegisterLastName from './components/onboarding/RegisterLastName';
import RegisterEmail from './components/onboarding/RegisterEmail';
import RegisterUsername from './components/onboarding/RegisterUsername';
import RegisterPassword from './components/onboarding/RegisterPassword';
import SyncContactsPopUp from './components/onboarding/SyncContactsPopUp';
import ForgotPassword from './components/onboarding/ForgotPassword';
import VerifyCode from './components/onboarding/VerifyCode';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }} />

        {/* Sign In Flow */}
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerTitle: "Sign into your account" }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerTitle: "Forgot password" }} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} options={{ headerTitle: "Verify Code" }} />

        {/* Sign Up Flow */}
        <Stack.Screen name="RegisterFirstName" component={RegisterFirstName} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterLastName" component={RegisterLastName} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterEmail" component={RegisterEmail} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterUsername" component={RegisterUsername} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterPassword" component={RegisterPassword} options={{ headerShown: false }} />
        <Stack.Screen name="SyncContactsPopUp" component={SyncContactsPopUp} options={{ headerShown: false }} />
        <Stack.Screen name="SyncContacts" component={SyncContacts} options={{ headerBackVisible: false, headerTitle: "Invite to Cinemates" }} />

        <Stack.Screen name="Interest Guide" component={InterestGuide} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Select Your Interest" component={Interest} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Movies Seen" component={MoviesSeen} options={{ headerShown: false, gestureEnabled: false }} />
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
