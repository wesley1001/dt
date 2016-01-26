'use strict';

var React = require('react-native');
var DataServices = require('../network');
var UserRegister = require('./register');
var UserForgot = require('./forgot');

var HistoryList = require('../information/history_list');

var Main = require('../pages/main');

var {
  AsyncStorage,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} = React;

var UserLogin = React.createClass({
  getInitialState() {
    // console.log('1234567890')
    // QQAPI.login('get_simple_userinfo')
    // console.log('1234567890')
    // console.log(QQAPI.login('get_simple_userinfo'))

    return {
      telephone: "15201991025",
      password: "12345678",
      result: {},
    }
  },
  componentDidMount: function() {

  },
  async _handlePress(event) {
    try {
      var responseData = await DataServices.UserLogin(this.state.telephone, this.state.password)
      this.setState({
        result: responseData,
      });
      
      await AsyncStorage.setItem("token", responseData.auth_token);

      this.props.navigator.push({
        title: '首页',
        component: HistoryList,
      });
    }catch (error){
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  },
  _forgot() {
    console.log('forget');
    this.props.navigator.push({
      title: '重置密码',
      component: UserForgot,
    });
  },
  _register() {
    console.log('register');
    this.props.navigator.push({
      title: '手机注册',
      component: UserRegister,
      // backButtonTitle: '11',
      // shadowHidden: true,
      // tintColor: 'red',
      // barTintColor: 'yellow',
      // navigationBarHidden: true,
    });
  },
  render: function() {
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
          <TouchableOpacity onPress={this._handlePress}>
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
  },
});

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