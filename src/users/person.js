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

class Person extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
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
              }}>
              <View style={styles.person}>
                <Text>淘宝登录</Text>
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