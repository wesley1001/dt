'use strict';

var React = require('react-native');
var InformationList = require('./information/information_lists');
var HistoryList = require('./information/history_list');
var UserRegister = require('./users/register');
var UserLogin = require('./users/login');

var {
  PixelRatio,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

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
          {this._renderRow('用户注册', () => {
            this.props.navigator.push({
              title: '用户注册',
              component: UserRegister,
            });
          })}
        </View>

        <View style={styles.emptyPage}>
          {this._renderRow('用户登录', () => {
            this.props.navigator.push({
              title: '登录',
              component: UserLogin,
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('编辑精选', () => {
            this.props.navigator.push({
              title: '编辑精选',
              component: InformationList,
              passProps: {channel_id: 'app'}
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('千人千面', () => {
            this.props.navigator.push({
              title: '千人千面',
              component: InformationList,
              passProps: {channel_id: 'all'}
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('往期内容', () => {
            this.props.navigator.push({
              title: '往期内容',
              component: HistoryList,
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