import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
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
        this.playDifficultyClicked = this.playDifficultyClicked.bind(this);
        this.endlessClicked = this.endlessClicked.bind(this);
        this.createEndlessMoveScreen = this.createEndlessMoveScreen.bind(this);
        this.createEndlessTimedScreen = this.createEndlessTimedScreen.bind(this);

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

    playDifficultyClicked() {
        console.log("play difficulty")
        this.setState({show: this.createDifficultyMenu()});
    }

    endlessClicked(timetrial) {
        if (timetrial === true) {
            console.log("endless: timed")
            this.setState({show: this.createEndlessTimedScreen()});
        } else {
            console.log("endless: move restrictions")
            this.setState({show: this.createEndlessMoveScreen()});
        }
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
                <Image source={require('./assets/title.png')} style={{marginBottom: 30}} />
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            </View>
        </View>);
    }

    createEndlessTimedScreen() {
        return (<View>
            <Image source={require('./assets/title.png')} style={{marginBottom: 30}} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Endless (time)</Text>
            </View>
            <Text>You will start with XX seconds.</Text>
            <Text>After every level difficulty will rise.</Text>
            <Text>Beating level gives you XX more seconds.</Text>
            <Text>The game ends when you run out of time.</Text>
            <Text>Your current highscore: </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.playClicked(6)}>
                    <View style={styles.button}>
                        <Text>Play</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.stopPlaying}>
                    <View style={styles.button}>
                        <Text>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>);
    }

    createEndlessMoveScreen() {
        return (<View>
            <Image source={require('./assets/title.png')} style={{marginBottom: 30}} />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Endless (moves)</Text>
            </View>
            <Text>You will start with XX moves.</Text>
            <Text>After every level difficulty will rise.</Text>
            <Text>Beating level gives you XX more moves.</Text>
            <Text>The game ends when you run out of moves.</Text>
            <Text>Your current highscore: </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.playClicked(6)}>
                    <View style={styles.button}>
                        <Text>Play</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.stopPlaying}>
                    <View style={styles.button}>
                        <Text>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>);
    }

    createLevelMenu() {

    }

    createDifficultyMenu() {
        return (<View>
            <View style={styles.titleContainer}>
                <Image source={require('./assets/title.png')} style={{marginBottom: 30}} />
                <Text style={styles.titleText}>Choose difficulty</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            </View>
            </View>);
    }

    createMainMenu() {
        return (<View>
            <Image source={require('./assets/title.png')} style={{marginBottom: 30}} />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={this.playDifficultyClicked}>
                    <View style={styles.button}>
                        <Text>Play</Text>
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
            </View>
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
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        paddingBottom: 10,
      },
      titleText: {
        fontSize:20,
        color: 'rgb(255, 227, 135)',
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
        backgroundColor: 'rgb(255, 227, 135)',
        padding: 5,
        borderRadius: 5,
        margin: 2,
        width: 150,
        color: 'black'
      },
      customInput: {
        borderColor: 'black',
        backgroundColor: 'rgb(255, 227, 135)',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 3,
      }
  });
  
