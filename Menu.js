import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Board from './gamecomponents/Board'

export default class Menu extends React.Component {

    render() { 
        return (
            <View style={styles.container}>
                <Text>Menu</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    },
  });
  
