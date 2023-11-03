import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyDrawer from './src/router/MyDrawer';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}
