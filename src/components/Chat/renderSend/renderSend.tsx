import { Send, SendProps } from 'react-native-gifted-chat';
import { TouchableOpacity, View } from 'react-native';
import { _pickDocument } from '~/utils/chat';
import { Fontisto } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomMessage from '~/types/CustomMessage';

export const renderSend = (props: SendProps<CustomMessage>) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={async () => {
          _pickDocument().then((res) => {
            console.log('RES', res);
            props.onSend!({ file: res! }, true);
          });
        }}>
        <Fontisto
          type="font-awesome"
          size={25}
          color="blue"
          name={'paperclip'}
          style={{
            marginRight: 5,
            marginTop: 8
          }}
        />
      </TouchableOpacity>
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
