import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Swipeout from 'react-native-swipeout';
import ProfileScreen1 from './profile/screen1';

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ProfileScreen1 navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(47,44,60,1)',
  },
});
