import { SendProps } from 'react-native-gifted-chat';
import { TouchableOpacity, View } from 'react-native';
import { _pickDocument } from '~/utils/chat';
import { AntDesign } from '@expo/vector-icons';
import CustomMessage from '~/types/CustomMessage';

export const renderAction = (props: SendProps<CustomMessage>) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        style={{ marginLeft: 10, marginBottom: 10 }}
        onPress={async () => {
          _pickDocument().then((res) => {
            props.onSend!({ file: res! }, true);
          });
        }}>
        <AntDesign type="font-awesome" size={25} color="blue" name={'pluscircle'} />
      </TouchableOpacity>
    </View>
  );
};
