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
        this.setState({
          history_hotest_information: responseData,
        });
      })
      .done();
  },
  renderInformation: function(information){
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {this._renderRow(information, () => {
            this.props.navigator.push({
              title: information.title,
              component: Information,
              passProps: {information_id: information.id},
            });
          })}
        </View>
      </View>
    )
  },
  render: function() {
    console.log("start.....");
    var _this = this;
    return (
      <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        onScroll={this.abcd}
        style={styles.scrollView} >
          {this.state.history_hotest_information.map(function(information,i){
            return (
              <TouchableHighlight onPress={_this.props.navigator.push({
              title: information.title,
              component: Information,
              passProps: {information_id: information.id},
            })}>
            <View style={styles.card}>
              <View style={styles.picture}>
                <Image style={styles.image} source={{uri:information.thumbnail}} />
                <View style={styles.keyword_to_display_title}>
                  <Text style={styles.keyword_to_display}>
                    {information.keyword_to_display}
                  </Text>
                  <Text style={styles.title}>
                    {information.title}
                  </Text>
                </View>
              </View>
              <View style={styles.content}>
                <View style={styles.summary}>
                  <Text>{information.summary.substr(0,50)}</Text>
                </View>
              </View>
            </View>
            </TouchableHighlight>
            )
          })}
      </ScrollView>
      <View style={styles.tttt}>
        <Text>{this.state.current_date}</Text>
      </View>
      </View>
    );
  },
});

var createThumbRow = (information, i) => {
  return (
      <View style={styles.card}>
        <View style={styles.picture}>
          <Image style={styles.image} source={{uri:information.thumbnail}} />
          <View style={styles.keyword_to_display_title}>
            <Text style={styles.keyword_to_display}>
              {information.keyword_to_display}
            </Text>
            <Text style={styles.title}>
              {information.title}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.summary}>
            <Text>{information.summary.substr(0,50)}</Text>
          </View>
        </View>
      </View>
  );
}

var BGWASH = 'rgba(194,127,22,0.8)';
var BGWASH2 = 'rgba(0,0,0,0.6)';

var styles = StyleSheet.create({
  card: {
    flex:1,
    flexDirection: 'column',
  },
  picture: {
    flex:1,
    flexDirection:'column',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
  },
  image: {
    width: 300,
    height: 300,
  },
  keyword_to_display_title:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'flex-end',
    position: "absolute",
    bottom: 0,
    backgroundColor:'rgba(0,0,0,0.1)',
    padding:4,
  },
  keyword_to_display: {
    color: 'white',
    backgroundColor:BGWASH,
    padding:4,
    fontSize:14,
  },
  title:{
    width:290,
    color:'white',
    padding:8,
    fontSize:18,
    lineHeight:22,
    backgroundColor:BGWASH2,
  },
  content: {
    flex:1,
    flexDirection:'column',
  },
  summary:{
    marginLeft:10,
    marginRight:10,
    width:300,
    height: 50,
    backgroundColor:'white',
    paddingLeft:8,
    paddingRight:8,
  },
  third:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  }
  
});

module.exports = HistoryList;