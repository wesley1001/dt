'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';

import Moment from 'moment'
import DataServices from '../network'
import Information from '../pages/information'

// 缓存结果
var resultsCache = {
  data: [],
  next_page:1,
  per_page:10,
  total:0,
};

class Qrqm extends Component {
  constructor(props){
    super(props)

    this.state = {
      information_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    }
  }

  componentDidMount() {
    DataServices.getInformationList(this.props.channel_id)
      .then( responseData => {
        resultsCache.data = responseData;
        this.setState({
          information_lists: this.state.information_lists.cloneWithRows(responseData)
        });
      })
      .done();
  }

  _renderRow(title: string, onPress: Function) {
    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderInformation(information){
    console.log(information);
    return (
      <View style={styles.list}>
        <View style={styles.website}>
          <View style={styles.origin_website_all}>
            <Image 
              source={{uri: information.origin_website_icon_url || 'http://images.dtcj.com/uc%2Fadv.jpg?imageView2/1/w/16/h/16'}}
              style={styles.origin_website_icon_url}
            />
            <Text style={styles.origin_website}>{information.origin_website}</Text>
          </View>
          <Text style={styles.publish_at}>{Moment(information.publish_at).format("HH:mm:ss")}</Text>
        </View>
        <View style={styles.separator} />
        <TouchableOpacity onPress={()=>{
          this.props.navigator.push({
            component: Information,
            title: information.title,
            passProps: {
              information_id: information.id,
            }
          })
        }}>
          <View style={styles.title}>
            <Text style={styles.title_text}>{information.title}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summary_text}>{information.summary}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderFooter() {
    return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
  }

  onEndReached(){
    DataServices.getInformationList(this.props.channel_id)
      .then( responseData => {
        var history_informations = resultsCache.data
        for (var i in responseData) {
          history_informations.push(responseData[i]);
        }
        resultsCache.next_page += 1;

        this.setState({
          information_lists: this.state.information_lists.cloneWithRows(history_informations)
        });
      })
      .done();
  }
  
  render() {
    var content = this.state.information_lists.getRowCount() === 0 ?
    <View>
      <Text style={styles.noMoviesText}>No Information found</Text>
    </View>
    :
    <ListView
      dataSource={this.state.information_lists} 
      renderRow={this.renderInformation.bind(this)}
      renderFooter={this.renderFooter}
      onEndReached={this.onEndReached.bind(this)}
      onEndReachedThreshold={50}
      style={styles.lists}
    />

    return (
      <View style={styles.container}>
        {content}
      </View>
    )
  }
};

var styles = StyleSheet.create({
  noMoviesText: {
    color: '#888888',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:60,
  },
  lists: {
    backgroundColor: 'eeeeee',
  },
  list: {
    flex:1,
    flexDirection: 'column',

    marginLeft:12,
    marginRight:12,
    marginTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,

    backgroundColor: 'white',
    // borderColor: 'gray', 
    // borderWidth: 1,
    borderRadius:5,
  },
  website: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  origin_website_all: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  origin_website_icon_url: {
    height: 26,
    width: 26,
  },
  origin_website: {
    fontSize: 12,
    color: '#757e5e',
  },
  publish_at: {
    fontSize: 12,
    color: '#757e5e',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    marginTop: 10,
  },
  title_text: {
    fontSize: 16,
    lineHeight: 20,
  },
  summary: {
    marginTop: 6,
  },
  summary_text: {
    fontSize:14,
    color: '#75715e',
    lineHeight: 20,
    height: 60,
  }
});

export default Qrqm;