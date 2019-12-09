import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './gamecomponents/Board'

export default class ScoreCounter extends React.Component {
    constructor(props) {
        super(props)

        this.matchingSuccessful = this.matchingSuccessful.bind(this);
        this.matchingFailed = this.matchingFailed.bind(this);

        this.state = {score: 0, combo: 10}
    }

    matchingSuccessful() {
        console.log("match!");
    }

    matchingFailed() {
        console.log("not a match!");
    }

    render() { 
        return (
            <View style={styles.container}>
                <View style={styles.scorecontainer}>
                    <Text style={styles.score}>{this.state.score}</Text>
                </View>
                <Board pairs={9}
                    matchingSuccessful={this.matchingSuccessful}
                    matchingFailed={this.matchingFailed}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
    },
    scorecontainer: {
        alignItems: 'center',
        padding: 50,
      },
      score: {
        fontSize:20,
      }
  });
  
