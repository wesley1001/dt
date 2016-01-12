'use strict';

var React = require('react-native');
var DataServices = require('../network');
var Button = require('react-native-button'); 

var {
  AsyncStorage,
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
        <Button style={styles.button} onPress={this._handlePress}>
          登录
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

module.exports = UserLogin;