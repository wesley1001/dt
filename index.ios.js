'use strict';

import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  View,
  AlertIOS,
  Text,
} from 'react-native';

import MainPage from './src/pages/main';
import Person from './src/users/person'

class dt extends Component {
  constructor(props){
    super(props)
  }

  render() {
    // if (!this.state.loading) {
    //   return this.renderLoadingView();
    // }
    return (
      <NavigatorIOS
        style={styles.container}
        shadowHidden={false}
        initialRoute={{
          component: MainPage,
          title: '首页',
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

AppRegistry.registerComponent('dt', () => dt);
