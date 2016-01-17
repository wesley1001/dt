'use strict';
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  StatusBarIOS,
} = React;

var StatusBarIOS2 = React.createClass({
  render() {
    return (
      <View>
          <TouchableHighlight style={styles.wrapper}
           onPress={() => StatusBarIOS.setStyle(StatusBarIOS.Style)}>
            <View style={styles.button}>
              <Text>setStyle(StatusBarIOS.Style)</Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
});
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

module.exports = StatusBarIOS2