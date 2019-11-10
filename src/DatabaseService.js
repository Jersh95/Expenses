import React, { createContext } from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';
import {db} from './fire';
import User from "./ClassWrappers/User";

export const readUser = async (user) => {
  return db.collection("users").doc(user.uid).get()
    .then((result) => {
      if(result.exists) {
        return new User(result.data());
      } else {
        return writeUser(user);
      }
    });
};

export const writeUser = async (authUser) => {
  return db.collection("users").doc(authUser.uid).set({
    uid: authUser.uid,
    displayName: authUser.displayName,
    email: authUser.email
  })
    .then(() => {
      return new User(authUser);
    });
};