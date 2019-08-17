import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCQvjrPlXLqDz9EiqAu6qZc4eaYr2YMPZE",
  authDomain: "bill-keeper-react.firebaseapp.com",
  databaseURL: "https://bill-keeper-react.firebaseio.com",
  projectId: "bill-keeper-react",
  storageBucket: "",
  messagingSenderId: "618058061225",
  appId: "1:618058061225:web:4b0f5287e773d06e"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
