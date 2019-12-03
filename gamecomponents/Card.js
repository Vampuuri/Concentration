import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.generateCard = this.generateCard.bind(this);
        this.flipCard = this.flipCard.bind(this);

        this.state = {active: false};
    }

    generateCard(active) {
        if (active) {
            return(<View style={styles.container_active}>
               <Text>Card</Text>
            </View>);
        } else {
            return(<View style={styles.container_hidden}></View>);
        }
    }

    flipCard(event) {
        console.log("switch state");
        this.setState({active: !this.state.active});
    }

    render() {
        return (<TouchableOpacity onPress={this.flipCard}>{this.generateCard(this.state.active)}</TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
  container_active: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    width: 50,
    height: 50,
  },
  container_hidden: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    width: 50,
    height: 50,
    },
});