import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Board from './gamecomponents/Board'

export default class ScoreCounter extends React.Component {
    constructor(props) {
        super(props)

        this.matchingSuccessful = this.matchingSuccessful.bind(this);
        this.matchingFailed = this.matchingFailed.bind(this);
        this.reset = this.reset.bind(this);
        this.checkWin = this.checkWin.bind(this);

        this.state = {pairs: 4
            , matchedPairs: 0
            , score: 0
            , combo: 10
            , resetBoard: false}
    }

    matchingSuccessful() {
        console.log("match!");
        var score = this.state.score + this.state.combo;
        this.setState({score: score
            , combo: 10
            , matchedPairs: this.state.matchedPairs + 1}, () => this.checkWin())
    }

    matchingFailed() {
        console.log("not a match!");
        if (this.state.combo > 1) {
            this.setState({combo: this.state.combo - 1})
        }
    }

    checkWin() {
        if (this.state.matchedPairs === this.state.pairs) {
            console.log("voitto!")
            Alert.alert(
                'You won!',
                'Your score: ' + this.state.score,
                [
                  {text: 'Reset', onPress: () => this.reset()},
                ],
                {cancelable: false},
              );
        }
    }

    reset() {
        this.setState({pairs: this.state.pairs + 1
            , matchedPairs: 0
            , score: 0
            , combo: 10
            , resetBoard: true}, () => this.setState({resetBoard: false}))
    }

    render() { 
        return (
            <View style={styles.container}>
                <View style={styles.scorecontainer}>
                    <Text style={styles.score}>{this.state.score}</Text>
                </View>
                <Board pairs={this.state.pairs}
                    matchingSuccessful={this.matchingSuccessful}
                    matchingFailed={this.matchingFailed}
                    resetScoring={this.reset}
                    resetBoard={this.state.resetBoard}/>
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
  
