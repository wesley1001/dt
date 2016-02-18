'use strict';

import React, {
  Component,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

import DataServices from '../network'
import UserRegister from './register'
import UserForgot from './forgot'
import HistoryList from '../information/history_list'
import Main from '../pages/main'

import '../storage'

class UserLogin extends Component {
  constructor(props){
    super(props)

    this.state = {
      telephone: "15201991025",
      password: "12345678",
      result: {},
    }
  }

  componentDidMount() {
    global.storage.load({
      key: 'user',

      //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
      autoSync: true,

      //syncInBackground(默认为true)意味着如果数据过期，
      //在调用同步方法的同时先返回已经过期的数据。
      //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: false
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

  _handlePress(event) {
    DataServices.UserLogin(this.state.telephone, this.state.password)
      .then( responseData => {
        this.setState({
          result: responseData,
        });

        global.storage.save({
          key: 'user',  //注意:请不要在key中使用_下划线符号!
          rawData: { 
            password: this.state.password,
            user_name: responseData.name,
            user_avatar: responseData.avatar,
            token: responseData.auth_token,
          },

          //如果不指定过期时间，则会使用defaultExpires参数
          //如果设为null，则永不过期
          expires: 1000 * 3600
        });

        this.props.navigator.push({
          title: '首页',
          component: HistoryList,
        });
      })

      
  }

  _forgot() {
    this.props.navigator.push({
      title: '重置密码',
      component: UserForgot,
    });
  }

  _register() {
    this.props.navigator.push({
      title: '手机注册',
      component: UserRegister,
      // backButtonTitle: '11',
      // shadowHidden: true,
      // tintColor: 'red',
      // barTintColor: 'yellow',
      // navigationBarHidden: true,
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput 
            style={styles.text_input} 
            returnKeyType={'google'} 
            placeholder={'手机号'} 
            clearButtonMode={'while-editing'} 
            keyboardType={'number-pad'} 
            onChangeText={(telephone) => this.setState({telephone})} 
            value={this.state.telephone}
          />
          <TextInput 
            style={styles.text_input} 
            placeholder={'密码'}
            clearButtonMode={'while-editing'}
            password={true}
            onChangeText={(password)=> this.setState({password})} 
            value={this.state.password}
          />
          <TouchableOpacity onPress={this._handlePress.bind(this)}>
            <Text style={styles.button}>
              登录
            </Text>
          </TouchableOpacity>
          <View style={styles.another}>
            <TouchableOpacity onPress={this._forgot} style={styles.forget}>
              <Text>
                忘记密码？
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._register} style={styles.register}>
              <Text style={styles.have_not}>
                还没有账号？<Text>请注册</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.third}>
            <View>
              <Text style={styles.third_title}>您还可以选择</Text>
            </View>
            <View style={styles.third_images}>
              <Image vim
                source={require('image!taobao')} 
                style={[styles.third_image, styles.third_image_taobao]} 
              />
              <Image 
                source={require('image!alipay')} 
                style={[styles.third_image, styles.third_image_alipay]} 
              />
            </View>
          </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 60,
  },
  container2: {
    // flex: 1,
    // flexDirection: 'column',
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
  forget: {
    height:25,
  },
  register: {
    height:25,
  },
  third: {
    flex:1,
    flexDirection: 'column',
  },
  third_title: {
    textAlign: 'center',
  },
  third_images: {
    flex:1,
    justifyContent: 'center',
    flexDirection:'row',
    marginTop:20,
  },
  third_image: {
    height: 50,
    borderRadius: 25,
    width: 50,
  },
  third_image_taobao: {
    marginRight:30,
  },
  third_image_alipay: {
    marginLeft:30,
  },
  another: {
    marginTop: 10,
    marginLeft:30,
    marginRight:30,
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  text_input: {
    paddingLeft:10,
    marginLeft:30,
    marginRight:30,
    height: 35, 
    marginTop:5,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 15,
  },
  button: {
    height: 35,
    marginLeft:30,
    marginRight:30,
    marginTop: 20,
    fontSize: 16,
    borderRadius: 15,
    // backgroundColor: '#dddddd',
    color: 'gray',
    textAlign: 'center',
    paddingTop: 8,
  }
});

module.exports = UserLogin;