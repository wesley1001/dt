'use strict';

var React = require('react-native');

var DataServices = require('../network');

var Information = require('./information');

var TimerMixin = require('react-timer-mixin');

var {
  RefreshControl,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  ListView,
  TouchableWithoutFeedback,
  Image,
} = React;

// 缓存结果
var resultsCache = {
  data: [],
  next_page:1,
  per_page:10,
  total:0,
};

const Row = React.createClass({
  _onClick: function() {
    this.props.onClick(this.props.data);
  },
  render: function() {
    return (
     <TouchableWithoutFeedback onPress={this._onClick} >
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },
});

var InformationListPullDown = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row' + i, clicks: 0})),
    };
  },
  _onClick(row) {
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  },

  componentDidMount: function() {
    // DataServices.getInformationList(this.props.channel_id)
    //   .then( responseData => {
    //     resultsCache.data = responseData;
    //     this.setState({
    //       information_lists: this.state.information_lists.cloneWithRows(responseData)
    //     });
    //   })
    //   .done();
  },
  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick}/>;
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => {
              // this._onRefresh
              console.log("begin......")
              console.log("statr......")
              this.setState({isRefreshing: true});
              console.log("statr......")
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
            }}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        {rows}
      </ScrollView>
    );
  },
  _onRefresh() {
    console.log("statr......")
    this.setState({isRefreshing: true});
    console.log("statr......")
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
});

var styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
  },
});

module.exports = InformationListPullDown;