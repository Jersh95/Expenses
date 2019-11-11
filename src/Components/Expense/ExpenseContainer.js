import React from 'react';
import {ExpenseForm} from "./ExpenseForm";
import Button from "react-bootstrap/Button";
import './styles.scss';
import Expense from "../../ClassWrappers/Expense";
import {ExpenseList} from "./ExpenseList";
import {UserConsumer} from "../../UserContext";
import Spinner from "react-bootstrap/Spinner";

class ExpenseContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editExpense: undefined,
      expenses: []
    }
  };

  handleClose = () => this.setState({showModal: false, editExpense: undefined});

  handleShow = () => this.setState({showModal: true});

  editExpense = (expense) => {
    this.setState({editExpense: expense});
    this.handleShow();
  };

  componentDidMount() {

  }

  render() {
    const {editExpense} = this.state;
    return (
      <UserConsumer>
        {({user, addExpense, deleteExpense}) => {
          return (
          <div id="expense-container" className="text-center">
            {user === undefined &&
            <Spinner variant="light" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            }
            {user === null &&
            <p>Sign in to manage expenses</p>
            }
            {user &&
            <React.Fragment>
              <Button id="expense-container__add-expense" variant="dark" onClick={this.handleShow}>Add Expense</Button>
              <ExpenseForm showModal={this.state.showModal} handleClose={this.handleClose}
                           handleSubmit={this.handleSubmit} editExpense={this.state.editExpense} addExpense={addExpense} user={user}/>
              <ExpenseList user={user} editExpense={this.editExpense} deleteExpense={deleteExpense}/>
            </React.Fragment>
              }
          </div>
          )}
        }
      </UserConsumer>
    );
  }
}

export default ExpenseContainer;