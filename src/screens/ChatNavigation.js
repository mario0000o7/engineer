

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChatScreen from "./ChatScreen";
import MessageChat from "./MessageChat";
import {useState} from "react";

const Stack = createNativeStackNavigator();
const ChatNavigation=()=> {
    const [doctorName,setDoctorName]=useState('New');
    return (
        <Stack.Navigator
        >
            <Stack.Screen name="ChatScreen" component={ChatScreen}
            options={{headerShown:false}}
                          initialParams={{setDoctorName:setDoctorName}}
            />
            <Stack.Screen name="MessageChat" component={MessageChat}
            options={{headerTitle:doctorName}}
            />
        </Stack.Navigator>
    )
}

export default ChatNavigation;