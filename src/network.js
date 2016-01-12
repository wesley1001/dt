'use strict';

var SERVER = 'http://121.43.181.142:8079/api';

var DataServices = {
  'getBookList': getBookList,
  'getBook': getBook,
  'getHistoryHotestInformation': getHistoryHotestInformation,
  'getInformationByDate': getInformationByDate,
}

function getHistoryHotestInformation(channel_id){
  var max = 5;
  var channel_id = 'app';
  var url = `${SERVER}/information/history?channel_id=${channel_id}&max=${max}`;

  console.log(url);
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

  console.log(url);
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

function getBookList(channel_id){
  var url = `${SERVER}/information?channel_id=${channel_id}`;
  // var url = `${SERVER}/information/daily?channel_id=${channel_id}&date=20151212`;
  console.log(url);
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

function getBook(id){
  console.log(id)
  var url = `${SERVER}/information/${id}`;
  console.log(url);
  return fetch(url, {headers: {"Accept-Version": "v2","Http-Authorization": "clvTFGghfLFeWVnJE4FLjz42t_9ssitH8VaXjnFitUXBw_OjAGhH_VkU4sYcB_cKjxHePHEAucpYfGjy7esdpLq_SKKKkqLm8mS8wr4BZJ9kG5gCZXYkI1NyFTIR2pau",}})
    .then((response) => response.json())
    .then((responseData) => {
      console.log("加载完成");
      return responseData.data;
    })
}

module.exports = DataServices;