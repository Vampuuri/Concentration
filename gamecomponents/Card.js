import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default class Card extends React.Component {
    constructor(props) {
        super(props);

        this.generateCard = this.generateCard.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.generateSymbolImage = this.generateSymbolImage.bind(this);

        this.state = {active: false, invisible: false, enabled: true};
    }

    generateSymbolImage() {
        if (this.props.symbol === 0) {
            return (<Image source={require('../assets/cardimages/0.png')} />)
        } else if (this.props.symbol === 1) {
            return (<Image source={require('../assets/cardimages/1.png')} />)
        } else if (this.props.symbol === 2) {
            return (<Image source={require('../assets/cardimages/2.png')} />)
        } else if (this.props.symbol === 3) {
            return (<Image source={require('../assets/cardimages/3.png')} />)
        } else if (this.props.symbol === 4) {
            return (<Image source={require('../assets/cardimages/4.png')} />)
        } else if (this.props.symbol === 5) {
            return (<Image source={require('../assets/cardimages/5.png')} />)
        } else if (this.props.symbol === 6) {
            return (<Image source={require('../assets/cardimages/6.png')} />)
        } else if (this.props.symbol === 7) {
            return (<Image source={require('../assets/cardimages/7.png')} />)
        } else if (this.props.symbol === 8) {
            return (<Image source={require('../assets/cardimages/8.png')} />)
        } else if (this.props.symbol === 9) {
            return (<Image source={require('../assets/cardimages/9.png')} />)
        } else if (this.props.symbol === 10) {
            return (<Image source={require('../assets/cardimages/10.png')} />)
        } else if (this.props.symbol === 11) {
            return (<Image source={require('../assets/cardimages/11.png')} />)
        } else if (this.props.symbol === 12) {
            return (<Image source={require('../assets/cardimages/12.png')} />)
        } else if (this.props.symbol === 13) {
            return (<Image source={require('../assets/cardimages/13.png')} />)
        } else if (this.props.symbol === 14) {
            return (<Image source={require('../assets/cardimages/14.png')} />)
        } else if (this.props.symbol === 15) {
            return (<Image source={require('../assets/cardimages/15.png')} />)
        } else if (this.props.symbol === 16) {
            return (<Image source={require('../assets/cardimages/16.png')} />)
        } else if (this.props.symbol === 17) {
            return (<Image source={require('../assets/cardimages/17.png')} />)
        } else if (this.props.symbol === 18) {
            return (<Image source={require('../assets/cardimages/18.png')} />)
        } else if (this.props.symbol === 19) {
            return (<Image source={require('../assets/cardimages/19.png')} />)
        } else if (this.props.symbol === 20) {
            return (<Image source={require('../assets/cardimages/20.png')} />)
        } else if (this.props.symbol === 21) {
            return (<Image source={require('../assets/cardimages/21.png')} />)
        } else if (this.props.symbol === 22) {
            return (<Image source={require('../assets/cardimages/22.png')} />)
        } else {
            return (<Image source={require('../assets/cardimages/23.png')} />)
        }
    }

    componentWillReceiveProps(newprops) {
        if (newprops.refresh) {
            this.setState({invisible: newprops.invisible, enabled: newprops.enabled, active: false});
        } else {
            this.setState({invisible: newprops.invisible, enabled: newprops.enabled});
        }
    }

    generateCard(active) {
        if (this.state.invisible) {
            return(<View style={[styles.container, styles.invisible]}></View>);
        } else if (active) {
            return(<View style={[styles.container, styles.active]}>
               {this.generateSymbolImage()}
            </View>);
        } else {
            return(<View style={[styles.container, styles.hidden]}>
                <ImageBackground source={require('../assets/backofcard.png')} style={{width: '100%', height: '100%', borderRadius: 100}} ></ImageBackground>
            </View>);
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
    overflow: 'hidden',
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