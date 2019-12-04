import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.generateCard = this.generateCard.bind(this);
        this.flipCard = this.flipCard.bind(this);

        this.state = {active: false, invisible: false, enabled: true};
    }

    componentWillReceiveProps(newprops) {
        console.log(newprops)
        this.setState({invisible: newprops.invisible, enabled: newprops.enabled});
    }

    generateCard(active) {
        if (this.state.invisible) {
            return(<View style={[styles.container, styles.invisible]}></View>);
        } else if (active) {
            return(<View style={[styles.container, styles.active]}>
               <Text>{this.props.symbol}</Text>
            </View>);
        } else {
            return(<View style={[styles.container, styles.hidden]}></View>);
        }
    }

    flipCard(event) {
        if (this.state.enabled) {
            this.setState({active: true});
            this.props.returnvalues(this.props.id, this.props.symbol);
        }
    }

    render() {
        return (<TouchableOpacity onPress={this.flipCard}>{this.generateCard(this.state.active)}</TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    margin: 3,
    borderWidth: 1,
    width: 50,
    height: 65,
  },
  active: {
    backgroundColor: '#fff',
  },
  hidden: {
    backgroundColor: 'grey',
  },
  invisible: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  }
});