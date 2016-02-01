'use strict';

// var SERVER = 'http://121.43.181.142:8079/api';
// var SERVER = 'http://127.0.0.1:3000/api';
// var SERVER = 'http://172.16.0.39:3000/api';
// var SERVER = 'http://192.168.31.244:3000/api';
var SERVER = 'http://dtcj.com/api';

var React = require('react-native');
var {
  Alert,
} = React;

var DataServices = {
  'getBanners': getBanners,
  'getBlocks': getBlocks,
  'getInformationList': getInformationList,
  'getRealtedInformations': getRealtedInformations,
  'getInformation': getInformation,
  'getHistoryHotestInformation': getHistoryHotestInformation,
  'getInformationByDate': getInformationByDate,
  'Register': Register,
  'Forgot': Forgot,
  'UserLogin': UserLogin,
  'GetCode': GetCode,
  'ThirdLogin': ThirdLogin,
  'Wechat': Wechat,
  'QqSimpleUserinfo': QqSimpleUserinfo,
  'WechatSimpleUserinfo': WechatSimpleUserinfo,
}

// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

function Wechat(code){
  var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx631251a8924fcd56&secret=304dfdc281dac38b82384afbf693a4a9&code=${code}&grant_type=authorization_code`;
  return fetch(url)
  .then((response) => {
    return response.json().then((responseData) => {
      return responseData;
    });
  })
}

function QqSimpleUserinfo(access_token, oauth_consumer_key, openid){
  var url = `https://graph.qq.com/user/get_simple_userinfo?access_token=${access_token}&oauth_consumer_key=${oauth_consumer_key}&openid=${openid}&format=json`;
  return fetch(url)
  .then((response) => {
    return response.json().then((responseData) => {
      return responseData;
    });
  })
}

function WechatSimpleUserinfo(access_token, openid){
  var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`;
  // var url = `https://api.weixin.qq.com/sns/auth?access_token=${access_token}&openid=${openid}`;
  return fetch(url)
  .then((response) => {
    return response.json().then((responseData) => {
      return responseData;
    });
  })
}

// https://api.weixin.qq.com/sns/auth?access_token=ACCESS_TOKEN&openid=OPENID

function ThirdLogin(uid, name, avatar, register_type) {
  var url = `${SERVER}/user_session/third`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
      "Content-Type": "application/json",
    }, 
    method: 'POST',
    body: JSON.stringify({
      register_type: register_type,
      user: {
        uid: uid,
        name: name,
        avatar: avatar
      },
    })
  })
  .then((response) => {
    return response_date(response)
  })
}

function getRealtedInformations(information_id){
  var url = `${SERVER}/information/${information_id}/recommendations?per=6`;
  return fetch(url, {headers: {
    "Accept-Version": "v2",
  }})
  .then((response) => {
    return response_date(response)
  })
}

function getBanners(){
  var url = `${SERVER}/banners`;

  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
    }
  })
  .then((response) => {
    return response_date(response)
  })
}

function getBlocks(){
  var url = `${SERVER}/blocks`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
    }
  })
  .then((response) => {
    return response_date(response)
  })
}

function GetCode(telephone, event){
  var url = `${SERVER}/sms`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
      "Content-Type": "application/json",
    }, 
    method: 'POST',
    body: JSON.stringify({
      telephone: telephone,
      event: event,
    })
  })
  .then((response) => {
    return response_date(response)
  })
}

function response_date(response){
  if(response.status > 400 && response.status < 500){
    Alert.alert(
      JSON.parse(response._bodyInit).message,
    )
  }else if(response.status >= 500){
    // Alert.alert(
    //   JSON.parse(response._bodyInit).message,
    // )
    throw response
  }else{
    return response.json().then((responseData) => {
      return responseData.data;
    });
  } 
}

function UserLogin(telephone, password){
  var url = `${SERVER}/user_session`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
      "Content-Type": "application/json",
    }, 
    method: 'POST',
    body: JSON.stringify({
      user: {
        account: telephone,
        password: password,
      },
    })
  })
  .then((response) => {
    return response_date(response)
  })
}

function Register(telephone, password, code){
  var url = `${SERVER}/user`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
      "Content-Type": "application/json",
    }, 
    method: 'POST',
    body: JSON.stringify({
      user: {
        telephone: telephone,
        password: password,
        code: code,
      },
    })
  })
  .then((response) => {
    return response_date(response)
  })
}

function Forgot(telephone, password, code){
  var url = `${SERVER}/user/reset_password`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
      "Content-Type": "application/json",
    }, 
    method: 'POST',
    body: JSON.stringify({
      user: {
        telephone: telephone,
        password: password,
        code: code,
      },
    })
  })
  .then((response) => {
    return response_date(response)
  })
}

function getHistoryHotestInformation(channel_id){
  var max = 5;
  var channel_id = 'app';

  var upto = new Date();
  var from_time = upto - 7 * 24 * 3600 * 1000;
  // var upto = new Date();
  upto = upto.getTime() / 1000;
  from_time = from_time / 1000;

  var url = `${SERVER}/information/history?channel_id=${channel_id}&max=${max}&from=${from_time}&upto=${upto}`;

  return fetch(url, {headers: {
    "Accept-Version": "v2",
    "Http-Authorization": "clvTFGghfLFeWVnJE4FLjz42t_9ssitH8VaXjnFitUXBw_OjAGhH_VkU4sYcB_cKjxHePHEAucpYfGjy7esdpLq_SKKKkqLm8mS8wr4BZJ9kG5gCZXYkI1NyFTIR2pau",
  }})
  .then((response) => {
    return response_date(response)
  })
}

function getInformationByDate(date){
  var channel_id = 'app';

  var url = `${SERVER}/information/daily?date=${date}&channel_id=${channel_id}`;

  return fetch(url, {headers: {
    "Accept-Version": "v2",
    "Http-Authorization": "clvTFGghfLFeWVnJE4FLjz42t_9ssitH8VaXjnFitUXBw_OjAGhH_VkU4sYcB_cKjxHePHEAucpYfGjy7esdpLq_SKKKkqLm8mS8wr4BZJ9kG5gCZXYkI1NyFTIR2pau",
  }})
  .then((response) => {
    return response_date(response)
  })
}

function getInformationList(channel_id){
  var url = `${SERVER}/information?channel_id=${channel_id}`;
  return fetch(url, {headers: {
    "Accept-Version": "v2",
    "Http-Authorization": "clvTFGghfLFeWVnJE4FLjz42t_9ssitH8VaXjnFitUXBw_OjAGhH_VkU4sYcB_cKjxHePHEAucpYfGjy7esdpLq_SKKKkqLm8mS8wr4BZJ9kG5gCZXYkI1NyFTIR2pau",
  }})
  .then((response) => {
    return response_date(response)
  })
}

function getInformation(id, token){
  var url = `${SERVER}/information/${id}`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
      // "Http-Authorization": token,
      "UUID":"asdfghjkl;"
    }
  })
  .then((response) => {
    return response_date(response)
  })
}

module.exports = DataServices;