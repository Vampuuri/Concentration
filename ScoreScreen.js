import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';

export default class ScoreCounter extends React.Component {
    constructor(props) {
        super(props);

        this.saveNewHighscore = this.saveNewHighscore.bind(this);

        if (!this.props.custom && this.props.win && this.props.oldHighscore < this.props.score) {
            // Saves highscore, if game is not custom, levels was won and old highscore is lower
            // than received score.
            this.saveNewHighscore();
        }
    }

    /**
     * Saves highscore to async storage.
     */
    saveNewHighscore() {
        console.log('saving new highscore')
          try {
              AsyncStorage.setItem(this.props.gamemode, this.props.score.toString());
          } catch (error) {
              console.log('error saving data')
          }
    }

    /**
     * Renders the screen.
     * 
     * If the game is endless, generates a slightly different score screen.
     */
    render() { 
      if (this.props.endless) {
        return (
          <View style={styles.container}>
              <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{this.props.win ? "You won!" : "Too bad!"}</Text>
              </View>
                  <View style={styles.scoreContainer}>
                      <Text>Your score:</Text>
                      <Text>{this.props.score}</Text>
                  </View>
                  {this.props.win ?
                  <View></View>
                  :
                  <View style={styles.scoreContainer}>
                  {this.props.timer ?
                      <Text>You ran out of time!</Text>
                      :
                      <Text>You ran out of moves!</Text>}
                  </View>
                  }
              {this.props.win ?
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.props.stopPlaying}>
                    <View style={styles.button}><Text>Stop playing</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.reset}>
                    <View style={styles.button}><Text>Next level</Text></View>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.props.stopPlaying}>
                    <View style={styles.button}><Text>Stop playing</Text></View>
                </TouchableOpacity>
              </View>
              }
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
              <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{this.props.win ? "You won!" : "Too bad!"}</Text>
              </View>
              {this.props.win ?
                  <View style={styles.scoreContainer}>
                      <Text>Your score was:</Text>
                      <Text>{this.props.score}</Text>
                  </View>
                  :
                  <View style={styles.scoreContainer}>
                  {this.props.timer ?
                      <Text>You ran out of time</Text>
                      :
                      <Text>You ran out of moves</Text>}
                  </View>
              }
              <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={this.props.stopPlaying}>
                      <View style={styles.button}><Text>Stop playing</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.reset}>
                      <View style={styles.button}><Text>Try again</Text></View>
                  </TouchableOpacity>
              </View>
          </View>
      );
      }
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
      padding: 30,
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
    }
  });
  
