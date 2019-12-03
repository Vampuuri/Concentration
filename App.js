import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './gamecomponents/Board';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Board pairs={6}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
