// 'use strict';

// var React = require('react-native');
// var moment = require('moment');

// var Information = require('./information');
// var InformationListDate = require('./information_date_list');
// var DataServices = require('./network');

// var {
//   View,
//   Text,
//   StyleSheet,
//   ListView,
//   TouchableHighlight,
//   Image,
// } = React;

// var Banner = React.createClass({
//   getInitialState() {
//     return {
//       history_hotest_information: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
//     }
//   },
//   componentDidMount: function() {
//     DataServices.getHistoryHotestInformation()
//       .then( responseData => {
//         this.setState({
//           history_hotest_information: this.state.history_hotest_information.cloneWithRows(responseData),
//         });
//       })
//       .done();
//   },
//   _renderRow: function(title: string, onPress: Function) {
//     return (
//       <View style={styles.content}>
//         <TouchableHighlight onPress={onPress}>
//           <Text style={styles.title}>{title}</Text>
//         </TouchableHighlight>
//         <View style={styles.separator} />
//       </View>
//     );
//   },

//   _today_all: function(title: string, onPress: Function) {
//     return (
//       <View style={styles.content}>
//         <TouchableHighlight onPress={onPress}>
//           <Text style={styles.title}>{title}</Text>
//         </TouchableHighlight>
//         <View style={styles.separator} />
//       </View>
//     );
//   },
//   renderInformation: function(information){
//     return (
//       <View style={styles.container}>
//         <Image source={{uri: information.thumbnail || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} style={styles.thumbnail} />
//         <View style={styles.rightContainer}>
//           {this._renderRow(information.title, () => {
//             this.props.navigator.push({
//               title: information.title,
//               component: Information,
//               passProps: {information_id: information.id},
//             });
//           })}
//           {this._today_all('当天全部', () => {
//             this.props.navigator.push({
//               title: moment(information.publish_at).format("YYYY-MM-DD HH:mm:ss"),
//               component: InformationListDate,
//               passProps: {date: information.publish_at},
//             });
//           })}
//         </View>
        
//       </View>
//     )
//   },
//   render: function() {
//     return (
//       <ListView dataSource={this.state.history_hotest_information} renderRow={this.renderInformation} />
//     );
//   },
// });

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   thumbnail: {
//     height: 53,
//     width: 81,
//   },
//   rightContainer: {
//     flex:1,
//     flexDirection: 'column'
//   },
//   content: {
//     marginTop: 10,
//     marginLeft:20,
//   },
//   link:{
//     height:30,
//     width: 80,
//     bottom:0,
//     right:0
//   }
// });

// module.exports = Banner;