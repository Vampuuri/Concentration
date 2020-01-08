import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Board from './gamecomponents/Board'
import ScoreScreen from './ScoreScreen'

export default class ScoreCounter extends React.Component {
    constructor(props) {
        super(props)

        this.matchingSuccessful = this.matchingSuccessful.bind(this);
        this.matchingFailed = this.matchingFailed.bind(this);
        this.reset = this.reset.bind(this);
        this.endlessReset = this.endlessReset.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.giveup = this.giveup.bind(this);

        this.state = {pairs: this.props.pairs
            , matchedPairs: 0
            , score: 0
            , combo: 10
            , movesLeft: this.props.moves
            , timeLeft: this.props.time
            , resetBoard: false
            , win: false
            , oldHighscore: this.props.oldHighscore}

        this.interval = null;
    }

    componentDidMount() {
        if (this.props.limitedTime) {
            this.interval = setInterval(() => {
                if (this.state.timeLeft > 0) {
                    this.setState({timeLeft: this.state.timeLeft - 1});
                } else {
                    this.setState({gameOver: true}, () => clearInterval(this.interval));
                }
            }
            , 1000);
        }
    }

    matchingSuccessful() {
        console.log("match!");
        var score = this.state.score + this.state.combo;
        if (this.props.limitedMoves) {
            this.setState({score: score
                , combo: 10
                , movesLeft: this.state.movesLeft - 1
                , matchedPairs: this.state.matchedPairs + 1}, () => this.checkWin())
        } else {
            this.setState({score: score
                , combo: 10
                , matchedPairs: this.state.matchedPairs + 1}, () => this.checkWin())
        }
    }

    matchingFailed() {
        console.log("not a match!");
        if (this.state.combo > 1) {
            this.setState({combo: this.state.combo - 1})
        }

        if (this.props.limitedMoves) {
            this.setState({movesLeft: this.state.movesLeft - 1}, this.checkWin)
        }
    }

    checkWin() {
        if (this.props.endless) {
            if (this.props.limitedTime) {
                if (this.state.matchedPairs === this.state.pairs) {
                    clearInterval(this.interval)
                    this.setState({win: this.state.matchedPairs === this.state.pairs});
                } else {
                    this.setState({win: this.state.matchedPairs === this.state.pairs});
                }
            } else {
                if (this.state.matchedPairs === this.state.pairs) {
                    this.setState({win: this.state.matchedPairs === this.state.pairs
                        , gameOver: this.state.movesLeft === 0});
                } else {
                    this.setState({win: this.state.matchedPairs === this.state.pairs, gameOver: this.state.movesLeft === 0});
                }
            }
        } else if (this.props.limitedMoves && this.props.limitedTime) {
            if (this.state.matchedPairs === this.state.pairs) {
                clearInterval(this.interval)
                this.setState({win: this.state.matchedPairs === this.state.pairs
                    , score: this.state.score + this.state.timeLeft + this.state.movesLeft * 10
                    , gameOver: this.state.movesLeft === 0});
            } else {
                this.setState({win: this.state.matchedPairs === this.state.pairs, gameOver: this.state.movesLeft === 0});
            }
        } else if (this.props.limitedMoves) {
            if (this.state.matchedPairs === this.state.pairs) {
                this.setState({win: this.state.matchedPairs === this.state.pairs
                    , score: this.state.score + this.state.movesLeft * 10
                    , gameOver: this.state.movesLeft === 0});
            } else {
                this.setState({win: this.state.matchedPairs === this.state.pairs, gameOver: this.state.movesLeft === 0});
            }
        } else if (this.props.limitedTime) {
            if (this.state.matchedPairs === this.state.pairs) {
                clearInterval(this.interval)
                this.setState({win: this.state.matchedPairs === this.state.pairs
                    , score: this.state.score + this.state.timeLeft});
            } else {
                this.setState({win: this.state.matchedPairs === this.state.pairs});
            }
        } else {
            this.setState({win: this.state.matchedPairs === this.state.pairs});
        }
    }

    reset() {
        if (this.state.oldHighscore < this.state.score) {
            this.setState({oldHighscore: this.state.score});
        }

        this.setState({pairs: this.state.pairs
            , matchedPairs: 0
            , score: 0
            , combo: 10
            , movesLeft: this.props.moves
            , timeLeft: this.props.time
            , resetBoard: true
            , win: false
            , gameOver: false}, () => this.setState({resetBoard: false}, this.componentDidMount))
    }

    endlessReset() {
        if (this.state.oldHighscore < this.state.score) {
            this.setState({oldHighscore: this.state.score});
        }

        var pairs = this.state.pairs;

        if (pairs < 18) {
            pairs++;
        }

        if (this.props.limitedTime) {
            this.setState({pairs: pairs
                , matchedPairs: 0
                , combo: 10
                , timeLeft: this.state.timeLeft + 45
                , resetBoard: true
                , win: false
                , gameOver: false}, () => this.setState({resetBoard: false}, this.componentDidMount))
        } else {
            this.setState({pairs: pairs
                , matchedPairs: 0
                , combo: 10
                , movesLeft: this.props.moves + 30
                , resetBoard: true
                , win: false
                , gameOver: false}, () => this.setState({resetBoard: false}, this.componentDidMount))
        }
    }

    giveup() {
        if (this.props.limitedTime) {
            clearInterval(this.interval);
        }

        this.props.stopPlaying();
    }

    render() { 
        return (
            <View>
            {this.state.win || this.state.gameOver ?
                this.props.endless ?
                    <View style={styles.container}>
                    <ScoreScreen 
                        win={this.state.win}
                        score={this.state.score}
                        oldHighscore={this.state.oldHighscore}
                        timer={this.state.timeLeft === 0}
                        reset={() => this.endlessReset()}
                        stopPlaying={() => this.props.stopPlaying()}
                        endless={true}
                        gamemode={this.props.gamemode} />
                    </View>
                    :
                    <View style={styles.container}>
                    <ScoreScreen 
                        win={this.state.win}
                        score={this.state.score}
                        oldHighscore={this.state.oldHighscore}
                        timer={this.state.timeLeft === 0}
                        reset={() => this.reset()}
                        stopPlaying={() => this.props.stopPlaying()}
                        endless={false}
                        custom={this.props.custom}
                        gamemode={this.props.gamemode} />
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
                    <View style={{alignItems: 'center', paddingTop:10}}>
                        {this.props.limitedTime ? <Text>Time left: {this.state.timeLeft}</Text> : <View></View>}
                        {this.props.limitedMoves ? <Text>Moves left: {this.state.movesLeft}</Text> : <View></View>}
                    </View>
                    :
                    <View></View>}
                <TouchableOpacity onPress={this.giveup}><View style={styles.button}><Text>Give up</Text></View></TouchableOpacity>
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
        paddingTop: 50,
    },
    score: {
        fontSize:20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'rgb(255, 227, 135)',
        padding: 5,
        borderRadius: 5,
        margin: 2,
        width: 150,
        color: 'black'
    },

  });
  
