'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';

import Moment from 'moment'
import Swiper from 'react-native-swiper'
import DataServices from '../network';
import Information from './information'
import SearchBar from 'react-native-search-bar';
import Option from '../users/option'
import SearchList from '../pages/search_list'

class Main extends Component {
  constructor(props){
    super(props)

    this.state = {
      banners: [],
      information_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    }
  }

  componentDidMount() {
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
  }
  renderInformation(information){
    return (
      <TouchableOpacity 
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
          <View style={styles.list_right} >
            <Image 
              source={{uri: information.thumbnail || 'http://images.dtcj.com/uc%2Fadv.jpg?imageView2/1/w/200/h/200'}} 
              style={styles.list_right_thumbnail} 
            />
            <View style={styles.paragraph_size}>
              <Text style={styles.paragraph_size_text}>{information.paragraph_size}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    return (
      <View style={styles.main}>
        <View style={styles.search_bar}>
          <SearchBar
          ref='searchBar'
          placeholder='Search'
          onSearchButtonPress={(e) => {
            DataServices.GetSearchInformation(e)
              .then( responseData => {
                this.props.navigator.push({
                  title: '搜索结果',
                  component: SearchList,
                  passProps: {information_lists: responseData}
                })
              })
              .done();
            }
          }
          />
        </View>
        <Swiper 
          style={styles.wrapper} 
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={5}
          height={300}
          showsPagination={false}>
          {
            this.state.banners.map((banner, i) => {
              if(banner.url){
                var information_id = banner.url.split("/news/")[1];
                return (
                  <TouchableOpacity 
                    key={i}
                    onPress={() => {
                      this.props.navigator.push({
                        title: banner.title,
                        component: Information,
                        passProps: {information_id: information_id}
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
                  </TouchableOpacity>
                )
              }else{
                return (
                  <View style={styles.banner} key={i}>
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
                )
              }
              
            })
          }
        </Swiper>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          renderHeader={(this.renderHeader).bind(this)}
          dataSource={this.state.information_lists} 
          renderRow={this.renderInformation.bind(this)}
          style={styles.lists}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  search_bar: {
    // position: 'relative',
  },
  person: {
    position: 'absolute',
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

export default Main;