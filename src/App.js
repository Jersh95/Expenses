import React, {createContext} from 'react';
import Header from "./Components/Header/Header";
import './App.scss';
import ExpenseContainer from "./Components/Expense/ExpenseContainer";
import {UserProvider} from "./UserContext";
import fire from './fire';

class App extends React.Component {

  render() {
    return (
      <UserProvider>
        <div className="App">
          <Header/>
          <ExpenseContainer/>
        </div>
      </UserProvider>
    )}
}

export default App;
