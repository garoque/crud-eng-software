import React from 'react';
import { StyleSheet, Text, Platform, SafeAreaView, StatusBar } from 'react-native';
// import Home from './src/screens/Home'
import Navigator from './src/navigator/Navigator'

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {
        Platform.OS === 'ios' ?
          <StatusBar barStyle='dark-content' />
          : null
      }

      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
