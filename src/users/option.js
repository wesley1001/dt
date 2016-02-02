'use strict';
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import DataServices from '../network';
import SearchBar from 'react-native-search-bar';

class Option extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
        ref='searchBar'
        placeholder='Search'
        // barTintColor='red'
        // onChangeText={...}
        // onSearchButtonPress={...}
        // onCancelButtonPress={...}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
});

export default Option;