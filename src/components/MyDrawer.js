import * as React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CalendarScreen from "../screens/CalendarScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatNavigation from "../screens/ChatNavigation";
// import {NavigationContainer} from "@react-navigation/native";



const Drawer = createDrawerNavigator();
const MyDrawer = () => {
    // const [active, setActive] = React.useState('');

    return (
        <Drawer.Navigator initialRouteName="Kalendarz"
        detachInactiveScreens={true}>

            <Drawer.Screen name="Kalendarz" component={CalendarScreen} />
            <Drawer.Screen name="Wiadomości" component={ChatNavigation} />
            <Drawer.Screen name="Pliki" component={SettingsScreen} />
            <Drawer.Screen name="Gabinety" component={SettingsScreen} />
            <Drawer.Screen name="Konto" component={SettingsScreen} />
            <Drawer.Screen name="Ustawienia" component={SettingsScreen} />


            {/*<Drawer.Screen name="Notifications" component={SettingsScreen} />*/}
        </Drawer.Navigator>
    );
};
export default MyDrawer

