import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from '/gamecomponents/Board'

export default class Board extends React.Component {

    render() {
        return (
            <Board pairs={10}/>
        );
    }
}

const styles = StyleSheet.create({

});
