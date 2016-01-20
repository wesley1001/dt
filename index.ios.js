/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var MainPage = require('./src/pages/main');


var {
  AppRegistry,
  Navigator,
  StyleSheet,
  View,
  Text,
} = React;

var dt = React.createClass({
  getInitialState() {
    return {
      loaded: true
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
      <Navigator
        initialRoute={{name: 'My First Scene', component: MainPage}}
        configureScene={() => {
          return Navigator.SceneConfigs.VerticalUpSwipeJump;
        }}
        renderScene={(route, navigator) =>{
          let Component = route.component;
          if(route.component) {
            return <Component {...route.params} navigator={navigator} />
          }
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
  container2:{
    flex:1,
    top:100,
  }
});

AppRegistry.registerComponent('dt', () => dt);
