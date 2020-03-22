import React, { createContext } from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';
import {readUser, readExpenses, writeExpense, deleteExpense} from "./DatabaseService";
import User from "./ClassWrappers/User";

const UserContext = createContext({
  user: undefined,
  loginUser: () => {},
  logoutUser: () => {},
  readExpenses: () => {},
  addExpense: () => {},
  deleteExpense: () => {}
});

export class UserProvider extends React.Component {

  componentDidMount = async () => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user !== null) {
        let expenses = await readExpenses(user);
        this.setState({user: new User(user.uid, user.displayName, user.email, expenses)});
      }
      else
        this.setState({user: null});
    });
  };

  loginUser = async () => {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(async result => {
            await readUser(result.user)
              .then(async (user) => {
                // await readExpenses(user).then(expenses => {
                //   const dbUser = result.user;
                //   this.setState({user: new User(dbUser.uid, dbUser.displayName, dbUser.email, expenses)});
                // });
              })
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ":" + errorMessage)
          });
      });
  };
  logoutUser = async () => {
    await firebase.auth().signOut()
      .then(() => {
        this.setState({user: undefined});
      });
  };

  readExpenses = async (user) => {
    await readExpenses(user);
  };

  addExpense = async (user, expense) => {
    await writeExpense(user, expense).then(savedExpense => {
      let expenses = user.expenses;
      expenses.filter((exp) => {
        if(exp.uid === savedExpense.uid) {
          expenses.splice(expenses.indexOf(exp), 1);
        }
      });
      user.expenses.push(savedExpense);
      this.setState({user: user});
    });
  };

  deleteExpense = async (user, expense) => {
    await deleteExpense(user, expense);
    user.expenses.splice(user.expenses.indexOf(expense), 1);
    this.setState({user: user});
  }

  state = {
    user: undefined,
    loginUser: this.loginUser,
    logoutUser: this.logoutUser,
    readExpenses: this.readExpenses,
    addExpense: this.addExpense,
    deleteExpense: this.deleteExpense
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