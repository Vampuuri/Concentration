import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ScoreCounter extends React.Component {
    render() { 
        return (
            <View><Text>Score</Text></View>
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
  
