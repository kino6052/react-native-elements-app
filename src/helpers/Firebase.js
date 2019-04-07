import * as firebase from 'firebase';

// Initialize Firebase
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDUxDBAbWp6ysUNwaEBe-p5a51Pl5pYRwo",
    authDomain: "todo-a832b.firebaseapp.com",
    databaseURL: "https://todo-a832b.firebaseio.com",
    projectId: "todo-a832b",
    storageBucket: "todo-a832b.appspot.com",
    messagingSenderId: "625269623546"
  };

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();