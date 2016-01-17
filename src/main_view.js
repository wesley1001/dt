'use strict';

var React = require('react-native');
var InformationList = require('./information/information_lists');
var HistoryList = require('./information/history_list');
var UserRegister = require('./users/register');
var UserLogin = require('./users/login');
var ActivityIndicatorIOSMe = require('./ActivityIndicatorIOSMe');
var DatePickerExampleMe = require('./DatePickerExampleMe');
var V = require('./vibrations');
var StatusBarIOS = require("./statusbar");
var SliderExample = require("./slider");
var GeolocationExample = require("./geo")
var Scroll2 = require("./information/scroll")

var InformationListPullUp =require("./information/scroll_pullup_information")

var {
  PixelRatio,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} = React;

var EmptyPage = React.createClass({
  statics: {
    title: '<NavigatorIOS>',
    description: 'iOS navigation capabilities',
  },
  _renderRow: function(title: string, onPress: Function) {
    return (
      <View>
        <TouchableHighlight 
          onPress={onPress}
          underlayColor="red"
        >
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
      <View style={styles.top}>
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
          {this._renderRow('下拉', () => {
            this.props.navigator.push({
              title: '下拉',
              component: Scroll2,
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
        <View style={styles.emptyPage}>
          {this._renderRow('指示器', () => {
            this.props.navigator.push({
              title: '指示器',
              component: ActivityIndicatorIOSMe,
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('日期', () => {
            this.props.navigator.push({
              title: '日期',
              component: DatePickerExampleMe,
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('震动', () => {
            this.props.navigator.push({
              title: '震动',
              component: V,
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('状态栏', () => {
            this.props.navigator.push({
              title: '状态栏',
              component: StatusBarIOS,
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('定方位', () => {
            this.props.navigator.push({
              title: '定方位',
              component: GeolocationExample,
            });
          })}
        </View>
        <View style={styles.emptyPage}>
          {this._renderRow('滑动', () => {
            this.props.navigator.push({
              title: '滑动',
              component: SliderExample,
            });
          })}
        </View>

        <View style={styles.emptyPage}>
          {this._renderRow('上拉', () => {
            this.props.navigator.push({
              title: '上拉',
              component: InformationListPullUp,
              passProps: {channel_id: 'all'},
            });
          })}
        </View>

        
        <View style={styles.emptyPage}>
          <TouchableOpacity 
            onPress={()=> {
            this.props.navigator.push({
              title: '状态栏',
              component: StatusBarIOS,
            });}}
          >
            <View style={styles.row}>
              <Text style={styles.rowText}>
                '状态栏'
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  emptyPage: {
    flex: 1,
    paddingTop: 14,
  },
  emptyPageText: {
    margin: 3,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  top: {
    marginTop:100,
  }
});


module.exports = EmptyPage;