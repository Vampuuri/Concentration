import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ScoreCounter from './ScoreCounter';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.playClicked = this.playClicked.bind(this);
        this.stopPlaying = this.stopPlaying.bind(this);
        this.createMainMenu = this.createMainMenu.bind(this);

        this.state = {show: <View></View>};
    }

    componentDidMount() {
        this.setState({show: this.createMainMenu()})
    }

    playClicked() {
        this.setState({show: <ScoreCounter stopPlaying={this.stopPlaying}/>});
    }

    createMainMenu() {
        return (<View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Choose difficulty</Text>
            </View>
            <TouchableOpacity onPress={this.playClicked}>
                <View style={styles.button}>
                    <Text>Very Easy (4 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.playClicked}>
                <View style={styles.button}>
                    <Text>Easy (6 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.playClicked}>
                <View style={styles.button}>
                    <Text>Medium (10 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.playClicked}>
                <View style={styles.button}>
                    <Text>Hard (14 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.playClicked}>
                <View style={styles.button}>
                    <Text>Very hard (18 pairs)</Text>
                </View>
            </TouchableOpacity>
            </View>);
    }

    stopPlaying() {
        this.setState({show: this.createMainMenu()})
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
      alignItems: 'stretch',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    titleContainer: {
        alignItems: 'center',
        padding: 30,
      },
      titleText: {
        fontSize:20,
      },
      scoreContainer: {
        alignItems: 'center',
        padding: 20,
      },
      buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      button: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 5,
        margin: 2,
      }
  });
  
