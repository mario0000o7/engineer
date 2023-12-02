import { Bubble, BubbleProps } from 'react-native-gifted-chat';
import { Text, View } from 'react-native';
import CustomMessage from '~/types/CustomMessage';

export const CustomView = (props: BubbleProps<CustomMessage>) => {
  if (props.currentMessage?.pdf) {
    return (
      <View style={{ backgroundColor: 'red' }}>
        <Text>hello</Text>
      </View>
    );
  }
  return <Bubble {...props} />;
};
