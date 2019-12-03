import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Card extends React.Component {
    render() {
        return (<View style={styles.container_active}><Text>Card</Text></View>);
    }
}

const styles = StyleSheet.create({
  container_active: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    width: 50,
    height: 50,
  },
  container_hidden: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    width: 50,
    height: 50,
    },
});