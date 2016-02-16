'use strict';

import React, {
  Component,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  ListView,
  Image,
} from 'react-native';

import DataServices from '../network'
import Person from '../users/person'
import Nickname from '../users/nickname'

// import qiniu from 'qiniu'

// var qiniu = require('qiniu');

var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

// var qiniu = require('qiniu');

import '../storage'

class User extends Component {
  constructor(props){
    super(props)

    this.state = {
      token: null,
      user: {},
      user_avatar: "",
      user_name: "",
      avatarSource: null,
    }
  }

  componentDidMount() {
    global.storage.load({
      key: 'user',
      autoSync: true,
      syncInBackground: true
    }).then( ret => {
      //如果找到数据，则在then方法中返回

      this.setState({
        user_name: ret.user_name,
        user_avatar: ret.user_avatar,
        token: ret.token,
      })
    }).catch( err => {
      if(err == undefined){
        // 未存内容，未登录
        console.log(err);
      }
      //如果没有找到数据且没有同步方法，
      //或者有其他异常，则在catch中返回
    })
  }

  _loginedView() {
    return (
      <View style={styles.user}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigator.push({
              component: User,
              title: '个人资料'
            })
          }}
        >
          <Image 
            source={{uri: this.state.user_avatar || 'http://images.dtcj.com/news/020aa1244f86ab01d27821977760b6e978908a0628d21e7120c54d45912f4900'}} 
            style={styles.avatar}
          />
          <Text>{this.state.user_name}222</Text>

        </TouchableOpacity>
        
      </View>
    )
  }

  _handlePress() {
    global.storage.remove({
        key: 'user'
    });
    this.props.navigator.popToTop();
  }

  _handleUsername() {
    this.props.navigator.push({
      component: Nickname,
      title: '昵称'
    })
  }

  uploadFile(localFile, key, uptoken) {
    var extra = new qiniu.io.PutExtra();
    //extra.params = params;
    //extra.mimeType = mimeType;
    //extra.crc32 = crc32;
    //extra.checkCrc = checkCrc;

    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.key, ret.hash);
        // ret.key & ret.hash
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
        // http://developer.qiniu.com/docs/v6/api/reference/codes.html
      }
    });
  }


  selectPhoto() {
    var options = {
      title: 'Select Avatar', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      customButtons: {
        'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
      },
      cameraType: 'back', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      maxWidth: 100, // photos only
      maxHeight: 100, // photos only
      aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.2, // photos only
      angle: 0, // photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    };

    UIImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // uri (on iOS)
        const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        // const source = {uri: response.uri, isStatic: true};

        this.setState({
          avatarSource: source
        });

        // this.uploadFile(source, '123456789', '2Rk4xCaWinrr1iooUWR4HRTpkiVb8lzP4CXH8y5A:uphLFS_pYiW3oPRUJXb4YDR7PcM=:eyJzY29wZSI6ImR0Y2oiLCJkZWFkbGluZSI6Mjg2OTE5NzM5Nn0=')
      }
    });

  }

  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.avatar_bar}
          onPress={() => {this.selectPhoto()}}
          >
          <View>
            <Text>头像</Text>
          </View>
          <View style={styles.avatar_image}>
            <Image 
              source={{uri: this.state.user_avatar || 'http://images.dtcj.com/%40%2Ftest%2F456789'}} 
              style={styles.avatar}
            />
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this._handleUsername.bind(this)}
          style={styles.username}
          >
          <View>
            <Text>昵称</Text>
          </View>
          <View style={styles.username_name}>
            <Text>{this.state.user_name}</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <View style={styles.resetpassword}>
          <View>
            <Text>修改密码</Text>
          </View>
          <View>
            <Text>></Text>
          </View>
        </View>
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <Text style={styles.logout}>
            退出账号
          </Text> 
        </TouchableOpacity>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingLeft: 20,
    paddingRight: 15,
  },
  avatar_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar_image: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  username_name: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  resetpassword: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  logout: {
    marginTop: 30,
    textAlign: 'center',
  },
  
});

export default User;