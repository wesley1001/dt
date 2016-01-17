/* eslint no-console: 0 */
'use strict';
var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

  
var GeolocationExample = React.createClass({
  watchID: (null: ?number),
  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => console.error(error)
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });
  },
  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  render: function() {
    console.log(this.state.initialPosition)
    console.log(this.state.lastPosition)
    return (
      <View>
        <Text style={styles.vvv}>
          <Text style={styles.title}>Initial position: </Text>
          {JSON.stringify(this.state.initialPosition)}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {JSON.stringify(this.state.lastPosition)}
        </Text>
      </View>
    );
  }
});
var styles = StyleSheet.create({
  vvv: {
    marginTop:100,
  },
  title: {
    fontWeight: '500',
  },
});
module.exports = GeolocationExample