import _ from 'lodash';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import firebaseApp from '../../helpers/Firebase';

import { cacheFonts } from '../../helpers/AssetsCaching';

const SCREEN_WIDTH = Dimensions.get('window').width;

const USERS = [
  {
    name: 'Johh Smith',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    value: '- 164',
  },
  {
    name: 'Sarah Parker',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
    value: '+ 203',
    positive: true,
  },
  {
    name: 'Paul Allen',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
    value: '+ 464',
    positive: true,
  },
  {
    name: 'Terry Andrews',
    avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
    value: '- 80',
    positive: false,
  },
  {
    name: 'Andy Vitale',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
    value: '- 230',
    positive: false,
  },
  {
    name: 'Katy Friedson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    value: '+ 160',
    positive: true,
  },
];

export default class ListsScreen1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      todoCards: []
    };
  }

  async componentDidMount() {
    await cacheFonts({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
    this.listenForItems();
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems() {
    let itemsRef = this.getRef().child('todoCards');
    itemsRef.on('value', (snap) => {

      // get children as an array
      var todoCards = [];
      snap.forEach((child) => {
        todoCards.push(child);
      });

      this.setState({
        todoCards
      });

    });
  }

  renderValue(user) {
    const { value, positive } = user;

    if (positive) {
      return (
        <View
          style={{
            backgroundColor: 'rgba(220,230,218,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon name="md-arrow-dropup" type="ionicon" color="green" size={25} />
          <Text
            style={{
              color: 'green',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {value}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: 'rgba(244,230,224,1)',
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 10,
          }}
        >
          <Icon name="md-arrow-dropdown" type="ionicon" color="red" size={25} />
          <Text
            style={{
              color: 'red',
              fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5,
            }}
          >
            {value}
          </Text>
        </View>
      );
    }
  }

  renderCard(card, index) {
    let {
      key
    } = card;
    let swipeBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
          this.deleteNote(rowData);
        },
      },
    ];
    return (
      <Swipeout
        right={swipeBtns}
        autoClose="true"
        backgroundColor="transparent"
      >
        <TouchableHighlight
          underlayColor="rgba(192,192,192,1,0.6)"
          onPress={() => { this.props.navigation.navigate('Todo', { test: card.key })}}
        >
          <View
            key={key}
            style={{
              height: 60,
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: 'white',
              borderRadius: 5,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View
              style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text
                style={{
                  fontFamily: 'regular',
                  fontSize: 15,
                  marginLeft: 10,
                  color: 'gray',
                }}
              >
                {JSON.stringify(card)}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  renderTodoCard() {
    return _.map(this.state.todoCards, (card) => {
      return this.renderCard(card);
    });
  }

  render() {
    return (
      <View>
        {this.state.fontLoaded ? (
          <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}
          >
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>Growing</Text>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
              {this.renderTodoCard()}
            </ScrollView>
          </SafeAreaView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'regular',
    marginLeft: 20,
  },
});
