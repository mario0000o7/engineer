import { Send, SendProps } from 'react-native-gifted-chat';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomMessage from '~/types/CustomMessage';

export const renderSend = (props: SendProps<CustomMessage>) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Send {...props}>
        <Ionicons
          type="font-awesome"
          name="send"
          size={25}
          color="orange"
          style={{ marginBottom: 10, marginRight: 10 }}
        />
      </Send>
    </View>
  );
};
