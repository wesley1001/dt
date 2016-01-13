'use strict';

var React = require('react-native');
var moment = require('moment');
var DataServices = require('./network');

var {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  Image,
  WebView,
  ScrollView,
} = React;

var BGWASH = 'rgba(255,255,255,0.8)';

var information = React.createClass({
   getInitialState() {
    return {
      information: {},
      token: "",
    }
  },
  componentDidMount: async function() {
    try {
      var token = await AsyncStorage.getItem("token");

      var information = await DataServices.getInformation(this.props.information_id);
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }

    this.setState({
      information: information,
      token: token,
    })
    
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.information.title}</Text>
        <Text style={styles.year}>{moment(this.state.information.publish_at).format("YYYY-MM-DD HH:mm:ss")}</Text>
        <WebView automaticallyAdjustContentInsets={false} html={this.state.information.content} style={styles.content} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:70,
  },
  rightContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    height: 300,
  },
  content: {
    backgroundColor: '#eeeeee',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = information;