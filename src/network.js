'use strict';

var SERVER = 'http://121.43.181.142:8079/api';
// var SERVER = 'http://127.0.0.1:3000/api';

var DataServices = {
  'getInformationList': getInformationList,
  'getInformation': getInformation,
  'getHistoryHotestInformation': getHistoryHotestInformation,
  'getInformationByDate': getInformationByDate,
  'Register': Register,
  'UserLogin': UserLogin,
  'GetCode': GetCode,
}

function GetCode(telephone){
  var url = `${SERVER}/sms`;
  return fetch(url, {
    headers: {
      "Accept-Version": "v2",
      "Content-Type": "application/json",
    }, 
    method: 'POST',
    body: JSON.stringify({
      telephone: telephone,
      event: 'register',
    })
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("用户获取验证码，加载完成");
      return responseData.data;
    })
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
    .then((response) => response.json())
    .then((responseData) => {
      console.log("用户登录，加载完成");
      return responseData.data;
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
    .then((response) => response.json())
    .then((responseData) => {
      console.log("用户注册，加载完成");
      console.log(responseData);
      return responseData.data;
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
    .then((response) => response.json())
    .then((responseData) => {
      console.log("历史最热，加载完成");
      return responseData.data;
    })
}

function getInformationByDate(date){
  var channel_id = 'app';
  var url = `${SERVER}/information/daily?date=${date}&channel_id=${channel_id}`;

  return fetch(url, {headers: {
    "Accept-Version": "v2",
    "Http-Authorization": "clvTFGghfLFeWVnJE4FLjz42t_9ssitH8VaXjnFitUXBw_OjAGhH_VkU4sYcB_cKjxHePHEAucpYfGjy7esdpLq_SKKKkqLm8mS8wr4BZJ9kG5gCZXYkI1NyFTIR2pau",
  }})
    .then((response) => response.json())
    .then((responseData) => {
      console.log("当天全部，加载完成");
      return responseData.data;
    })
}

function getInformationList(channel_id){
  var url = `${SERVER}/information?channel_id=${channel_id}`;
  return fetch(url, {headers: {
    "Accept-Version": "v2",
    "Http-Authorization": "clvTFGghfLFeWVnJE4FLjz42t_9ssitH8VaXjnFitUXBw_OjAGhH_VkU4sYcB_cKjxHePHEAucpYfGjy7esdpLq_SKKKkqLm8mS8wr4BZJ9kG5gCZXYkI1NyFTIR2pau",
  }})
    .then((response) => response.json())
    .then((responseData) => {
      console.log("加载完成");
      return responseData.data;
    })
}

function getInformation(id){
  var url = `${SERVER}/information/${id}`;
  console.log(url);
  return fetch(url, {headers: {"Accept-Version": "v2","Http-Authorization": "VJNCqlAI4Hr1EjFuSWInG6I5L6NYYcnibGTQmia_Uq6rG26AFm_U7XNPHtYcTz3j-bFA4wY4gte6G1l_fdYh3UCDOtTpRMPz6DMIgSclGxNgycdEsS6KkqwAqt9CXapp",}})
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Information加载完成");
      return responseData.data;
    })
}

module.exports = DataServices;