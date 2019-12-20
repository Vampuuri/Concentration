import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Board from './gamecomponents/Board'
import ScoreScreen from './ScoreScreen'

export default class ScoreCounter extends React.Component {
    constructor(props) {
        super(props)

        this.matchingSuccessful = this.matchingSuccessful.bind(this);
        this.matchingFailed = this.matchingFailed.bind(this);
        this.reset = this.reset.bind(this);
        this.checkWin = this.checkWin.bind(this);

        this.state = {pairs: this.props.pairs
            , matchedPairs: 0
            , score: 0
            , combo: 10
            , resetBoard: false
            , win: false}
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
        this.setState({win: this.state.matchedPairs === this.state.pairs});
    }

    reset() {
        this.setState({pairs: this.state.pairs
            , matchedPairs: 0
            , score: 0
            , combo: 10
            , resetBoard: true
            , win: false}, () => this.setState({resetBoard: false}))
    }

    render() { 
        return (
            <View>
            {this.state.win ?
                <View style={styles.container}>
                <ScoreScreen 
                    win={true}
                    score={this.state.score}
                    timer={false}
                    reset={() => this.reset()}
                    stopPlaying={() => this.props.stopPlaying()}/>
                </View> 
                :
                <View style={styles.container}>
                <View style={styles.scorecontainer}>
                    <Text style={styles.score}>{this.state.score}</Text>
                </View>
                <Board pairs={this.state.pairs}
                    matchingSuccessful={this.matchingSuccessful}
                    matchingFailed={this.matchingFailed}
                    resetScoring={this.reset}
                    resetBoard={this.state.resetBoard}/>
                {this.props.limitedMoves || this.props.limitedTime ? 
                    <View style={styles.scorecontainer}>
                        {this.props.limitedTime ? <Text>Time left: </Text> : <View></View>}
                        {this.props.limitedMoves ? <Text>Moves left: </Text> : <View></View>}
                    </View>
                    :
                    <View></View>}
                </View>
            }
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
      },

  });
  
