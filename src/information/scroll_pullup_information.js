'use strict';

var React = require('react-native');

var DataServices = require('../network');

var Information = require('./information');

var TimerMixin = require('react-timer-mixin');

var {
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
    />

    return (
      <View style={styles.container}>
        {content}
      </View>
    )

  },
});

var styles = StyleSheet.create({
  tooheight:{
    // marginTop:100,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  // },
  noMoviesText: {
    marginTop: 80,
    color: '#888888',
  },
  container: {
    // marginTop:60,
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
    marginTop: 10,
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