'use strict';

var React = require('react-native');
var DataServices = require('../network');
var Information = require('./information');

var {
  RefreshControl,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  ListView,
  Image,
} = React;

// 缓存结果
var resultsCache = {
  data: [],
  next_page:1,
  per_page:10,
  total:0,
};

var Main = React.createClass({
  getInitialState() {
    return {
      isLoading: false,
      isLoadingTail: false,
      information_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      filter: '',
      queryNumber: 0,
      isRefreshing: false,
      loaded: 0,
    }
  },
  componentDidMount: function() {
    DataServices.getBlocks()
      .then( responseData => {
        resultsCache.data = responseData;
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
    console.log(information)
    return (
      <View style={styles.list}>
        <Image 
          source={{uri: information.app_thumbnail || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} 
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
  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.information_lists} 
          renderRow={this.renderInformation}
          style={styles.lists}
        />
      </View>
    )
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    flexDirection: 'column',
  },
  lists: {
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  list: {

  }
});

module.exports = Main;