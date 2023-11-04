import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyDrawer from './src/router/MyDrawer';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MyDrawer />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
