import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from '/gamecomponents/Board'

export default class Board extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Board pairs={9}/>
            </View>
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
  
