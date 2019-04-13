import React from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, AsyncStorage } from 'react-native';
import firebaseApp from '../helpers/Firebase';
import {
  Input,
  SearchBar,
  Icon,
  Button,
  ThemeProvider,
} from 'react-native-elements';

export class CreateTodoScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newTodoCard: ''
      }
    }

    async componentDidMount() {
      const name = await AsyncStorage.getItem('name');
      this.setState({name});
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
        title: "Create Card"
      };
    };

    getRef() {
      return firebaseApp.database().ref();
    }
  
    saveNewTodoCard() {
      let itemsRef = this.getRef().child('todoCards');
      itemsRef.push({
        name: this.state.newTodoCard,
        createdBy: this.state.name
      });
      // this.props.navigation.navigate('Lists');
      this.props.navigation.goBack();
    }
  
    render() {
      /* 2. Read the params from the navigation state */
      const { params } = this.props.navigation.state;
      const itemId = params ? params.itemId : null;
      const otherParam = params ? params.otherParam : null;
  
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Icon color="white" name="check" type="font-awesome" size={62} />
            <Text style={styles.heading}>Create a Card</Text>
          </View>
          <Input
            containerStyle={{ width: '90%' }}
            placeholder="Card Name"
            label="Card Name"
            labelStyle={{ marginTop: 16 }}
            onChangeText={(text) => { this.setState({ newTodoCard: text })}}
          />
          <Button
              title="Add"
              loading={false}
              loadingProps={{ size: 'small', color: 'white' }}
              buttonStyle={{
                backgroundColor: '#FF9800',
                borderRadius: 5,
                top: 24
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
              containerStyle={{ marginVertical: 10, height: 50, width: 230 }}
              onPress={() => this.saveNewTodoCard()}
              underlayColor="transparent"
            />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0
    },
    headerContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#FF9800',
        marginBottom: 20,
      },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
      },
    contentView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    triangleLeft: {
      position: 'absolute',
      left: -20,
      bottom: 0,
      width: 0,
      height: 0,
      borderRightWidth: 20,
      borderRightColor: 'white',
      borderBottomWidth: 25,
      borderBottomColor: 'transparent',
      borderTopWidth: 25,
      borderTopColor: 'transparent',
    },
    triangleRight: {
      position: 'absolute',
      right: -20,
      top: 0,
      width: 0,
      height: 0,
      borderLeftWidth: 20,
      borderLeftColor: 'white',
      borderBottomWidth: 25,
      borderBottomColor: 'transparent',
      borderTopWidth: 25,
      borderTopColor: 'transparent',
    },
    inputContainerStyle: {
      marginTop: 16,
      width: '90%',
    },
  });