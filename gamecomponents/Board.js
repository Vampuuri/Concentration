import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

export default class Board extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Card symbol="A"/>
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
