'use strict';

var React = require('react-native');
var DataServices = require('../network');
var UserRegister = require('./register');
var UserForgot = require('./forgot');

var {
  AsyncStorage,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} = React;

var UserLogin = React.createClass({
  getInitialState() {
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
      title: '用户注册',
      component: UserRegister,
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
          <TouchableOpacity onPress={this._forgot}>
            <Text style={styles.forget}>
              忘记密码？
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._register}>
            <Text style={styles.have_not}>
              还没有账号？<Text style={styles.register}>请注册</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 80,
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
    backgroundColor: '#dddddd',
    color: 'gray',
    textAlign: 'center',
    paddingTop: 8,
  }
});

module.exports = UserLogin;