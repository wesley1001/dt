'use strict';

var React = require('react-native');
var DataServices = require('../network');

var {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} = React;

var UserRegister = React.createClass({
  getInitialState() {
    return {
      telephone: "",
      password: "",
      code: "",
      result: "",
    }
  },
  componentDidMount: function() {
  },
  _handlePress(event) {
    DataServices.Register(this.state.telephone, this.state.password, this.state.code)
      .then( responseData => {
        this.setState({
          result: responseData,
        });
      })
      .done();
    console.log(this.state.result);
  },
  _handleGetCode(event){
    DataServices.GetCode(this.state.telephone, 'forget_password')
      .then( responseData => {
        this.setState({
          code: responseData,
        });
      })
      .done();
    console.log(this.state.code);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          请输入您的手机号码以获取验证码
        </Text>
        <View style={styles.father}>
          <TextInput 
            style={styles.text_input} 
            returnKeyType={'google'} 
            placeholder={'+86'} 
            keyboardType={'number-pad'} 
            onChangeText={(telephone) => this.setState({telephone})} 
            value={this.state.telephone}
          />
          <TouchableOpacity onPress={this._handleGetCode}>
            <Text style={styles.send_code}>
              发送验证码
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput 
          style={styles.text_input} 
          placeholder={'请输入验证码'}
          clearButtonMode={'while-editing'}
          keyboardType={'number-pad'} 
          onChangeText={(code)=> this.setState({code})} 
          value={this.state.code}
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
            发送
          </Text>
        </TouchableOpacity>
        <Text style={styles.agree}>
          我已经阅读并同意用户协议及免责声明
        </Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 90,
  },
  father: {
    position: 'relative',
  },
  send_code: {
    fontSize: 10,
    position: 'absolute',
    right:45,
    bottom: 14,
  },
  agree: {
    fontSize: 12,
    textAlign: 'center',
    marginTop:20,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
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

module.exports = UserRegister;