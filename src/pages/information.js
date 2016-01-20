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
  ScrollView,
  WebView,
} = React;

var BGWASH = 'rgba(255,255,255,0.8)';
var csss = '<style type="text/css">* {max-width: 100%}</style>'

var Information = React.createClass({
   getInitialState() {
    return {
      information: {},
      token: "",
      loading: true,
    }
  },
  componentDidMount: function() {
    DataServices.getInformation(this.props.information_id, 'token')
    .then( responseData => {
      this.setState({
        information: responseData,
        loading: false,
      });
    })
    .done();
  },
  render: function() {
    console.log(this.state.information);
    if(this.state.loading){
      return (
        <View style={styles.loading}>
          <Text style={styles.title}>加载中2</Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.recipe}>
          <Text style={styles.title}>{this.state.information.title}</Text>
          <Text style={styles.year}>{moment(this.state.information.publish_at).format("YYYY-MM-DD HH:mm:ss")}</Text>
        </View>
        <WebView 
          automaticallyAdjustContentInsets={true} 
          html={csss+this.state.information.content} 
          style={styles.content} 
        />
      </ScrollView>
      
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:70,
  },
  recipe: {
    height: 100,
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
    height:1000,
    backgroundColor: '#eeeeee',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Information;