import { Bubble, BubbleProps } from 'react-native-gifted-chat';
import { COLOR } from '~/styles/constants';
import CustomMessage from '~/types/CustomMessage';
import { Image, TouchableOpacity } from 'react-native-ui-lib';
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
            file: props.currentMessage!.file!
          });
        }}>
        <PDFIcon width={100} height={100} />
      </TouchableOpacity>
    );
  };

  const customViewImage = () => {
    return (
      <TouchableOpacity
        style={{ margin: 3 }}
        onPress={() => {
          navigator.navigation.navigate(Routes.PDFViewer, {
            file: props.currentMessage!.file!
          });
        }}>
        <Image
          source={{ uri: props.currentMessage!.file!.uri }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
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
            renderCustomView={customViewImage}
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
