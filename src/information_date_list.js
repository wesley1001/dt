'use strict';

var React = require('react-native');

var DataServices = require('./network');
var Book = require('./book');

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
      book_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    }
  },
  componentDidMount: function() {
    DataServices.getInformationByDate(this.props.date)
      .then( responseData => {
        this.setState({
          book_lists: this.state.book_lists.cloneWithRows(responseData)
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
  renderBook: function(book){
    return (
      <View style={styles.container}>
        <Image source={{uri: book.thumbnail || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          {this._renderRow(book.title, () => {
            this.props.navigator.push({
              title: book.title,
              component: Book,
              passProps: {book_id: book.id},
            });
          })}
        </View>
      </View>
    )
  },
  render: function() {
      return (
        <ListView dataSource={this.state.book_lists} renderRow={this.renderBook} />
      );
  },
});

var styles = StyleSheet.create({
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
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = InformationListDate;