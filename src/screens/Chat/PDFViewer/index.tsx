import { NavigationProps, Routes } from '~/router/navigationTypes';
import WebView from 'react-native-webview';
import { useCallback } from 'react';
import { IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

export const PDFViewer = ({ navigation, route }: NavigationProps<Routes.PDFViewer>) => {
  const drawer = navigation.getParent()?.getParent();
  const headerHandler = useCallback(() => {
    drawer?.setOptions({
      headerTitle: 'Podgląd PDF',
      headerLeft: () => (
        <IconButton
          onPress={() => {
            drawer?.setOptions({
              headerShown: true
            });
            navigation.goBack();
          }}
          icon={'arrow-left'}
        />
      )
    });
    return () => {
      drawer?.setOptions({
        headerLeft: undefined,
        headerTitle: undefined
      });
    };
  }, []);
  useFocusEffect(headerHandler);

  return <WebView source={{ uri: route.params.uri }} />;
};

export default PDFViewer;
