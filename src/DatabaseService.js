import React, { createContext } from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';
import {db} from './fire';
import User from "./ClassWrappers/User";
import Expense from "./ClassWrappers/Expense";

export const readUser = async (user) => {
  return db.collection("users").doc(user.uid).collection("expenses").get()
    .then((result) => {
      if(result.exists) {
        const dbUser = result.data();
        return new User(dbUser.uid, dbUser.displayName, dbUser.email, []);
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
      return new User(authUser.uid, authUser.displayName, authUser.email, []);
    });
};

export const readExpenses = async (user) => {
  let expenses = [];
  await db.collection("users").doc(user.uid).collection("expenses").get()
    .then(result => {
      result.docs.forEach((doc) => {
        const docExpense = doc.data();
        expenses.push(new Expense(doc.id, docExpense.company, docExpense.amount, docExpense.dateString, docExpense.note, docExpense.isReoccurring));
      });
    });
  return expenses;
};

export const writeExpense = async (user, expense) => {
  let savedExpense = undefined;
  if(expense.uid) {
    await db.collection("users").doc(user.uid).collection("expenses").doc(expense.uid).update({...expense})
      .then(() => {
        savedExpense = expense;
      });
  } else {
    let spreadExpense = {
      company: expense.company,
      dateString: expense.date,
      amount: expense.amount,
      note: expense.note,
      isReoccurring: expense.isReoccurring
    };
    await db.collection("users").doc(user.uid).collection("expenses").add({...spreadExpense})
      .then((result) => {
        spreadExpense.id = result.id;
        savedExpense = new Expense(result.id, spreadExpense.company, spreadExpense.amount, spreadExpense.dateString, spreadExpense.note, spreadExpense.isReoccurring);
      })
  }
  return savedExpense;
};

export const deleteExpense = async (user, expense) => {
  if(user && expense) {
    await db.collection("users").doc(user.uid).collection("expenses").doc(expense.uid).delete();
  }
};