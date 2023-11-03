import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageChat from '../components/Chat/MessageChat';

const Stack = createNativeStackNavigator();
const ChatNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatScreen" component={MessageChat} options={{ headerShown: false }} />
      <Stack.Screen
        name="MessageChat"
        component={MessageChat}
        // options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
