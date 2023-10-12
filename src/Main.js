
import { Text } from 'react-native-paper';
import MyDrawer from "./components/MyDrawer";
import {NavigationContainer} from "@react-navigation/native";


export default function Main() {
    return (
        <>
            <NavigationContainer>
                <MyDrawer/>
            </NavigationContainer>

        </>

    );
}