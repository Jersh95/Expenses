import React, { createContext } from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';
import {db} from './fire';

const UserContext = createContext({
  user: {},
  expenses: [],
  loginUser: () => {},
  logoutUser: () => {}
});

export class UserProvider extends React.Component {
  loginUser = () => {
    // db.collection("users").get().
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(result => {
            let token = result.credential.accessToken;
            console.log("user", result.user)
            db.collection("users").doc(result.user.uid).set({
              emailAddress: result.user.email,
              name: result.user.displayName,
              uid: result.user.uid
            })
              .then(() => {
                db.collection(("users")).doc(result.user.uid).collection("expenses").add({
                  company: "Charter",
                  dateString: "11/18/2019",
                  amount: 45.00,
                  note: "",
                  isReoccurring: false
                });
              });
            this.setState({user: result.user});
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ":" + errorMessage)
          });
      });
  };
  logoutUser = () => {
    firebase.auth().signOut();
    this.setState({user: undefined})
  };

  state = {
    user: 'user',
    loginUser: this.loginUser,
    logoutUser: this.logoutUser,
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;