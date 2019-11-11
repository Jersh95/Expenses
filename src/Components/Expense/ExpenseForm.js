import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import FormGroup from "react-bootstrap/FormGroup";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Row from "react-bootstrap/Row";
import {formatDate, parseDate} from 'react-day-picker/moment';
import Expense from "../../ClassWrappers/Expense";

export const ExpenseForm = (props) => {
  const {editExpense, showModal, handleClose, addExpense, user} = props;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const expense = new Expense(
      form.elements.expenseFormUid.value,
      form.elements.expenseFormCompany.value.trim(),
      formatAmount(form.elements.expenseFormAmount.value.trim()),
      form.elements.expenseFormDate.value.trim(),
      form.elements.expenseFormNote.value.trim(),
      form.elements.expenseFormReoccurring.checked);

    if(addExpense)
      await addExpense(user, expense);
    handleClose();
  };

  const formatAmount = (amount) => {
    if(amount.indexOf('.') < 0) {
      amount = amount.concat(".00");
    }

    return amount;
  };

  const handleDatePicked = (day) => {
    document.querySelector("#expenseFormDate").value = formatDate(day);
  };

  return (
    <Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${editExpense ? 'Edit Expense' : 'Add An Expense'}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="expense-form">
            <Row>
              <Form.Group as={Col} xs='12' controlId="expenseFormCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control required type="text" placeholder="Company" defaultValue={editExpense ? editExpense.company : undefined}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} xs='6' controlId="expenseFormDate">
                <Form.Label>Date</Form.Label>
                <DayPickerInput
                  onDayChange={day => handleDatePicked(day)}
                  placeholder={"Date"}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  value={parseDate(editExpense ? editExpense.date : undefined)}
                />
              </Form.Group>
              <Form.Group as={Col} xs='6' controlId="expenseFormAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control required type="number" placeholder="Amount" defaultValue={editExpense ? editExpense.amount : undefined}/>
              </Form.Group>
              <Form.Group  as={Col} xs='6' controlId="expenseFormDate">
                <Form.Control type='hidden' defaultValue={editExpense ? editExpense.date : undefined}/>
              </Form.Group>
            </Row>
            <Row>
              <FormGroup as={Col} xs='12' controlId="expenseFormNote">
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue={editExpense ? editExpense.note : undefined}/>
              </FormGroup>
            </Row>
            <Row>
              <Form.Group as={Col} xs={'12'} controlId="expenseFormReoccurring">
                <Form.Check type="checkbox" label="Reoccurring Expense" defaultChecked={editExpense ? editExpense.isReoccurring : false} />
              </Form.Group>
            </Row>
            <FormGroup controlId="expenseFormUid">
              <Form.Control type="hidden" defaultValue={editExpense ? editExpense.uid : undefined}/>
            </FormGroup>
            <Button variant="dark" type="submit" id="expenseFormSubmit">
              Save Expense
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
};