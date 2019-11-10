import React, { createContext } from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';
import {db} from './fire';
import {readUser} from "./DatabaseService";

const UserContext = createContext({
  user: {},
  expenses: [],
  loginUser: () => {},
  logoutUser: () => {}
});

export class UserProvider extends React.Component {
  loginUser = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(async result => {
            let token = result.credential.accessToken;
            await readUser(result.user).then(returned => {
              this.setState({user: result.user});
            });
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