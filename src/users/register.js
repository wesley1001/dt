'use strict';

var React = require('react-native');
var DataServices = require('../network');
var Button = require('react-native-button'); 

var {
  View,
  Text,
  StyleSheet,
  TextInput,
} = React;

var UserRegister = React.createClass({
  getInitialState() {
    return {
      telephone: "15201991025",
      password: "12345678",
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
    DataServices.GetCode(this.state.telephone)
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
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(telephone) => this.setState({telephone})}
          value={this.state.telephone}/>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(code) => this.setState({code})}
          value={this.state.code} />
        <Button style={styles.button} onPress={this._handleGetCode}>
          获取验证码
        </Button>
        <Button style={styles.button} onPress={this._handlePress}>
          注册
        </Button>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 70,
  },
  button: {
    fontSize: 20,
    color: 'green',
  }
});

module.exports = UserRegister;