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

        this.setState({pairs: pairs, rows: rows, cols: cols})
    }

    makeBoard() {
        var board = [];

        if (this.state.rows <= 3) {
            for (var i = 0; i < this.state.rows; i++) {
                var itemsInRow = [];

                for (var j = 0; j < this.state.cols; j++) {
                    itemsInRow.push(<Card key={i*this.state.cols + j} symbol={1}/>);
                }

                board.push(<View key={i} style={styles.column}>{itemsInRow}</View>);
            }
        }

        return (<View style={styles.row}>{board}</View>);

        /**
        return (<View style={styles.row}>
            <View style={styles.column}>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
            </View>
            <View style={styles.column}>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
            </View>
            <View style={styles.column}>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
            </View>
            <View style={styles.column}>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
            </View>
            <View style={styles.column}>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
            </View>
            <View style={styles.column}>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
                <Card symbol={1}/>
            </View>
        </View>);*/
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
