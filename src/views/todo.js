import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export class TodoScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        title: params ? params.otherParam : 'Todo',
        /* These values are used instead of the shared configuration! */
        
      };
    };
  
    render() {
      /* 2. Read the params from the navigation state */
      const { params } = this.props.navigation.state;
      const itemId = params ? params.itemId : null;
      const otherParam = params ? params.otherParam : null;
  
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView style={{ flex: 1, marginBottom: 20 }}>
            <Text>{JSON.stringify(this.props.navigation.state)}</Text>
          </ScrollView>
        </View>
      );
    }
  }