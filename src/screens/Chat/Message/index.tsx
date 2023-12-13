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
import { LoaderScreen, Text } from 'react-native-ui-lib';
import { renderSend } from '~/components/Chat/renderSend/renderSend';
import { renderAction } from '~/components/Chat/renderAction';

// eslint-disable-next-line no-unused-vars
// An interface for our actions

const MessageChat = ({ navigation, route }: NavigationProps<Routes.Message>) => {
  const id = useAppSelector((state) => state.session.id);
  const mail = useAppSelector((state) => state.session.email);
  const chat = useAppSelector((state) => state.chat);
  const role = useAppSelector((state) => state.session.role);
  const dispatchChat = useAppDispatch();

  useFocusEffect(useChatInit(id!, mail!, route.params.id, dispatchChat, role!));

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
        renderSend={renderSend}
        renderFooter={() =>
          chat.loading ? (
            <LoaderScreen backgroundColor={'transparent'} color={COLOR.PRIMARY} />
          ) : null
        }
        renderChatEmpty={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ scaleY: -1 }],
              display: chat.loading ? 'none' : 'flex'
            }}>
            <Text style={{ color: COLOR.PRIMARY }}>Brak wiadomości</Text>
          </View>
        )}
        renderActions={renderAction}
        alwaysShowSend={true}
        locale={pl}
      />
    </View>

    // </KeyboardAwareScrollView>
  );
};

export default MessageChat;
