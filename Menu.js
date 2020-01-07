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
        this.createDifficultyMenu = this.createDifficultyMenu.bind(this);
        this.createLevelMenu = this.createDifficultyMenu.bind(this);
        this.levelsClicked = this.levelsClicked.bind(this);
        this.playDifficultyClicked = this.playDifficultyClicked.bind(this);
        this.endlessClicked = this.endlessClicked.bind(this);

        this.state = {show: <View></View>
            , customPairAmount: ''
            , customMoveLimit: ''
            , customTimeLimit: ''};
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

    levelsClicked() {
        console.log("levels")
    }

    playDifficultyClicked() {
        console.log("play difficulty")
        this.setState({show: this.createDifficultyMenu()});
    }

    endlessClicked(timetrial) {
        if (timetrial === true) {
            console.log("endless: timed")
        } else {
            console.log("endless: move restrictions")
        }
    }

    highscoresClicked() {
        console.log("highscores")
    }

    checkPairInput() {
        var pairs = parseInt(this.state.customPairAmount)
        var moves = parseInt(this.state.customMoveLimit)
        var time = parseInt(this.state.customTimeLimit)
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
            var movelimitExists = moves !== NaN && moves > 0;
            var timelimitExists = time !== NaN && time > 0;

            console.log(movelimitExists)
            console.log(moves)
            console.log(timelimitExists)
            console.log(time)

            this.setState({show: <ScoreCounter
                pairs={pairs}
                stopPlaying={this.stopPlaying}
                limitedMoves={movelimitExists}
                moves={moves}
                limitedTime={timelimitExists}
                time={time}/>});
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
            <Text>Move limit</Text>
            <TextInput
                keyboardType="numeric"
                onChange={(input) => this.setState({customMoveLimit: input.nativeEvent.text})}
                style={styles.customInput}/>
            <Text>Time limit in seconds</Text>
            <TextInput
                keyboardType="numeric"
                onChange={(input) => this.setState({customTimeLimit: input.nativeEvent.text})}
                style={styles.customInput}/>
            <Text>Leave limits empty or zero for no limits!</Text>
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

    createLevelMenu() {

    }

    createDifficultyMenu() {
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
                <Text style={styles.titleText}>Concentration</Text>
            </View>
            <TouchableOpacity onPress={this.levelsClicked}>
                <View style={styles.button}>
                    <Text>Levels</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.playDifficultyClicked}>
                <View style={styles.button}>
                    <Text>Play difficulty</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.endlessClicked(true)}>
                <View style={styles.button}>
                    <Text>Endless (time)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.endlessClicked(false)}>
                <View style={styles.button}>
                    <Text>Endless (moves)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.customGameClicked}>
                <View style={styles.button}>
                    <Text>Custom game</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.highscoresClicked}>
                <View style={styles.button}>
                    <Text>Highscores</Text>
                </View>
            </TouchableOpacity>
            </View>);
    }

    stopPlaying() {
        this.setState({show: this.createMainMenu()
            , customPairAmount: ''
            , customMoveLimit: ''
            , customTimeLimit: ''})
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
        marginBottom: 3,
      }
  });
  
