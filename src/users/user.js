'use strict';

import React, {
  Component,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';

import DataServices from '../network'
import Person from '../users/person'

import '../storage'

class User extends Component {
  constructor(props){
    super(props)
  }

  _loginedView() {
    return (
      <View style={styles.user}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigator.push({
              component: User,
              title: '个人资料'
            })
          }}
        >
          <Image 
            source={{uri: this.state.user_avatar || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} 
            style={styles.avatar}
          />
          <Text>{this.state.user_name}222</Text>

        </TouchableOpacity>
        
      </View>
    )
  }

  _handlePress() {
    global.storage.remove({
        key: 'user'
    });
    this.props.navigator.popToTop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <Text style={styles.button}>
            退出
          </Text> 
        </TouchableOpacity>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    marginTop:100,
  },
  button: {
    marginTop: 20,
  },
  
});

export default User;