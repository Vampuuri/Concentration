import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, AsyncStorage } from 'react-native';
import ScoreCounter from './ScoreCounter';
import { TextInput } from 'react-native-gesture-handler';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.playClicked = this.playClicked.bind(this);
        this.playEndless = this.playEndless.bind(this);
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
        this.fetchHighscores = this.fetchHighscores.bind(this);

        this.state = {show: <View></View>
            , customPairAmount: ''
            , customMoveLimit: ''
            , customTimeLimit: ''
            , highscoreVeryEasy: 0
            , highscoreEasy: 0
            , highscoreMedium: 0
            , highscoreHard: 0
            , highscoreVeryHard: 0
            , highscoreEndlessTimed: 0
            , highscoreEndlessMoves: 0};
    }

    componentDidMount() {
        this.setState({show: this.createMainMenu()})
        this.fetchHighscores();
    }

    fetchHighscores() {
        console.log('fetching highscores')

        AsyncStorage.clear()
 
        try {
            AsyncStorage.getItem('highscoreVeryEasy').then((item) => {
                if (item !== null) {
                    this.setState({highscoreVeryEasy: parseInt(item)});
                }
            });
            AsyncStorage.getItem('highscoreEasy').then((item) => {
                if (item !== null) {
                    this.setState({highscoreEasy: parseInt(item)});
                }
            });
            AsyncStorage.getItem('highscoreMedium').then((item) => {
                if (item !== null) {
                    this.setState({highscoreMedium: parseInt(item)});
                }
            });
            AsyncStorage.getItem('highscoreHard').then((item) => {
                if (item !== null) {
                    this.setState({highscoreHard: parseInt(item)});
                }
            });
            AsyncStorage.getItem('highscoreVeryHard').then((item) => {
                if (item !== null) {
                    this.setState({highscoreVeryHard: parseInt(item)});
                }
            });
            AsyncStorage.getItem('highscoreEndlessTimed').then((item) => {
                if (item !== null) {
                    this.setState({highscoreEndlessTimed: parseInt(item)});
                }
            });
            AsyncStorage.getItem('highscoreEndlessMoves').then((item) => {
                if (item !== null) {
                    this.setState({highscoreMedium: parseInt(item)});
                }
            });
          } catch (error) {
            console.log(error)
          }
    }

    playClicked(amountOfPairs, gamemode, oldHighscore) {
        this.setState({show: <ScoreCounter
            pairs={amountOfPairs}
            stopPlaying={this.stopPlaying}
            gamemode={gamemode}
            oldHighscore={oldHighscore} />});
    }

    playEndless(timetrial) {
        if (timetrial) {
            this.setState({show: <ScoreCounter
                pairs={4}
                stopPlaying={this.stopPlaying}
                endless={true}
                limitedTime={true}
                time={60}
                gamemode={'highscoreEndlessTimed'}
                oldHighscore={this.state.highscoreEndlessTimed} />});
        } else {
            this.setState({show: <ScoreCounter
                pairs={4}
                stopPlaying={this.stopPlaying}
                endless={true}
                limitedMoves={true}
                moves={30}
                gamemode={'highscoreEndlessMoves'}
                oldHighscore={this.state.highscoreEndlessMoves} />});
        }
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

            this.setState({show: <ScoreCounter
                pairs={pairs}
                stopPlaying={this.stopPlaying}
                limitedMoves={movelimitExists}
                moves={moves}
                limitedTime={timelimitExists}
                time={time}
                custom={true}/>});
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
            <Text>You will start with 60 seconds.</Text>
            <Text>After every level difficulty will rise.</Text>
            <Text>Winning level gives you 45 more seconds.</Text>
            <Text>The game ends when you run out of time.</Text>
            <Text>Your current highscore: {this.state.highscoreEndlessTimed}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.playEndless(true)}>
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
            <Text>You will start with 30 moves.</Text>
            <Text>After every level difficulty will rise.</Text>
            <Text>Winning level gives you 20 more moves.</Text>
            <Text>The game ends when you run out of moves.</Text>
            <Text>Your current highscore: {this.state.highscoreEndlessMoves}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.playEndless(false)}>
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
                <TouchableOpacity onPress={() => this.playClicked(4, 'highscoreVeryEasy', this.state.highscoreVeryEasy)}>
                    <View style={styles.button}>
                        <Text>Very Easy</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.highscoreText}>Highscore: {this.state.highscoreVeryEasy}</Text>
                <TouchableOpacity onPress={() => this.playClicked(6, 'highscoreEasy', this.state.highscoreEasy)}>
                    <View style={styles.button}>
                        <Text>Easy</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.highscoreText}>Highscore: {this.state.highscoreEasy}</Text>
                <TouchableOpacity onPress={() => this.playClicked(10, 'highscoreMedium', this.state.highscoreMedium)}>
                    <View style={styles.button}>
                        <Text>Medium</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.highscoreText}>Highscore: {this.state.highscoreMedium}</Text>
                <TouchableOpacity onPress={() => this.playClicked(15, 'highscoreHard', this.state.highscoreHard)}>
                    <View style={styles.button}>
                        <Text>Hard</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.highscoreText}>Highscore: {this.state.highscoreHard}</Text>
                <TouchableOpacity onPress={() => this.playClicked(18, 'highscoreVeryHard', this.state.highscoreVeryHard)}>
                    <View style={styles.button}>
                        <Text>Very hard</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.highscoreText}>Highscore: {this.state.highscoreVeryHard}</Text>
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
        this.fetchHighscores();
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
      },
      highscoreText: {
        paddingBottom: 7,
        fontSize: 10,
      }
  });
  
