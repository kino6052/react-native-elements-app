import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
// @monte9
import LoginScreen1 from './login/screen1';

export default class Login extends Component {
  componentDidMount() {
     StatusBar.setHidden(true);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          <LoginScreen1 navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
