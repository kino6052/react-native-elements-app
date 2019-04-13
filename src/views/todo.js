import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import firebaseApp from '../helpers/Firebase';
import { ListItem } from '../components/ListItem';
import Swipeout from 'react-native-swipeout';
import { white } from 'ansi-colors';

export class TodoScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        todos: [],
        newTodo: ''
      };
      this.key = this.props.navigation.state.params.key;
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        title: params ? params.otherParam : 'Todo',
        /* These values are used instead of the shared configuration! */
        
      };
    };

    componentDidMount() {
      this.listenForTodos();
    }

    getRef() {
      return firebaseApp.database().ref();
    }
  
    saveNewTodo() {
      let itemsRef = this.getRef().child('todoCards').child(this.key).child('todos');
      itemsRef.push({
        title: this.state.newTodo,
        checked: false
      });
      this.setState({newTodo: ''});
    }

    listenForTodos() {
      let itemsRef = this.getRef().child('todoCards').child(this.key).child('todos');
      itemsRef.on('value', (snap) => {
  
        // get children as an array
        var todos = [];
        snap.forEach((child) => {
          todos.push({ ...child.val(), key: child.key });
        });
        
        this.setState({
          todos
        });
  
      });
    }

    renderTodo(todo) {
      let swipeBtns = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          underlayColor: 'white',
          onPress: () => {
            this.deleteTodo(todo.key);
          },
        },
      ];
      return (
        <Swipeout
          key={todo.key}
          right={swipeBtns}
          autoClose={true}
          backgroundColor="transparent"
        >
          <ListItem
            title={todo.title}
            checkBox={{ checked: todo.checked, onPress: () => this.checkTodo(todo) }}
            bottomDivider
          />
        </Swipeout>
      );
    }

    deleteTodo(id) {
      let itemsRef = this.getRef().child('todoCards').child(this.key).child('todos').child(id);
      itemsRef.set(null);
    }

    checkTodo(todo) {
      let itemsRef = this.getRef().child('todoCards').child(this.key).child('todos').child(todo.key);
      itemsRef.set({
        title: todo.title,
        checked: !todo.checked
      });
    }
  
    render() {
      /* 2. Read the params from the navigation state */
      const { params } = this.props.navigation.state;
      const itemId = params ? params.itemId : null;
      const otherParam = params ? params.otherParam : null;
  
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{ flex: 1 }}>
              <SafeAreaView
                style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}
              >
                <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                    {
                      this.state.todos.map((todo) => {
                        return this.renderTodo(todo);
                      })
                    }
                    <Input
                      value={this.state.newTodo}
                      onChangeText={(text) => {
                        this.setState({ newTodo: text });
                      }}
                      rightIcon={
                        <Button
                          style={{ width: 100, height: "100%", borderRadius: 0, backgroundColor: '#FF9800', color: 'white' }}
                          
                          iconRight={true}
                          onPress={() => {
                            this.saveNewTodo();
                          }}
                          title="Add"
                        >
                        </Button>
                      }
                      containerStyle={styles.inputContainerStyle}
                      placeholder="Add new Todo"
                    />
                </ScrollView>
              </SafeAreaView>
          </View>
            
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
    },
    inputContainerStyle: {
      marginTop: 16,
      width: '100%',
    },
  });