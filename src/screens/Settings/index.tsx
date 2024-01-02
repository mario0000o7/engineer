import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, View } from 'react-native-ui-lib';

const Settings = ({ navigation }: NavigationProps<Routes.Settings>) => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
