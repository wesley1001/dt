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
import Nickname from '../users/nickname'

import '../storage'

class User extends Component {
  constructor(props){
    super(props)

    this.state = {
      token: null,
      user: {},
      user_avatar: "",
      user_name: "",
    }
  }

  componentDidMount() {
    global.storage.load({
      key: 'user',
      autoSync: true,
      syncInBackground: true
    }).then( ret => {
      //如果找到数据，则在then方法中返回

      this.setState({
        user_name: ret.user_name,
        user_avatar: ret.user_avatar,
        token: ret.token,
      })
    }).catch( err => {
      if(err == undefined){
        // 未存内容，未登录
        console.log(err);
      }
      //如果没有找到数据且没有同步方法，
      //或者有其他异常，则在catch中返回
    })
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

  _handleUsername() {
    this.props.navigator.push({
      component: Nickname,
      title: '昵称'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatar_bar}>
          <View>
            <Text>头像</Text>
          </View>
          <View style={styles.avatar_image}>
            <Image 
              source={{uri: this.state.user_avatar || 'http://images.dtcj.com/%40%2Ftest%2F456789'}} 
              style={styles.avatar}
            />
            <Text>></Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={this._handleUsername.bind(this)}
          style={styles.username}
          >
          <View>
            <Text>昵称</Text>
          </View>
          <View style={styles.username_name}>
            <Text>{this.state.user_name}</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <View style={styles.resetpassword}>
          <View>
            <Text>修改密码</Text>
          </View>
          <View>
            <Text>></Text>
          </View>
        </View>
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <Text style={styles.logout}>
            退出账号
          </Text> 
        </TouchableOpacity>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingLeft: 20,
    paddingRight: 15,
  },
  avatar_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar_image: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  username_name: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  resetpassword: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  logout: {
    marginTop: 30,
    textAlign: 'center',
  },
  
});

export default User;