'use strict';

import React from 'react-native'
import Moment from 'moment'
import Swiper from 'react-native-swiper'

var DataServices = require('../network');
var Information = require('./information');
var Person = require('../users/person');

var {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  ListView,
  Image,
} = React;

var Main = React.createClass({
  getInitialState() {
    return {
      banners: [],
      information_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    }
  },
  componentDidMount: function() {
     DataServices.getBanners()
      .then( responseData => {
        this.setState({
          banners: responseData
        });
      })
      .done();
    DataServices.getBlocks()
      .then( responseData => {
        this.setState({
          information_lists: this.state.information_lists.cloneWithRows(responseData)
        });
      })
      .done();
  },
  renderInformation: function(information){
    console.log(information)
    return (
      <TouchableHighlight 
        onPress={() => {
          this.props.navigator.push({
            title: information.title,
            component: Information,
            params: {information_id: information.id}
          });
        }}>
        <View style={styles.list}>
          <View style={styles.list_left}>
            <Text style={styles.keyword_to_display}>{information.keyword_to_display}</Text>
            <Text style={styles.title}>{information.title}</Text>
            <Text style={styles.publish_at}>{Moment(information.publish_at).format("YYYY-MM-DD HH:mm")}</Text>
          </View>
          <View style={styles.list_right} >
            <Image 
              source={{uri: information.thumbnail}} 
              style={styles.list_right_thumbnail} 
            />
            <View style={styles.paragraph_size}>
              <Text style={styles.paragraph_size_text}>{information.paragraph_size}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  },
  renderHeader () {
    var _this = this;
    return (
        <Swiper 
          style={styles.wrapper} 
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={5}
          height={300}
          showsPagination={false}>
          {
            this.state.banners.map(function(banner,i){
              var information_id = banner.url.split("/news/")[1];
              return (
                <TouchableHighlight 
                  key={i}
                  onPress={() => {
                    _this.props.navigator.push({
                      title: banner.title,
                      component: Information,
                      params: {information_id: information_id}
                    });
                  }}>
                  <View style={styles.banner}>
                    <Image 
                      source={{uri: banner.image_url}}
                      style={styles.banner_image}
                    />
                    <View style={styles.banner_text}>
                      <View style={styles.keyword}>
                        <Text style={styles.keyword_text}>{banner.keyword}</Text>
                      </View>
                      <View style={styles.banner_title}>
                        <Text style={styles.banner_title_text}>{banner.title}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })
          }
        </Swiper>
    );
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableHighlight 
            onPress={() => {
              this.props.navigator.push({
                component: Person,
              });
            }}>
            <View style={styles.person}>
              <Text style={styles.person_text}>个人中心</Text>
            </View>
          </TouchableHighlight>
        </View>
        <ListView
          renderHeader={this.renderHeader}
          dataSource={this.state.information_lists} 
          renderRow={this.renderInformation}
          style={styles.lists}
        />
      </View>
    )
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  nav: {
    position: 'absolute',
    // flex:1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    // height:50,
  },
  person: {
    // column:'red',
    position: 'absolute',
    right:0,
    top:30,
    paddingRight:10
  },
  person_text: {
    // color: 'red'
    fontSize:12,
  },
  wrapper:{
  },
  banner: {
  },
  banner_image: {
    width:Dimensions.get('window').width,
    height:300,
  },
  banner_text: {
    position: 'absolute',
    left:0,
    bottom: 2,
    padding: 10,
  },
  keyword: {
    backgroundColor: '#e0d05d',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:4,
    paddingBottom:4,
    borderRadius:3,
  },
  keyword_text: {
    color: 'white',
    fontSize: 14,
  },
  banner_title: {
    padding: 6,
    backgroundColor:'rgba(0,0,0,0.4)',
  },
  banner_title_text: {
    color: 'white',
    fontSize: 18,
  },
  lists: {
    marginTop:50,
    backgroundColor: 'eeeeee',
  },
  list: {
    marginLeft:10,
    marginRight:10,
    marginTop: 15,
    flex:1,
    height:120,
    flexDirection: 'row',
    padding:2,
    backgroundColor: 'white',
    // borderColor: 'gray', 
    // borderWidth: 1,
    borderRadius:5,
  },
  list_left: {
    padding:6,
    width:Dimensions.get('window').width/2,
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  keyword_to_display: {
    color:'rgba(194,127,22,0.8)',
    padding:4,
    fontSize:14,
  },
  publish_at: {
    color:'rgba(194,127,22,0.8)',
    padding:4,
    fontSize:12,
  },
  list_right: {
    marginTop:-2,
    borderRadius:5,
    marginRight:-2,
  },
  list_right_thumbnail: {
    borderRadius:5,
    width:Dimensions.get('window').width/2,
    height: 120,
  },
  paragraph_size:{
    width: 20,
    height: 20,
    position: 'absolute',
    borderRadius:10,
    top:10,
    right: 10,
    paddingLeft:6,
    paddingTop:2,
    backgroundColor: 'white'
  },
  paragraph_size_text:{
    fontSize:14,
    width:10,
    height:14,
    color:'rgba(194,127,22,0.8)',
  },
});

module.exports = Main;