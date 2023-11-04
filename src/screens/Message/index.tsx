import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import Receiver from '~/components/Chat/receiver';
import Sender from '~/components/Chat/sender';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import React from 'react';
import { IconButton, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class MessageChat extends React.Component<NavigationProps<Routes.Message>> {
  private readonly drawer: any;
  constructor(props: NavigationProps<Routes.Message>) {
    super(props);
    this.drawer = this.props.navigation.getParent()?.getParent();

    this.props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          onPress={() => {
            this.drawer.setOptions({
              headerShown: true
            });
            this.props.navigation.goBack();
          }}
          icon={'arrow-left'}
        />
      )
    });
  }
  componentWillUnmount() {
    this.drawer?.setOptions({
      headerShown: true
    });
  }
  componentDidMount() {
    this.drawer?.setOptions({
      headerShown: false
    });
  }

  render() {
    return (
      // <KeyboardAwareScrollView>
      <View style={{ width: '100%', flex: 1, height: '100%' }}>
        <ScrollView showsHorizontalScrollIndicator={false} style={{ height: '100%' }}>
          <Receiver>
            <Text numberOfLines={1}>asdsadasdadddddddddddddd ddddddddddddddddddddiiiiii</Text>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
          </Receiver>
          <Sender>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
          </Sender>
          <Receiver>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
            <Text>asdsadasda</Text>
          </Receiver>
          <TextInput
              style={{ width: 400, backgroundColor: 'white' }}
              placeholder={'Wpisz wiadomość'}
          />
        </ScrollView>

      </View>

      // </KeyboardAwareScrollView>
    );
  }
}

export default MessageChat;
