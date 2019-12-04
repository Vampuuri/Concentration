import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import {generateValues, getBoardDimensions} from '../helpers/Generator';

export default class Board extends React.Component {
    constructor(props) {
        super(props)

        this.initializeInformation = this.initializeInformation.bind(this);
        this.makeBoard = this.makeBoard.bind(this);

        this.state = {pairs: this.props.pairs, values: [], rows: 0, cols: 0};
    }

    componentDidMount() {
        this.initializeInformation();
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

        this.setState({pairs: pairs, values: values, rows: rows, cols: cols})
    }

    makeBoard() {
        var board = [];

        if (this.state.rows <= 3) {
            keyCounter = 0;

            for (var i = 0; i < this.state.rows; i++) {
                var itemsInRow = [];

                for (var j = 0; j < this.state.cols; j++) {
                    itemsInRow.push(<Card key={keyCounter} symbol={this.state.values[keyCounter]}/>);
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
                    itemsInRow.push(<Card key={keyCounter} symbol={this.state.values[keyCounter]}/>);
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
  }
});
