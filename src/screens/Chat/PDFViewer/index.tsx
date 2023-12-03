import { NavigationProps, Routes } from '~/router/navigationTypes';
import WebView from 'react-native-webview';
import { useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native-ui-lib';
import { Platform } from 'react-native';

export const PDFViewer = ({ navigation, route }: NavigationProps<Routes.PDFViewer>) => {
  const webViewRef = useRef<WebView>(null);
  useFocusEffect(() => {
    webViewRef.current?.reload();
  });

  if (Platform.OS === 'web') {
    return <iframe src={route.params.file.uri} width="100%" height="100%" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        domStorageEnabled={true}
        ref={webViewRef}
        scalesPageToFit={true}
        startInLoadingState={true}
        source={{ uri: route.params.file.uri }}
      />
    </View>
  );
};

export default PDFViewer;
