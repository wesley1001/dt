'use strict';

// var SERVER = 'http://121.43.181.142:8079/api';
// var SERVER = 'http://127.0.0.1:3000/api';
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
  'getInformation': getInformation,
  'getHistoryHotestInformation': getHistoryHotestInformation,
  'getInformationByDate': getInformationByDate,
  'Register': Register,
  'Forgot': Forgot,
  'UserLogin': UserLogin,
  'GetCode': GetCode,
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
  console.log(response.status)
  if(response.status > 400 && response.status < 500){
    Alert.alert(
      JSON.parse(response._bodyInit).message,
    )
  }else if(response.status >= 500){
    throw "34567890-"
  }else{
    return response.json().then((responseData) => {
      return responseData.data;
    });
  } 
}

function UserLogin(telephone, password){
  var url = `${SERVER}/user_session`;
  console.log(telephone+":"+password);
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
    console.log(response.status);
    return response_date(response)
  })
}

function Register(telephone, password, code){
  var url = `${SERVER}/user`;
  console.log(telephone+password);
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
  console.log(telephone+password);
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
    console.log(response.status)
    return response_date(response)
  })
}

function getHistoryHotestInformation(channel_id){
  var max = 5;
  var channel_id = 'app';
  var url = `${SERVER}/information/history?channel_id=${channel_id}&max=${max}`;

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
  console.log(url);
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