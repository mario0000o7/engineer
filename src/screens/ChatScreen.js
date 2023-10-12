import HomeScreen from "./HomeScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SettingsScreen from "./SettingsScreen";
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";
import RecentlyMessagesScreen from "./RecentlyMessages";
import {createIcon, Icon, View} from "@gluestack-ui/themed";
import {Path, Rect} from "react-native-svg";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Tab = createBottomTabNavigator();

const GroupIcon = createIcon({
    viewBox: "0 0 49 49",
    path:(
        <>
            <Rect width="49" height="49" />
            <Path d="M18 6C12.4772 6 8 10.4772 8 16C8 21.5228 12.4772 26 18 26C23.5228 26 28 21.5228 28 16C28 10.4772 23.5228 6 18 6ZM12 16C12 12.6863 14.6863 10 18 10C21.3137 10 24 12.6863 24 16C24 19.3137 21.3137 22 18 22C14.6863 22 12 19.3137 12 16Z" fill="#2E3A59"/>
            <Path d="M33.8168 16.4366C33.2542 16.1497 32.6316 16.0001 32 16.0001V12.0001C33.2632 12.0001 34.5084 12.2991 35.6338 12.8729C35.7577 12.9361 35.8798 13.0024 36 13.0718C36.9708 13.6323 37.8144 14.3914 38.4746 15.3011C39.2165 16.3234 39.7059 17.5069 39.9025 18.7547C40.0991 20.0025 39.9975 21.2792 39.6059 22.4801C39.2142 23.6811 38.5438 24.7722 37.6494 25.6643C36.7551 26.5563 35.6622 27.2239 34.4602 27.6123C33.3906 27.958 32.2617 28.0739 31.1471 27.9544C31.0091 27.9396 30.8714 27.9212 30.734 27.8992C29.4876 27.6994 28.3062 27.2076 27.2862 26.4638L27.2842 26.4623L29.6421 23.2311C30.1523 23.6034 30.7434 23.8495 31.367 23.9495C31.9907 24.0494 32.6291 24.0003 33.23 23.806C33.831 23.6118 34.3775 23.2781 34.8246 22.832C35.2718 22.386 35.607 21.8405 35.8028 21.24C35.9986 20.6396 36.0494 20.0013 35.9511 19.3774C35.8528 18.7535 35.6082 18.1618 35.2372 17.6506C34.8662 17.1395 34.3795 16.7234 33.8168 16.4366Z" fill="#2E3A59"/>
            <Path d="M39.9962 42C39.9962 40.9499 39.7894 39.9101 39.3875 38.94C38.9857 37.9698 38.3967 37.0883 37.6542 36.3458C36.9117 35.6033 36.0302 35.0143 35.06 34.6125C34.0899 34.2106 33.0501 34.0038 32 34.0038V30C33.3642 30 34.7168 30.2326 36 30.6863C36.1991 30.7567 36.3966 30.8324 36.5922 30.9134C38.0481 31.5165 39.371 32.4004 40.4853 33.5147C41.5996 34.629 42.4835 35.9519 43.0866 37.4078C43.1676 37.6034 43.2433 37.8009 43.3137 38C43.7674 39.2832 44 40.6358 44 42H39.9962Z" fill="#2E3A59"/>
            <Path d="M32 42H28C28 36.4772 23.5228 32 18 32C12.4772 32 8 36.4772 8 42H4C4 34.268 10.268 28 18 28C25.732 28 32 34.268 32 42Z" fill="#2E3A59"/>
        </>
    )


})
const ChatIcon = createIcon({
    viewBox: "0 0 49 49",
    path:(
        <>
            <Rect width="49" height="49" />
            <Path d="M4 8V36L13.6 28.8C14.2916 28.2793 15.1343 27.9984 16 28H32C34.2091 28 36 26.2091 36 24V8C36 5.79086 34.2091 4 32 4H8C5.79086 4 4 5.79086 4 8ZM8 28V8H32V24H14.668C13.8021 23.9977 12.9593 24.2786 12.268 24.8L8 28Z" fill="#2E3A59"/>
            <Path d="M44 44V18C44 15.7909 42.2091 14 40 14V36L35.732 32.8C35.0407 32.2786 34.1979 31.9977 33.332 32H14C14 34.2091 15.7909 36 18 36H32C32.8657 35.9984 33.7084 36.2793 34.4 36.8L44 44Z" fill="#2E3A59"/>
        </>
    )


})


const ChatScreen = () => {
    return (
        <Tab.Navigator
        initialRouteName="Ostatnie wiadomości"

        >


            <Tab.Screen
                name="Ostatnie wiadomości"
                fontSize={20}

                component={RecentlyMessagesScreen}
                options={{

                    headerShown: false,
                    tabBarLabelStyle: { fontSize: 15 },
                    tabBarIcon: ({ color }) => (
                        <GroupIcon size='l' color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Lista lekarzy"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: { fontSize: 15 },
                    tabBarIcon: ({ color }) => (
                        <ChatIcon size='l' color={color}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )

}
export default ChatScreen