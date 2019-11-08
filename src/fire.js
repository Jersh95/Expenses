import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhPRH9nSR-gX4ov1kStnpy15SDgJqZA0U",
  authDomain: "expense-dash.firebaseapp.com",
  databaseURL: "https://expense-dash.firebaseio.com",
  projectId: "expense-dash",
  storageBucket: "expense-dash.appspot.com",
  messagingSenderId: "565920245294",
  appId: "1:565920245294:web:4d2391ac86a5611367e1bf",
  measurementId: "G-JQGKQDFB2V"
};

const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {fire, db};