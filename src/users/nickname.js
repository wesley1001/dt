'use strict';

import React, {
  Component,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import '../storage'
import DataServices from '../network'

class Nickname extends Component {
  constructor(props){
    super(props)

    this.state = {
      token: null,
      user_name: "",
    }
  }

  componentDidMount() {
    global.storage.load({
      key: 'user',
      autoSync: true,
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
    DataServices.UpdateUser(this.state.user_name, this.state.token)
      .then( responseData => {

        global.storage.save({
          key: 'user',  //注意:请不要在key中使用_下划线符号!
          rawData: { 
            user_name: responseData.name,
            user_avatar: responseData.avatar,
            token: this.state.token,
          },
          //如果不指定过期时间，则会使用defaultExpires参数
          //如果设为null，则永不过期
          expires: 1000 * 3600
        });

      })
      .done();

    this.props.navigator.popToTop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="你猜你叫什么名字"
          style={styles.input}
          onChangeText={(user_name) => this.setState({user_name})}
          value={this.state.user_name}
        />
        <View style={styles.separator}></View>
        <TouchableOpacity 
          onPress={this._handlePress.bind(this)}
          style={styles.button}
          >
          <Text style={styles.save}>
            保存
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
    marginTop:70,
  },
  input: {
    height: 45, 
    marginLeft: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  button: {
    marginTop: 20,
    height: 30,
  },
  save: {
    textAlign: 'center',
  }
});

export default Nickname;