import React from "react";
import Calendar from 'react-calendar';
import Modal from "react-bootstrap/Modal";
import {ExpenseList} from "./ExpenseList";
import {formatDate, parseDate} from 'react-day-picker/moment';

class CalendarView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevExpCount: undefined,
      user: this.props.user,
      showModal: false,
      reoccurringExpenses: [],
      displayExpenses: [],
      expensesForMonth: [],
      date: new Date()
    }
  };

  componentDidMount = () => {
    this.setupExpensesForMonth(formatDate(this.state.date));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.prevExpCount !== this.state.user.expenses.length) {
      this.setupExpensesForMonth(formatDate(this.state.date));
    }
  }

  setupExpensesForMonth = (date) => {
    let expenses = this.state.user.expenses;
    if(date && expenses) {
      let dateArr = date.split('/');
      let filteredExpenses = expenses.filter(exp => {
        let expArr = exp.date.split('/');
        if(exp.isReoccurring) {
          expArr[0] = dateArr[0];
          exp.date = expArr[0] + '/' + expArr[1] + '/' + expArr[2];
        }
        if(expArr) {
          return expArr[0] === dateArr[0] && expArr[2] === dateArr[2]
        }
      });
      this.setState({expensesForMonth: filteredExpenses, prevExpCount: this.state.user.expenses.length});
    }
  };

  handleClose = () => this.setState({showModal: false});

  handleShow = () => this.setState({showModal: true});

  onClickDay = (date) => {
    let expenses = this.state.user.expenses.filter(exp => {
      return exp.date === date;
    });

    this.setState({displayExpenses: expenses, showModal: true});
    this.handleShow();
  };

  render() {
    //This can be used to render either:
    //  The date if no expenses for the day, or
    //  A circle with the date if there are expenses for the day
    //Commenting out as, since I am now disabling days without expenses, it is unnecessary, but keeping for reference
    // const tileContent = ({ date, view }) => {
    //   if(view === 'month') {
    //     let expCount = this.state.expensesForMonth.filter(exp => {
    //       return exp.date === formatDate(date);
    //     });
    //     if(expCount && expCount.length > 0) {
    //       return (
    //         <span className='react-calendar__tile__date'>{date.getDate()}</span>
    //       )
    //     }
    //     return date.getDate();
    //   }
    // };

    const tileDisabled = ({date, view}) => {
      if(view === 'month') {
        let expCount = this.state.expensesForMonth.filter(exp => {
          return exp.date === formatDate(date);
        });
        return !expCount || expCount.length < 1;
      }

      return false;
    };

    const onActiveDateChange = ({activeStartDate, view}) => {
      if(view === 'month') {
        this.setupExpensesForMonth(formatDate(activeStartDate));
      }
    };

    let {showModal, displayExpenses} = this.state;
    let {user, editExpense, deleteExpense} = this.props;

    return (
      <React.Fragment>
        <Calendar calendarType="US"
                  value={this.state.date}
                  tileClassName='border d-flex justify-content-center'
                  onClickDay={(date) => {this.onClickDay(formatDate(date));}}
                  // tileContent={tileContent}
                  tileDisabled={tileDisabled}
                  onActiveDateChange={onActiveDateChange}
        />
        <Modal id="view-expenses-modal" show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Expenses</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExpenseList
              user={user}
              displayExpenses={displayExpenses}
              editExpense={(expense) => {
                editExpense(expense);
                this.handleClose();
              }}
              deleteExpense={(expense) => {
                deleteExpense(this.state.user, expense);
                this.handleClose();
              }}/>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )}
}

export default CalendarView;