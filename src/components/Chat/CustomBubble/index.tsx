import { Bubble, BubbleProps } from 'react-native-gifted-chat';
import { COLOR } from '~/styles/constants';
import CustomMessage from '~/types/CustomMessage';

const CustomBubble = (props: BubbleProps<CustomMessage>) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: COLOR.PRIMARY
        },
        right: {
          backgroundColor: COLOR.PRIMARY
        }
      }}
    />
  );
};

export default CustomBubble;
