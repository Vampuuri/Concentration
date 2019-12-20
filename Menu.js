import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ScoreCounter from './ScoreCounter';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.playClicked = this.playClicked.bind(this)

        this.state={show: <TouchableOpacity onPress={this.playClicked}>
                <Text>Play</Text>
            </TouchableOpacity>}
    }

    playClicked() {
        console.log("play");
        this.setState({show: <ScoreCounter/>});
    }

    render() { 
        return (
            <View style={styles.container}>
                {this.state.show}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    },
  });
  
