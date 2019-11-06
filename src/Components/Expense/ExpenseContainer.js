import React from 'react';
import {ExpenseForm} from "./ExpenseForm";
import Button from "react-bootstrap/Button";
import './styles.scss';
import Expense from "./Expense";
import {ExpenseList} from "./ExpenseList";

class ExpenseContainer extends React.Component {

  state = {
    showModal: false,
    editExpense: undefined,
    expenses: []
  };

  handleClose = () => this.setState({showModal: false});

  handleShow = () => this.setState({showModal: true});

  handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const expense = new Expense(
      undefined,
      form.elements.expenseFormCompany.value.trim(),
      this.formatAmount(form.elements.expenseFormAmount.value.trim()),
      form.elements.expenseFormDate.value.trim(),
      form.elements.expenseFormNote.value.trim(),
      form.elements.expenseFormReoccurring.checked);

    let expenses = this.state.expenses;
    expenses.push(expense);
    this.setState({expenses: expenses});
    this.handleClose();
  };

  formatAmount = (amount) => {
    if(amount.indexOf('.') < 0) {
      amount = amount.concat(".00");
    }

    return amount;
  };

  editExpense = (expense) => {
    this.setState({editExpense: expense});
    this.handleShow();
  };

  removeExpense = (expense) => {
    this.setState({expenses:  this.state.expenses.indexOf(expense)});
  };

  componentDidMount() {

  }

  render() {
    const {expenses, editExpense} = this.state;
    return (
      <div id="expense-container" className="text-center">
          <Button id="expense-container__add-expense" variant="dark" onClick={this.handleShow}>Add Expense</Button>
          <ExpenseForm editExpense={editExpense} showModal={this.state.showModal} handleClose={this.handleClose} handleSubmit={this.handleSubmit}/>
          <ExpenseList expenses={expenses} editExpense={this.editExpense} removeExpense={this.removeExpense}/>
      </div>
    );
  }
}

export default ExpenseContainer;