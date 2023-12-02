import { NavigationProps, Routes } from '~/router/navigationTypes';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { GiftedChat, IMessage, MessageText, MessageTextProps } from 'react-native-gifted-chat';
import { COLOR } from '~/styles/constants';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { onSend } from '~/hooks/useOnSend';
import { useChatInit } from '~/hooks/useChatInit';
import CustomBubble from '~/components/Chat/CustomBubble';

// @ts-ignore
import pl from 'dayjs/locale/pl';
import { LoaderScreen } from 'react-native-ui-lib';

// eslint-disable-next-line no-unused-vars
// An interface for our actions

const MessageChat = ({ navigation, route }: NavigationProps<Routes.Message>) => {
  const id = useAppSelector((state) => state.session.id);
  const chat = useAppSelector((state) => state.chat);
  const dispatchChat = useAppDispatch();

  useFocusEffect(useChatInit(id!, route.params.id, dispatchChat));

  // add a function attach file using DocumentPicker.pick

  function renderMessageText(props: MessageTextProps<IMessage>) {
    return (
      <MessageText
        {...props}
        textStyle={{ left: { color: COLOR.WHITE }, right: { color: COLOR.WHITE } }}
      />
    );
  }

  return (
    // <KeyboardAwareScrollView>
    <View style={{ width: '100%', height: '100%' }}>
      {/*// eslint-disable-next-line react/prop-types*/}
      <GiftedChat
        user={chat.user}
        messages={chat.messages}
        onSend={onSend(route.params.id.toString(), dispatchChat)}
        renderBubble={(props) => CustomBubble(props, { navigation, route })}
        renderMessageText={renderMessageText}
        // renderChatEmpty={() => <LoaderScreen color={COLOR.PRIMARY} />}
        // renderLoading={() => <LoaderScreen color={COLOR.PRIMARY} />}
        renderFooter={() =>
          chat.loading ? (
            <LoaderScreen backgroundColor={'transparent'} color={COLOR.PRIMARY} />
          ) : null
        }
        alwaysShowSend={true}
        locale={pl}
      />
    </View>

    // </KeyboardAwareScrollView>
  );
};

export default MessageChat;
