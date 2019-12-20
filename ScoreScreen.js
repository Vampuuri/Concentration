import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ScoreCounter extends React.Component {
    render() { 
        if (this.props.win) {
            return (
                <View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>You won!</Text>
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text>Your score was:</Text>
                        <Text>{this.props.score}</Text>
                    </View>
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
        } else {
            if (this.props.timer) {
                return (
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Too bad!</Text>
                        </View>
                        <View style={styles.scoreContainer}>
                            <Text>You ran out of time</Text>
                        </View>
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
            } else {
                return (
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Too bad!</Text>
                        </View>
                        <View style={styles.scoreContainer}>
                            <Text>You ran out of moves</Text>
                        </View>
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
  
