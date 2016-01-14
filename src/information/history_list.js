'use strict';

var React = require('react-native');
var moment = require('moment');

var Information = require('./information');
var InformationListDate = require('./information_date_list');
var DataServices = require('../network');

var {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ListView,
  ScrollView,
  TouchableHighlight,
  Image,
} = React;

var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.button}>
        <Image style={styles.img} source={{uri:this.props.uri.thumbnail || 'http://fujian.86516.com/forum/201209/28/16042484m9y9izwbrwuixj.jpg'}} />
        <Text style={styles.title}>
          {this.props.uri.title}
        </Text>
      </View>
    );
  }
});

var createThumbRow = (uri, i) => {
  return (
    <Thumb key={i} uri={uri} />
  )
 
}

var HistoryList = React.createClass({
  getInitialState() {
    return {
      history_hotest_information: [],
      current_date: "",
    }
  },
  componentDidMount: function() {
    DataServices.getHistoryHotestInformation()
      .then( responseData => {
        console.log("load over")

        this.setState({
          history_hotest_information: responseData,
        });

      })
      .done();
  },
  _renderRow: function(title: string, onPress: Function) {
    return (
      <View style={styles.content}>
        <TouchableHighlight onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  },
  abcd() {
    console.log("234567")
  },
  render: function() {
    console.log("start.....");
    return (
      <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        onScroll={this.abcd}
        style={styles.scrollView} >
          {this.state.history_hotest_information.map(createThumbRow)}
      </ScrollView>
      <View style={styles.tttt}>
        <Text>{this.state.current_date}</Text>
      </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 500,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  tttt: {
    marginTop: 100,
  },
  button: {
    margin: 7,
    padding: 5,
    // alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  title:{
    position: "absolute",
    top:20,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 295,
    height: 350,
  }
});

module.exports = HistoryList;