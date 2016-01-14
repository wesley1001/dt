'use strict';

var React = require('react-native');
var moment = require('moment');
var DataServices = require('../network');

var {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  Image,
  WebView,
} = React;

var BGWASH = 'rgba(255,255,255,0.8)';
var csss = '<style type="text/css">* {max-width: 100%}</style>'

var Information = React.createClass({
   getInitialState() {
    return {
      information: {},
      token: "",
    }
  },
  componentDidMount: async function() {
    try {
      var token = await AsyncStorage.getItem("token");
      var informations = await DataServices.getInformation(this.props.information_id, token);
    } catch (error) {
      console.log(error.message)
    }
    this.setState({
      information: informations,
      token: token,
    })
  },
  render: function() {
    console.log(this.state.information);
    
    return (
      this.state.information.title
      ?
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.information.title}</Text>
        <Text style={styles.year}>{moment(this.state.information.publish_at).format("YYYY-MM-DD HH:mm:ss")}</Text>
        <WebView automaticallyAdjustContentInsets={true} html={csss+this.state.information.content} style={styles.content} />
      </View>
      :
      <View style={styles.loading}><Text style={styles.title}>.........</Text></View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:70,
  },
  loading: {
    marginTop: 80,
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

module.exports = Information;