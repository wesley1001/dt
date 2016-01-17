'use strict';
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  VibrationIOS
} = React;


var V = React.createClass({
  render() {
    return (
      <TouchableHighlight
        style={styles.wrapper}
        onPress={() => VibrationIOS.vibrate()}>
        <View style={styles.button}>
          <Text>Vibrate</Text>
        </View>
      </TouchableHighlight>
    );
  },
})

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    marginTop:100,
    backgroundColor: '#eeeeee',
    padding: 10,
  },
});

module.exports = V