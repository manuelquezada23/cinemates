import { View, Text } from 'react-native';
import MainButton from '../components/MainButton'

function HomePage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main button demo</Text>
      <MainButton/>
    </View>
  );
}

export default HomePage;
