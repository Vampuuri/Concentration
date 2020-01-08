import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Menu from './Menu';

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={require('./assets/background.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Menu/>
        </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
