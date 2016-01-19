'use strict';

import React from 'react-native'
import Moment from 'moment'
import Swiper from 'react-native-swiper'

var DataServices = require('../network');
var Information = require('./information');

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
    return (
      <TouchableHighlight 
        onPress={() => {
          this.props.navigator.push({
            title: information.title,
            component: Information,
            passProps: {information_id: information.id}
          });
        }}>
        <View style={styles.list}>
        <View style={styles.list_left}>
          <Text style={styles.keyword_to_display}>{information.keyword_to_display}</Text>
          <Text style={styles.title}>{information.title}</Text>
          <Text style={styles.publish_at}>{Moment(information.publish_at).format("YYYY-MM-DD HH:mm")}</Text>
        </View>
        <Image 
          source={{uri: information.thumbnail}} 
          style={styles.list_right} 
        />
        </View>
      </TouchableHighlight>
      
    )
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Swiper 
          style={styles.wrapper} 
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={5}
          height={300}
          showsPagination={false}>
          {
            this.state.banners.map(function(banner,i){
              console.log(banner)
              return (
                <View key={i} style={styles.banner}>
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
              );
            })
          }
        </Swiper>
        <ListView
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
    backgroundColor: 'eeeeee',
    padding:10,
  },
  list: {
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
    width:Dimensions.get('window').width/2-10,
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
    height: 120,
    marginTop:-2,
    borderRadius:5,
    width:Dimensions.get('window').width/2-10,
  }
});

module.exports = Main;