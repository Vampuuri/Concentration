import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ScoreCounter extends React.Component {
    render() { 
        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>You won!</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text>Your score was:</Text>
                    <Text>0</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Text>Stop playing</Text></View>
                    <View style={styles.button}><Text>Try again</Text></View>
                </View>
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
    titleContainer: {
      alignItems: 'center',
      padding: 30,
    },
    titleText: {
      fontSize:20,
    },
    scoreContainer: {
      alignItems: 'center',
      padding: 20,
    },
    buttonContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      padding: 5,
      margin: 2,
    }
  });
  
