'use strict';

var React = require('react-native');

var DataServices = require('../network');

var Information = require('./information');
var RNRL = require("aaaaa");
var {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ListView,
  Image,
} = React;

var InformationList = React.createClass({
  getInitialState() {
    return {
      information_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    }
  },
  componentDidMount: function() {
    DataServices.getInformationList(this.props.channel_id)
      .then( responseData => {
        this.setState({
          information_lists: this.state.information_lists.cloneWithRows(responseData)
        });
      })
      .done();
  },
  _renderRow: function(title: string, onPress: Function) {
    return (
      <View>
        <TouchableHighlight onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  },
  renderInformation: function(information){
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: information.thumbnail || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} 
          style={styles.thumbnail} 
        />
        <View style={styles.rightContainer}>
          {this._renderRow(information.title, () => {
            this.props.navigator.push({
              title: information.title,
              component: Information,
              passProps: {information_id: information.id}
            });
          })}
        </View>
      </View>
    )
  },
  reloadArticles: function(){
    DataServices.getInformationList(this.props.channel_id)
      .then( responseData => {
        this.setState({
          information_lists: this.state.information_lists.cloneWithRows(responseData)
        });
      })
      .done();
  },
  render: function() {
      return (
        <View>
        <View style={styles.tooheight}>
          <Text>太高</Text>
        </View>
        <RNRL 
          // renderHeader
          dataSource={this.state.information_lists} 
          renderRow={this.renderInformation}
          loadData={this.reloadArticles}
          pullingPrompt="加载中"
          holdingPrompt="加载中"
        />
        </View>
      );
  },
});

var styles = StyleSheet.create({
  tooheight:{
    marginTop:100,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    width: 53,
    height: 81,
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

module.exports = InformationList;