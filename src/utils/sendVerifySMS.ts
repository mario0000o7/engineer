import { TWILIO_AUTH_TOKEN, TWILIO_SID, TWILIO_URL, TWILIO_VERIFY_SID } from '@env';
import { encode as btoa } from 'base-64';
import axios from 'axios';
import qs from 'qs';

// const client = require('twilio')(accountSid, authToken);

export const sendSmsVerification = async (phoneNumber: string) => {
  try {
    const body = {
      To: phoneNumber.replaceAll(/\s/g, ''),
      Channel: 'sms'
    };

    const response = await axios.post(
      `${TWILIO_URL}/${TWILIO_VERIFY_SID}/Verifications`,
      qs.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${TWILIO_SID}:${TWILIO_AUTH_TOKEN}`)}`
        }
      }
    );

    const json = await response.data;
    console.log(json);
    return json.status === 'pending';
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkVerification = async (phoneNumber: string, code: string) => {
  try {
    const data = qs.stringify({
      To: '+48' + phoneNumber.replaceAll(/\s/g, ''),
      Code: code
    });

    const response = await axios.post(
      `${TWILIO_URL}/${TWILIO_VERIFY_SID}/VerificationCheck`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${TWILIO_SID}:${TWILIO_AUTH_TOKEN}`)}`
        }
      }
    );
    const json = await response.data;
    return json.valid;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification
};
