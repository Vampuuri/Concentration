import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ScoreCounter extends React.Component {
    render() { 
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{this.props.win ? "You won!" : "Too bad!"}</Text>
                </View>
                {this.props.win ?
                    <View style={styles.scoreContainer}>
                        <Text>Your score was:</Text>
                        <Text>{this.props.score}</Text>
                    </View>
                    :
                    <View style={styles.scoreContainer}>
                    {this.props.timer ?
                        <Text>You ran out of time</Text>
                        :
                        <Text>You ran out of moves</Text>}
                    </View>
                }
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.props.stopPlaying}>
                        <View style={styles.button}><Text>Stop playing</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.reset}>
                        <View style={styles.button}><Text>Try again</Text></View>
                    </TouchableOpacity>
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
      justifyContent: 'center',
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
  
