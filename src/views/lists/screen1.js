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
import {ListItem} from "../../components/ListItem";
import Swipeout from 'react-native-swipeout';
import firebaseApp from '../../helpers/Firebase';
import TouchableScale from 'react-native-touchable-scale';
import { cacheFonts } from '../../helpers/AssetsCaching';
import {LinearGradient} from "../../components/LinearGradient";

const SCREEN_WIDTH = Dimensions.get('window').width;

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
        todoCards.push({ ...child.val(), key: child.key });
      });

      this.setState({
        todoCards
      });

    });
  }

  deleteTodoCard(card) {
    let itemsRef = this.getRef().child('todoCards').child(card.key);
    itemsRef.set(null);
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
          this.deleteTodoCard(card);
        },
      },
    ];
    return (
      <Swipeout
        right={swipeBtns}
        key={key}
        autoClose="true"
        backgroundColor="transparent"
      >
        <TouchableHighlight
          underlayColor="rgba(192,192,192,1,0.6)"
          onPress={() => { this.props.navigation.navigate('Todo', { key: card.key })}}
        >
          <ListItem
              component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              leftAvatar={{ rounded: true, source: { uri: "" } }}
              key={key}
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              ViewComponent={LinearGradient}
              title={card.name}
              titleStyle={{ color: 'white', fontWeight: 'bold' }}
              subtitleStyle={{ color: 'white' }}
              subtitle={`${Object.keys(card.todos || {}).length} Todos; Created by ${card.createdBy || ''}`}
              chevronColor="white"
              chevron
              containerStyle={{
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
              }}
            />
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
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? (
          <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}
          >
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
