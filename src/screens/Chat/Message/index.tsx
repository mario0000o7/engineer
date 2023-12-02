import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import {
  GiftedChat,
  IMessage,
  MessageText,
  MessageTextProps,
  User
} from 'react-native-gifted-chat';
import { COLOR } from '~/styles/constants';
import { useAppSelector } from '~/redux/hooks';
import { renderSend } from '~/components/Chat/renderSend/renderSend';
import { onSend } from '~/hooks/useOnSend';
import { useChatInit } from '~/hooks/useChatInit';
import CustomBubble from '~/components/Chat/CustomBubble';

// An interface for our actions

const MessageChat = ({ navigation, route }: NavigationProps<Routes.Message>) => {
  const drawer = navigation.getParent()?.getParent();
  const id = useAppSelector((state) => state.session.id);

  const email = useAppSelector((state) => state.session.email);
  const [user, setUser] = useState<User>({
    _id: '',
    name: '',
    avatar: ''
  });
  const [messages, setMessages] = useState<IMessage[]>([]);

  const headerHandler = useCallback(() => {
    drawer?.setOptions({
      headerTitle: route.params.name,
      headerLeft: () => (
        <IconButton
          onPress={() => {
            drawer?.setOptions({
              headerShown: true
            });
            navigation.goBack();
          }}
          icon={'arrow-left'}
        />
      )
    });
    return () => {
      drawer?.setOptions({
        headerLeft: undefined,
        headerTitle: undefined
      });
    };
  }, []);
  useFocusEffect(headerHandler);
  useFocusEffect(useChatInit(id!, route.params.id, email, setMessages, setUser));

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
      <GiftedChat
        user={user}
        messages={messages}
        onSend={onSend(route.params.id.toString(), setMessages)}
        renderBubble={(props) => CustomBubble(props, { navigation, route })}
        renderMessageText={renderMessageText}
        renderSend={renderSend}
        alwaysShowSend={true}
      />
    </View>

    // </KeyboardAwareScrollView>
  );
};

export default MessageChat;
