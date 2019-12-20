import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.playClicked = this.playClicked.bind(this)
    }

    playClicked() {
        console.log("play")
    }

    render() { 
        return (
            <TouchableOpacity onPress={this.playClicked}>
                <View style={styles.container}>
                    <Text>Play</Text>
                </View>
            </TouchableOpacity>
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
  
