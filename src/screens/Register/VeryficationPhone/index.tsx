import { SafeAreaView } from 'react-native';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useAppSelector } from '~/redux/hooks';
// import { Vonage } from '@vonage/server-sdk';
import { Button } from 'react-native-paper';

// import {Nexmo} from 'nexmo';
import { checkVerification, sendSmsVerification } from '~/utils/sendVerifySMS';
import { TextField } from 'react-native-ui-lib';
import { useState } from 'react';

export interface RegisterSchema {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: number;
}

const VerifyStep = ({ navigation }: NavigationProps<Routes.VerifyStep>) => {
  // const recaptchaVerifier = useRef(null);
  // const [requestID, setRequestID] = useState('');
  // const vonage = new Vonage.Vonage({});
  const [code, setCode] = useState('');

  const stored = useAppSelector((state) => state.register);

  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          sendSmsVerification(stored.phone).then();
        }}>
        Send code
      </Button>
      <TextField
        placeholder="Code"
        onChangeText={(text) => setCode(text)}
        // value={code}
      />
      <Button
        onPress={() => {
          checkVerification(stored.phone, code).then();
        }}>
        Send code
      </Button>
    </SafeAreaView>
  );
};

export default VerifyStep;
