'use strict';

var React = require('react-native');
var DataServices = require('../network');
var UserLogin = require('./login');
var Option = require('./option');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  NavigatorIOS,
} = React;

var Person = React.createClass({
  getInitialState() {
    return {
    }
  },
  componentDidMount: function() {
  },
  _pressButton() {
    this.props.navigator.pop()
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View>
            <TouchableOpacity 
              onPress={this._pressButton}
              >
              <Text style={styles.back}>返回</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text>个人中心</Text>
          </View>
          <View style={styles.option}>
            <TouchableOpacity 
              onPress={() => {
                this.props.navigator.push({
                  component: Option,
                });
              }}>
              <Text>设置</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detail}>
          <View style={styles.detail_login}>
            <TouchableHighlight 
              onPress={() => {
                this.props.navigator.push({
                  component: UserLogin,
                });
              }}
              >
              <View style={styles.person}>
                <Text>手机登录</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={() => {
                // this.props.navigator.push({
                //   component: UserLogin,
                // });
              }}>
              <View style={styles.person}>
                <Text>淘宝登录</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={() => {
                // this.props.navigator.push({
                //   component: UserLogin,
                // });
              }}>
              <View style={styles.person}>
                <Text>支付宝登录</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
  },
  nav: {
    marginTop:20,
    height: 36,
    // backgroundColor: 'red',
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    borderWidth:1,
  },
  back: {
    // color: 'red'
  },
  detail: {
    padding: 10,
  },
  detail_login: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-around',
  }
  
});

module.exports = Person;