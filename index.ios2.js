/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var MainView = require('./src/main_view.js');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View,
  Text,
} = React;

var dt = React.createClass({
  getInitialState() {
    return {
      loaded: false
    }
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container2}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <NavigatorIOS
        style={styles.container}
        shadowHidden={false}
        itemWrapperStyle={styles.navWrap}
        initialRoute={{
          component: MainView,
          title: '首页',
          passProps: { 
            myProp: 'foo',
          },
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navWrap:{
    flex:1,
    marginTop:70,
  }
});

AppRegistry.registerComponent('dt', () => dt);
