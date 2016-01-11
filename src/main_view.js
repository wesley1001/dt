'use strict';

var React = require('react-native');
var BookList = require('./book_lists');

var {
  PixelRatio,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

// var MainView = React.createClass({
//   _handleBackButtonPress: function() {
//     this.props.navigator.pop();
//   },
//   _handleNextButtonPress: function() {
//     this.props.navigator.push(nextRoute);
//   },

//   render: function() {
//     return (
//       <View>
//         <Text>
//           {this.props.myProp}
//         </Text>
//       </View>
//     )
//   }
// });

var EmptyPage = React.createClass({
  statics: {
    title: '<NavigatorIOS>',
    description: 'iOS navigation capabilities',
  },
  _renderRow: function(title: string, onPress: Function) {
    return (
      <View>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {title}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  },
  render: function() {
    return (
      <View>
      <View style={styles.emptyPage}>
        {this._renderRow('Pop', () => {
          this.props.navigator.pop();
        })}
      </View>

      <View style={styles.emptyPage}>
        {this._renderRow('Pop to top', () => {
          this.props.navigator.popToTop();
        })}
      </View>
      <View style={styles.emptyPage}>
        {this._renderRow('Push View Example', () => {
          this.props.navigator.push({
            title: 'Very Long Custom View Example',
            component: BookList,
            key: 'book_list',
          });
        })}
      </View>
      </View>
    );
  },
});



var styles = StyleSheet.create({
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
});


module.exports = EmptyPage;