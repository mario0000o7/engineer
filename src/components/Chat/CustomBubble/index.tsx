import { Bubble, BubbleProps } from 'react-native-gifted-chat';
import { COLOR } from '~/styles/constants';
import CustomMessage from '~/types/CustomMessage';
import { TouchableOpacity } from 'react-native-ui-lib';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import PDFIcon from '~/assets/pdf.svg';

const CustomBubble = (
  props: BubbleProps<CustomMessage>,
  navigator: NavigationProps<Routes.Message>
) => {
  const customView = () => {
    return (
      <TouchableOpacity
        style={{ margin: 3 }}
        onPress={() => {
          navigator.navigation.navigate(Routes.PDFViewer, {
            uri: props.currentMessage!.file!.uri
          });
        }}>
        <PDFIcon width={100} height={100} />
      </TouchableOpacity>
    );
  };

  switch (props.currentMessage?.file?.mimeType) {
    case 'application/pdf': {
      return (
        <Bubble
          wrapperStyle={{
            left: {
              backgroundColor: COLOR.PRIMARY
            },
            right: {
              backgroundColor: COLOR.PRIMARY
            }
          }}
          {...props}
          renderCustomView={customView}
        />
      );
    }
    default: {
      if (props.currentMessage?.file?.mimeType?.includes('image')) {
        props.currentMessage.image = props.currentMessage.file.uri;
        return (
          <Bubble
            wrapperStyle={{
              left: {
                backgroundColor: COLOR.PRIMARY
              },
              right: {
                backgroundColor: COLOR.PRIMARY
              }
            }}
            {...props}
          />
        );
      } else {
        return (
          <Bubble
            wrapperStyle={{
              left: {
                backgroundColor: COLOR.PRIMARY
              },
              right: {
                backgroundColor: COLOR.PRIMARY
              }
            }}
            {...props}
          />
        );
      }
    }
  }
};

export default CustomBubble;
