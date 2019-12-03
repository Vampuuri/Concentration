import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

export default class Board extends React.Component {
    constructor(props) {
        super(props)

        this.makeBoard = this.makeBoard.bind(this);

        this.state = {values: ['A', 'B', 'C', 'D']};
    }

    makeBoard() {
        return (<View style={styles.row}>
            <View style={styles.column}>
                <Card symbol={this.state.values[0]}/>
                <Card symbol={this.state.values[1]}/>
            </View>
            <View style={styles.column}>
                <Card symbol={this.state.values[2]}/>
                <Card symbol={this.state.values[3]}/>
            </View>
        </View>);
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
