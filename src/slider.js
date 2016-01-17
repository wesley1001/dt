'use strict';
var React = require('react-native');
var {
  SliderIOS,
  Text,
  StyleSheet,
  View,
} = React;
var SliderExample = React.createClass({
  getInitialState() {
    return {
      value: 0,
    };
  },
  render() {
    return (
      <View>
        <Text style={styles.text} >
          {this.state.value}
        </Text>
        <SliderIOS
          style={styles.slider}
          onValueChange={(value) => this.setState({value: value})} />
      </View>
    );
  }
});
var styles = StyleSheet.create({
  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    marginTop:100,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});
module.exports= SliderExample