import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './gamecomponents/Board'

export default class ScoreCounter extends React.Component {
    constructor(props) {
        super(props)

        this.machingSuccessful = this.machingSuccessful.bind(this);
        this.matchingFailed = this.matchingFailed.bind(this);

        this.state = {score: 0, combo: 10}
    }

    machingSuccessful() {
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
                <Board pairs={9}/>
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
  
