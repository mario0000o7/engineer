import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Text } from 'react-native-paper';
import Main from './src/Main.js';
import {NavigationContainer} from "@react-navigation/native";
import 'react-native-gesture-handler';
import {GluestackUIProvider} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"






export default function App() {
    return (
        <GluestackUIProvider config={config}>

        {/*<PaperProvider>*/}

            <Main />

        {/*</PaperProvider>*/}
        </GluestackUIProvider>

    );
}

