import React from 'react';
import {ExpenseForm} from "./ExpenseForm";
import Button from "react-bootstrap/Button";
import './styles.scss';
import {UserConsumer} from "../../UserContext";
import Spinner from "react-bootstrap/Spinner";
import CalendarView from "./CalendarView";

class ExpenseContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      expenseToEdit: undefined,
      expenses: []
    }
  };

  handleClose = () => this.setState({showModal: false, expenseToEdit: undefined});

  handleShow = () => this.setState({showModal: true});

  editExpense = (expense) => {
    this.setState({expenseToEdit: expense});
    this.handleShow();
  };

  componentDidMount() {

  }

  render() {
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
                <Button id="expense-container__add-expense" variant="dark" className={'mb-2'} onClick={this.handleShow}>Add Expense</Button>
                <ExpenseForm showModal={this.state.showModal} handleClose={this.handleClose}
                            expenseToEdit={this.state.expenseToEdit} addExpense={addExpense} user={user}/>
                <CalendarView user={user} editExpense={this.editExpense} deleteExpense={deleteExpense}/>
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