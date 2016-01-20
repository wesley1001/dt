'use strict';

var React = require('react-native');
var DataServices = require('../network');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
                  component: Person,
                });
              }}>
              <Text>设置</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detail}>
          <View>
            <Text>顾益峰</Text>
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
  }
  
});

module.exports = Person;