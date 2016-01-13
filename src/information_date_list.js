'use strict';

var React = require('react-native');

var DataServices = require('./network');
var Information = require('./information');

var {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ListView,
  Image,
} = React;

var InformationListDate = React.createClass({
  getInitialState() {
    return {
      information_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    }
  },
  componentDidMount: function() {
    DataServices.getInformationByDate(this.props.date)
      .then( responseData => {
        this.setState({
          information_lists: this.state.information_lists.cloneWithRows(responseData)
        });
      })
      .done();
  },
  _renderRow: function(information, onPress: Function) {
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={styles.leftContainerContent}>
          <Text style={styles.category}>{information.category}</Text>
          <Text style={styles.title}>{information.title}</Text>
          <Text style={styles.publish_at}>{information.publish_at}</Text>
        </View>
      </TouchableHighlight>
    );
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
        <Image source={{uri: information.thumbnail || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} style={styles.rightContainer} />
      </View>
    )
  },
  render: function() {
    return (
      <ListView dataSource={this.state.information_lists} renderRow={this.renderInformation} />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin:7,
  },
  leftContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: -5,
  },
  leftContainerContent: {
    backgroundColor: '#eeeeee',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    height:80,
  },
  category: {
    fontSize: 10,
    color: 'blue',
  },
  title: {
    fontSize: 10,
  },
  publish_at: {
    fontSize: 6,
    color: 'blue',
  },
  rightContainer: {
    flex:1,
    height: 80,
  },
  
});

module.exports = InformationListDate;