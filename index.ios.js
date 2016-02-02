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

import MainPage from './src/pages/main'
import Person from './src/users/person'
import Option from './src/users/option'

class dt extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        shadowHidden={false}
        initialRoute={{
          component: MainPage,
          title: '',
          rightButtonTitle: '个人中心',
          onRightButtonPress: () => {
            this.refs.nav.push({
              title: '个人中心',
              component: Person,
              rightButtonTitle: '设置',
              onRightButtonPress: () => {
                this.refs.nav.push({
                  title: '设置',
                  component: Option,
                })
              },
            })
          }
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
  search_bar: {
    height: 100,
  }
});

AppRegistry.registerComponent('dt', () => dt);
