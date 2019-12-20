import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import ScoreCounter from './ScoreCounter';
import { TextInput } from 'react-native-gesture-handler';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.playClicked = this.playClicked.bind(this);
        this.stopPlaying = this.stopPlaying.bind(this);
        this.createMainMenu = this.createMainMenu.bind(this);
        this.customGameClicked = this.customGameClicked.bind(this);
        this.createCustomGameMenu = this.createCustomGameMenu.bind(this);
        this.checkPairInput = this.checkPairInput.bind(this);

        this.state = {show: <View></View>, customPairAmount: ''};
    }

    componentDidMount() {
        this.setState({show: this.createMainMenu()})
    }

    playClicked(amountOfPairs) {
        this.setState({show: <ScoreCounter
            pairs={amountOfPairs}
            stopPlaying={this.stopPlaying}/>});
    }

    customGameClicked() {
        console.log("custom")
        this.setState({show: this.createCustomGameMenu()});
    }

    checkPairInput() {
        var pairs = parseInt(this.state.customPairAmount)
        if (pairs === NaN || pairs < 4 || pairs > 18) {
            Alert.alert(
                'Bad input',
                'Pairs must have value between 4 and 18',
                [
                  {text: 'OK'},
                ],
                {cancelable: false},
              );
        } else {
            this.playClicked(pairs);
        }
    }

    createCustomGameMenu() {
        return (<View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Create custom game</Text>
            </View>
            <Text>Amount of pairs (4 - 18)</Text>
            <TextInput
                keyboardType="numeric"
                onChange={(input) => this.setState({customPairAmount: input.nativeEvent.text})}
                style={styles.customInput}/>
            <TouchableOpacity onPress={this.checkPairInput}>
                <View style={styles.button}>
                    <Text>Play</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.stopPlaying}>
                <View style={styles.button}>
                    <Text>Back</Text>
                </View>
            </TouchableOpacity>
        </View>);
    }

    createMainMenu() {
        return (<View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Choose difficulty</Text>
            </View>
            <TouchableOpacity onPress={() => this.playClicked(4)}>
                <View style={styles.button}>
                    <Text>Very Easy (4 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.playClicked(6)}>
                <View style={styles.button}>
                    <Text>Easy (6 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.playClicked(10)}>
                <View style={styles.button}>
                    <Text>Medium (10 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.playClicked(15)}>
                <View style={styles.button}>
                    <Text>Hard (15 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.playClicked(18)}>
                <View style={styles.button}>
                    <Text>Very hard (18 pairs)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.customGameClicked}>
                <View style={styles.button}>
                    <Text>Custom</Text>
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
      },
      customInput: {
        borderColor: 'black',
        borderWidth: 1,
      }
  });
  
