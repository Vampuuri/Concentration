import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Card from './Card';
import {generateValues, getBoardDimensions} from '../helpers/Generator';

export default class Board extends React.Component {
    constructor(props) {
        super(props)

        this.initializeInformation = this.initializeInformation.bind(this);
        this.makeBoard = this.makeBoard.bind(this);
        this.receiveCardInfo = this.receiveCardInfo.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.reset = this.reset.bind(this);

        this.state = {pairs: this.props.pairs
            , matchedPairs: 0
            , values: []
            , rows: 0
            , cols: 0
            , invisible: []
            , enableFlipping: true
            , flippedCard: {key: -1, value: null}
            , refresh: false
            , score: 0};
    }

    componentDidMount() {
        this.initializeInformation();
    }

    receiveCardInfo(cardKey, cardValue) {
        console.log("card flipped")

        if (this.state.flippedCard.key === -1) {
            console.log("add card to state")
            this.setState({flippedCard: {key: cardKey, value: cardValue}})
        } else if (this.state.flippedCard.key !== -1 && this.state.flippedCard.key !== cardKey) {
            console.log("matching...")
            this.setState({enableFlipping: false}, () => {
                setTimeout(() => {
                    if (cardValue === this.state.flippedCard.value) {
                        console.log("the cards match!")
                        var invisible = [...this.state.invisible]
                        invisible[cardKey] = true;
                        invisible[this.state.flippedCard.key] = true;

                        this.setState({invisible: invisible
                            , enableFlipping: true
                            , flippedCard: {key: -1, value: null}
                            , score: this.state.score + 1
                            , matchedPairs: this.state.matchedPairs + 1}, () => this.checkWin())
                    } else {
                        console.log("not a match")
                        this.setState({flippedCard: {key: -1, value: null}
                            , refresh: true
                            , enableFlipping: true},
                            () => this.setState({refresh: false}))
                    }
                }, 1000)
            })
        }
    }

    checkWin() {
        if (this.state.pairs === this.state.matchedPairs) {
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
        console.log("reset")
        this.setState({refresh: true, score: 0, matchedPairs: 0},
            () => this.setState({refresh: false},
                () => this.initializeInformation()))
    }

    initializeInformation() {
        var pairs = this.props.pairs;

        if (pairs > 18) {
            pairs == 18;
        } else if (pairs < 4) {
            pairs == 4;
        }

        var dimensions = getBoardDimensions(pairs);
        var rows = dimensions.rows;
        var cols = dimensions.cols;
        var values = generateValues(pairs);

        var invisible = []

        for (var i = 0; i < pairs*2; i++) {
            invisible.push(false);
        }

        this.setState({pairs: pairs, values: values, rows: rows, cols: cols, invisible: invisible})
    }

    makeBoard() {
        var board = [];

        if (this.state.rows <= 3) {
            keyCounter = 0;

            for (var i = 0; i < this.state.rows; i++) {
                var itemsInRow = [];

                for (var j = 0; j < this.state.cols; j++) {
                    itemsInRow.push(<Card key={keyCounter}
                        id={keyCounter}
                        invisible={this.state.invisible[keyCounter]}
                        enabled={this.state.enableFlipping}
                        symbol={this.state.values[keyCounter]}
                        returnvalues={this.receiveCardInfo}
                        refresh={this.state.refresh}/>);
                    keyCounter++;
                }

                board.push(<View key={i} style={styles.column}>{itemsInRow}</View>);
            }
        } else {
            var goesOver = this.state.pairs - (this.state.cols * (this.state.rows - 2))/2;
            keyCounter = 0;

            for (var i = 0; i < this.state.rows; i++) {
                var colCounter;

                if (i === 0 || i === this.state.rows - 1) {
                    colCounter = goesOver;
                } else {
                    colCounter = this.state.cols;
                }

                var itemsInRow = [];

                for (var j = 0; j < colCounter; j++) {
                    itemsInRow.push(<Card key={keyCounter}
                        id={keyCounter}
                        invisible={this.state.invisible[keyCounter]}
                        enabled={this.state.enableFlipping}
                        symbol={this.state.values[keyCounter]}
                        returnvalues={this.receiveCardInfo}
                        refresh={this.state.refresh}/>);
                    keyCounter++;
                }

                board.push(<View key={i} style={styles.column}>{itemsInRow}</View>);
            }
        }

    return (<View style={styles.row}>{board}</View>);
    }

    render() {
        return (
            <View> 
                <View style={styles.scorecontainer}><Text style={styles.score}>{this.state.score}</Text></View>
                {this.makeBoard()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'row',
  },
  scorecontainer: {
    marginTop:70,
    alignItems: 'center',
  },
  score: {
    fontSize:20,
  }
});
