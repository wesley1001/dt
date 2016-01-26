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

import Moment from 'moment'
import DataServices from '../network';
import UserLogin from '../users/login'
import Option from '../users/option'
import HistoryList from '../pages/history_list'

import '../storage'

import * as QQAPI from 'react-native-qq22';

class Person extends Component {
  constructor(props){
    super(props)

    // console.log(global)
    // console.log('global')
    // global.storage.save({
    //   key: 'loginState',  //注意:请不要在key中使用_下划线符号!
    //   rawData: { 
    //     from: 'some other site',
    //     userid: 'some userid',
    //     token: 'some token'
    //   },

    //   //如果不指定过期时间，则会使用defaultExpires参数
    //   //如果设为null，则永不过期
    //   expires: 1000 * 3600
    // });

    // global.storage.load({
    //   key: 'loginState',

    //   //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
    //   autoSync: true,

    //   //syncInBackground(默认为true)意味着如果数据过期，
    //   //在调用同步方法的同时先返回已经过期的数据。
    //   //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
    //   syncInBackground: true
    // }).then( ret => {
    //   //如果找到数据，则在then方法中返回
    //   console.log(ret.userid);
    // }).catch( err => {
    //   //如果没有找到数据且没有同步方法，
    //   //或者有其他异常，则在catch中返回
    //   console.warn(err);
    // })

    this.state = {
      token: null,
      user: {},
      user_avatar: "",
      user_name: "",
    }
  }

  _loginedView() {
    
    console.log(this.state.user_avatar);
    // console.log(user_avatar);
    return (
      <View style={styles.user}>
        <Image 
          source={{uri: this.state.user_avatar || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} 
          style={styles.avatar}
        />
        <Text>{this.state.user_name}222</Text>
      </View>
    )
  }

  _unloginedView() {
    return (
      <View style={styles.detail}>

        <View style={styles.detail_login}>
          <TouchableOpacity 
            onPress={() => {
              this.props.navigator.push({
                component: UserLogin,
                title: '登录',
              });
            }}
            >
            <View style={styles.person}>
              <Text>手机登录</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              QQAPI.login('get_simple_userinfo')
                .then((response) => {
                  DataServices.ThirdLogin(response.openid, 'qq')
                    .then( responseData => {
                      try{
                        global.storage.save({
                          key: 'user',  //注意:请不要在key中使用_下划线符号!
                          rawData: { 
                            user_name: responseData.name,
                            user_avatar: responseData.avatar,
                            token: responseData.auth_token,
                          },

                          //如果不指定过期时间，则会使用defaultExpires参数
                          //如果设为null，则永不过期
                          expires: 1000 * 3600
                        });
                      }catch(e){
                        console.log(e)
                      }
                      
                      console.log('1111111111')
                      this.setState({
                        user_name: responseData.name,
                        user_avatar: responseData.avatar,
                        token: responseData.auth_token,
                      })

                      console.log('111112222222')
                    })
                })
            }}>
            <View style={styles.person}>
              <Text>QQ登录</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
            }}>
            <View style={styles.person}>
              <Text>支付宝登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    console.log("token= "+ this.state.token);
    return (
      <View style={styles.container}>
        {this.state.token ? this._loginedView() : this._unloginedView()}
      
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              this.props.navigator.push({
                component: HistoryList,
                title: '往期内容',
              });
            }}
            >
            <View style={styles.list}>
              <Text>往期内容</Text>
              <Text>></Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              this.props.navigator.push({
                component: HistoryList,
                title: '往期内容',
              });
            }}
            >
            <View style={styles.list}>
              <Text>往期内容</Text>
              <Text>></Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              this.props.navigator.push({
                component: HistoryList,
                title: '往期内容',
              });
            }}
            >
            <View style={styles.list}>
              <Text>往期内容</Text>
              <Text>></Text>
            </View>
          </TouchableOpacity>
        </View>
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
  user: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 80,
    width: 80,
  },  
  detail: {
    padding: 10,
  },
  detail_login: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  content: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    marginTop: 20,
  },
  list: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
  
});

export default Person;