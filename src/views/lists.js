import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import ListsScreen1 from './lists/screen1';

export default class Lists extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} pagingEnabled decelerationRate={0.993}>
          <ListsScreen1 navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
