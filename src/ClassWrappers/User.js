export default class User {
  constructor(firebaseUser) {
    this.uid = firebaseUser.uid;
    this.displayName = firebaseUser.displayName;
    this.email = firebaseUser.email;
    this.expenses = firebaseUser.expenses;
  }
}