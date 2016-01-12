'use strict';

var React = require('react-native');
var moment = require('moment');
var DataServices = require('./network');

var {
  View,
  Text,
  StyleSheet,
  Image,
  WebView,
  ScrollView,
} = React;

var information = React.createClass({
  getInitialState() {
    return {
      information: {},
    }
  },
  componentDidMount: function() {
    DataServices.getInformation(this.props.information_id)
      .then( responseData => {
        this.setState({
          information: responseData,
        });
      })
      .done();
  },
  createMarkup: function(body) { 
    return {__html: body}; 
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.information.thumbnail || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{this.state.information.title}</Text>
          <Text style={styles.year}>{moment(this.state.information.publish_at).format("YYYY-MM-DD HH:mm:ss")}</Text>
          <WebView html={this.state.information.content} />
        </View>
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
    fontSize: 14,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = information;