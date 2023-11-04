import { ScrollView, Text, View } from 'react-native';
import Receiver from '~/components/Chat/receiver';
import Sender from '~/components/Chat/sender';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import React from 'react';

class MessageChat extends React.Component<NavigationProps<Routes.Message>> {
  private readonly drawer: any;
  constructor(props: NavigationProps<Routes.Message>) {
    super(props);
    this.drawer = this.props.navigation.getParent()?.getParent();
    this.drawer?.setOptions({
      headerShown: false
    });
  }
  componentWillUnmount() {
    this.drawer?.setOptions({
      headerShown: true
    });
  }


  render() {
    return (
      <View style={{ width: '100%', flex: 1, height: '100%' }}>
        <ScrollView showsHorizontalScrollIndicator={false} style={{ height: '100%' }}>
          <Receiver>
            <Text numberOfLines={1}>
              asdsadasdadddddddddddddd ddddddddddddddddddddiiiiii
            </Text>
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
        </ScrollView>
      </View>
    );
  }
}

export default MessageChat;
