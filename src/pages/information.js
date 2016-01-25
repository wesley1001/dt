'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  WebView,
  TouchableOpacity,
  ListView,
  Image,
} from 'react-native';

import Moment from 'moment'
import DataServices from '../network'
import InformationTmp from './information'

const BGWASH = 'rgba(255,255,255,0.8)'
const csss = '<style type="text/css">* {max-width: 100%}</style>'

class Information extends Component {
  constructor(props){
    super(props)

    this.state = {
      information: {},
      token: "",
      loading: true,
      related_information_lists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    }
  }

  componentDidMount() {
    DataServices.getInformation(this.props.information_id, 'token')
    .then( responseData => {
      this.setState({
        information: responseData,
        loading: false,
      });
    })
    .done();
    DataServices.getRealtedInformations(this.props.information_id)
      .then( responseData => {
        this.setState({
          related_information_lists: this.state.related_information_lists.cloneWithRows(responseData)
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
            component: InformationTmp,
            passProps: {information_id: information.id}
          });
        }}>
        <View style={styles.list}>
          <View style={styles.list_left}>
            <Text style={styles.title}>{information.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    if(this.state.loading){
      return (
        <View style={styles.loading}>
          <Text style={styles.title}>加载中</Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.recipe}>
          <Text style={styles.title}>{this.state.information.title}</Text>
          <Text style={styles.year}>{Moment(this.state.information.publish_at).format("YYYY-MM-DD HH:mm:ss")}</Text>
        </View>
        <View>
          <WebView 
            automaticallyAdjustContentInsets={true} 
            // startInLoadingState={true}
            // scalesPageToFit={true}
            // scrollEnabled={true}
            html={csss+this.state.information.content} 
            style={styles.content} 
          />
        </View>
        <View style={styles.more}>
          <Text style={styles.more_title}>更多推荐</Text>
          <ListView
            dataSource={this.state.related_information_lists} 
            renderRow={this.renderInformation.bind(this)}
            style={styles.lists}
          />
        </View>
      </ScrollView>
      
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:70,
  },
  recipe: {
    height: 70,
  },
  loading: {
    marginTop: 80,
  },
  rightContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    height: 300,
  },
  content: {
    height: Dimensions.get('window').height-200,
    backgroundColor: '#eeeeee',
    padding: 2,
  },
  more: {
    marginTop: 20,
    padding: 20,
  },
  more_title: {
    fontSize: 12,
  }
});

export default Information;