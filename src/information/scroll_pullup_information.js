'use strict';

var React = require('react-native');

var DataServices = require('../network');

var Information = require('./information');

var TimerMixin = require('react-timer-mixin');

var RNRL = require("react-native-refreshable-listview");

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

var InformationListPullUp = React.createClass({
  mixins: [TimerMixin],

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
    DataServices.getInformationList(this.props.channel_id)
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
  renderFooter: function() {
    return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
  },
  onEndReached: function(){
    this.setState({
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: true,
    });

    DataServices.getInformationList(this.props.channel_id)
      .then( responseData => {
        var history_informations = resultsCache.data
        for (var i in responseData) {
          history_informations.push(responseData[i]);
        }
        resultsCache.next_page += 1;

        console.log(history_informations.length)
        this.setState({
          isLoadingTail: false,
          information_lists: this.state.information_lists.cloneWithRows(history_informations)
        });
      })
      .done();
  },
  _onRefresh() {
    this.setState({isRefreshing: true});
    console.log("start......")
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
      .map((val, i) => ({
        text: 'Loaded row' + (+this.state.loaded + i),
        clicks: 0,
      }))
      .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  },
  render: function() {
    var content = this.state.information_lists.getRowCount() === 0 ?
    <View>
      <Text style={styles.noMoviesText}>No movies found</Text>
    </View>
    :
    <ListView
      dataSource={this.state.information_lists} 
      renderRow={this.renderInformation}
      renderFooter={this.renderFooter}
      onEndReached={this.onEndReached}
      onEndReachedThreshold={50}
      refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh}
          tintColor="#ff0000"
          title="Loading..."
          colors={['#ff0000', '#00ff00', '#0000ff']}
          progressBackgroundColor="#ffff00"
        />
      }
      // loadData={this.reloadArticles}
      // refreshDescription=""
    />

    return (
      <View style={styles.container}>
        <View>
          <TouchableHighlight 
            style={styles.nav}
            onPress={() => {
            console.log("456789545678")
            this.props.navigator.pop();
          }}>
            <Text>返回</Text>
          </TouchableHighlight>
        </View>
        {content}
      </View>
    )
  },
});

var styles = StyleSheet.create({
  noMoviesText: {
    color: '#888888',
  },
  nav:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'space-between',
  },
  container: {
    marginTop:100,
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
    // marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
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
  scrollSpinner: {
    marginVertical: 20,
  }
});

module.exports = InformationListPullUp;