import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import firebaseApp from '../helpers/Firebase';
import { ListItem } from '../components/ListItem';

export class TodoScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        todos: []
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
  
    listenForTodos() {
      let itemsRef = this.getRef().child('todoCards').child(this.key).child('todos');
      itemsRef.on('value', (snap) => {
  
        // get children as an array
        var todos = [];
        snap.forEach((child) => {
          todos.push(child.val());
        });
        
        this.setState({
          todos
        });
  
      });
    }

    renderTodo(todo) {
      console.log(todo);
      return (
        <ListItem
          title={todo.title}
          checkBox={{ checked: todo.checked }}
          bottomDivider
        />
      );
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
    }
  });