'use strict';

var React = require('react-native');

var DataServices = require('./network');

var {
  View,
  Text,
  StyleSheet,
  Image,
} = React;

var Book = React.createClass({
  getInitialState() {
    return {
      book: {},
    }
  },
  componentDidMount: function() {
    DataServices.getBook(this.props.book_id)
      .then( responseData => {
        this.setState({
          book: responseData,
        });
      })
      .done();
  },
  render: function() {
    console.log(this.state.book);
      return (
        <View style={styles.container}>
          <Image source={{uri: this.state.book.thumbnail}} style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{this.state.book.title}</Text>
            <Text style={styles.year}>{this.state.book.publish_at}</Text>
          </View>
        </View>
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

module.exports = Book;