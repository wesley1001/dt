'use strict';

var SERVER = 'http://121.43.181.142:8079/api';

var DataServices = {
  'getBookList': getBookList,
  'getBook': getBook,
}

function getBookList(){
  var url = `${SERVER}/information/daily?channel_id=all&date=20151212`;
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