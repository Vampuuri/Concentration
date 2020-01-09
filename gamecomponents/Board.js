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
        this.reset = this.reset.bind(this);

        this.state = {pairs: this.props.pairs
            , values: []
            , rows: 0
            , cols: 0
            , invisible: []
            , enableFlipping: true
            , flippedCard: {key: -1, value: null}
            , refresh: false};
    }

    componentDidMount() {
        this.initializeInformation();
    }

    componentWillReceiveProps(newprops) {
        if (newprops.resetBoard) {
            this.setState({refresh: true, pairs: newprops.pairs},
                () => this.setState({refresh: false},
                    () => this.initializeInformation()))
        }
    }

    /**
     * Checks flipped card's value.
     * 
     * It there was already flipped card, checks if the symbol match with earlier card.
     * 
     * @param {*} cardKey 
     * @param {*} cardValue 
     */
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
                        this.props.matchingSuccessful();
                        var invisible = [...this.state.invisible]
                        invisible[cardKey] = true;
                        invisible[this.state.flippedCard.key] = true;

                        this.setState({invisible: invisible
                            , enableFlipping: true
                            , flippedCard: {key: -1, value: null}});
                    } else {
                        this.props.matchingFailed();
                        this.setState({flippedCard: {key: -1, value: null}
                            , refresh: true
                            , enableFlipping: true},
                            () => this.setState({refresh: false}))
                    }
                }, 1000)
            })
        }
    }

    reset() {
        console.log("reset")
        this.props.resetScoring();
        this.setState({refresh: true, score: 0, matchedPairs: 0},
            () => this.setState({refresh: false},
                () => this.initializeInformation()))
    }

    /**
     * Gets needed information (dimensions, values of cards) from Generator.
     */
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

    /**
     * Generates and returns boards.
     */
    makeBoard() {
        var board = [];

        if (this.state.rows <= 3) {
            // These formations have fixed rows and cols and every spot gets filled.

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
            // Other formations have fixed, filled rows, but some cards go over these rows.
            // The overflow cards must be divided evenly between the overflow rows.

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
            <View style={{flex: 1}}>
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
    flexDirection: 'column',
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
