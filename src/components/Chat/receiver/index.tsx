import { View } from 'react-native';
import { Text } from 'react-native';
import styles from '~/components/Chat/receiver/styles';
import React, { ReactNode } from 'react';

interface ReceiverProps {
  children: ReactNode;
}
const Receiver: React.FC<ReceiverProps> = ({ children }) => {
  return (
    <View style={styles.receiverContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Dr. Jan Kowalski</Text>
        </View>
        <View style={styles.receiverTimeContainer}>
          <Text style={styles.receiverTime}>12:00</Text>
        </View>
      </View>
      <View style={styles.receiverMessageContainer}>
        {/*<Text style={styles.receiverMessage}>{children}</Text>*/}
          <View style={styles.textStyle}>
        {children}
          </View>
      </View>
    </View>
  );
};
export default Receiver;
