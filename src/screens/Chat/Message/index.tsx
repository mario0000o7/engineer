import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fontisto } from '@expo/vector-icons';
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  MessageText,
  MessageTextProps,
  Send,
  SendProps,
  User
} from 'react-native-gifted-chat';
import { COLOR } from '~/styles/constants';
import login from '~/utils/login';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { useAppSelector } from '~/redux/hooks';
import createUser from '~/utils/createUser';
import TextMessage = CometChat.TextMessage;
import CustomMessage = CometChat.CustomMessage;
import MediaMessage = CometChat.MediaMessage;

const pl = require('dayjs/locale/pl');

// An interface for our actions

const MessageChat = ({ navigation, route }: NavigationProps<Routes.Message>) => {
  const drawer = navigation.getParent()?.getParent();
  const id = useAppSelector((state) => state.session.id);
  const idString = id?.toString();
  const email = useAppSelector((state) => state.session.email);
  const [user, setUser] = useState<User>({
    _id: '',
    name: '',
    avatar: ''
  });
  const [messages, setMessages] = useState<IMessage[]>([]);
  createUser(idString!, email!);
  login(idString!);
  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setUID(route.params.id.toString())
    .setLimit(30)
    .build();
  console.log('ID', idString);

  // CometChat.getConversation(route.params.id.toString(), CometChat.RECEIVER_TYPE.USER).then(
  //   (conversation) => {
  //     // console.log('Conversation details fetched for user:', conversation);
  //     const messageList: IMessage[] = [];
  //     console.log('LAST MESSAGE', conversation);
  //     for (let i = 0; i < conversation.getLastMessage().length; i++) {
  //       // setMessages((previousMessages) =>
  //       //   GiftedChat.append(previousMessages, mapMessage(conversation.getLastMessage()[i]))
  //       // );
  //     }
  //     // setMessages((previousMessages) => GiftedChat.append(previousMessages, messageList));
  //   },
  //   (error) => {
  //     console.log('Conversation details fetching failed with error:', error);
  //   }
  // );

  const getHistoryHandler = useCallback(() => {
    messagesRequest.fetchPrevious().then(
      (messages) => {
        // console.log('Message list fetched:', messages[0]);
        // console.log(mapMessage(messages[0] as TextMessage));
        let messageList: IMessage[] = [];
        for (let i = 0; i < messages.length; i++) {
          messageList = messageList.concat(mapMessage(messages[i] as TextMessage));
          console.log('AFTER', messageList[i].user.avatar);
          console.log('MESSAGE', messageList[i]);
        }
        setUser(messageList.find((value) => value.user._id === idString)?.user!);
        setMessages(messageList.reverse());
      },
      (error) => {
        console.log('Message fetching failed with error:', error);
      }
    );
  }, []);

  useFocusEffect(getHistoryHandler);

  // const [channel, setChannel] = useState<Channel>({
  //   _actions: {
  //     message: '',
  //     mute: '',
  //     call: '',
  //     keystrokes: '',
  //     read: '',
  //     update: '',
  //     delete: '',
  //     triggerEvent: '',
  //     clearHistory: '',
  //     hide: '',
  //     invite: '',
  //     createThread: ''
  //   },
  //   _relays: {
  //     messages: '',
  //     members: '',
  //     threads: '',
  //     lastReceivedMessage: '',
  //     messagesCount: '',
  //     context: '',
  //     lastReadMessage: '',
  //     self: '',
  //     unread: '',
  //     calls: ''
  //   },
  //   _streams: {
  //     messages: ''
  //   },
  //   _topics: {
  //     messages: '',
  //     keystrokes: '',
  //     self: '',
  //     events: '',
  //     reactions: '',
  //     typing: '',
  //     readReceipts: '',
  //     participants: ''
  //   },
  //   createdTime: '',
  //   creator: undefined,
  //   id: 0,
  //   lastReceivedMessage: undefined,
  //   members: [],
  //   name: '',
  //   properties: undefined,
  //   type: 'DIRECT'
  // });

  // const startSession = () => {
  //   chatkitty
  //     .startSession({
  //       username: Platform.OS === 'ios' ? 'user-1' : 'user-2'
  //     })
  //     .then((r) => {
  //       console.log(r);
  //       createChannel();
  //     })
  //     .catch((e) => console.log(e));
  // };
  // const createChannel = () => {
  //   chatkitty
  //     .createChannel({
  //       type: 'DIRECT',
  //       members: [
  //         {
  //           username: 'user-1'
  //         },
  //         {
  //           username: 'user-2'
  //         }
  //       ]
  //     })
  //     .then((r) => {
  //       console.log('result', r);
  //       if (!(r instanceof ChatKittyFailedResult)) {
  //         startChatSession(r.channel);
  //       }
  //     });
  // };
  // const startChatSession = (channel: Channel) => {
  //   chatkitty.startChatSession({
  //     channel: channel
  //   });
  // };
  function mapMessage(message: TextMessage): IMessage[] {
    return [
      {
        user: mapUser(message.getSender()),
        _id: message.getId(),
        text: message.getText(),
        createdAt: new Date(message.getSentAt() * 1000)
      }
    ];
  }

  function mapUser(user: CometChat.User | CometChat.Group): User {
    if (user instanceof CometChat.Group) {
      return {
        _id: user.getGuid(),
        name: user.getName(),
        avatar: user.getIcon()
      };
    }
    return {
      _id: user.getUid(),
      name: user.getName(),
      avatar: user.getAvatar()
    };
  }

  const headerHandler = useCallback(() => {
    const listenerID = id!.toString();
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: TextMessage) => {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, mapMessage(textMessage))
          );
          console.log('Text message received successfully', textMessage);
        },
        onMediaMessageReceived: (mediaMessage: MediaMessage) => {
          console.log('Media message received successfully', mediaMessage);
        },
        onCustomMessageReceived: (customMessage: CustomMessage) => {
          console.log('Custom message received successfully', customMessage);
        }
      })
    );
    // startSession();

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
      // CometChat.removeMessageListener(listenerID);
      drawer?.setOptions({
        headerLeft: undefined,
        headerTitle: undefined
      });
    };
  }, []);
  useFocusEffect(headerHandler);

  // add a function attach file using DocumentPicker.pick

  const _pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    });
    console.log(result);
  };

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={_pickDocument}>
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

  const renderBubble = (props: BubbleProps<IMessage>) => {
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

  const onSend = useCallback((message: IMessage[] = []) => {
    console.log(message[0].text);
    const messageText = new CometChat.TextMessage(
      route.params.id.toString(),
      message[0].text,
      CometChat.RECEIVER_TYPE.USER
    );
    console.log(messageText);
    CometChat.sendMessage(messageText).then(
      (message) => {
        console.log('Message sent successfully:', message);
      },
      (error: CometChat.CometChatException) => {
        console.log('Message sending failed with exception:', error);
      }
    );
    console.log(message);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
  }, []);

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
        onSend={onSend}
        locale={pl}
        renderBubble={renderBubble}
        renderMessageText={renderMessageText}
        renderSend={renderSend}
        alwaysShowSend={true}
      />
    </View>

    // </KeyboardAwareScrollView>
  );
};

export default MessageChat;
