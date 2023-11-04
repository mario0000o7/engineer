import { View } from 'react-native';
import styles from '~/components/Chat/sender/styles';
import { Text } from 'react-native-paper';
import React, { ReactNode } from 'react';

interface SenderProps {
  children: ReactNode;
}
const Sender: React.FC<SenderProps> = ({ children }) => {
  return (
    <View style={styles.receiverContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.receiverTimeContainer}>
          <Text style={styles.receiverTime}>12:00</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Dr. Jan Kowalski2</Text>
        </View>
      </View>
      <View style={styles.receiverMessageContainer}>
        {/*<Text style={styles.receiverMessage}>{message}</Text>*/}
        <View style={styles.textStyle}>{children}</View>
      </View>
    </View>
  );
};
export default Sender;
