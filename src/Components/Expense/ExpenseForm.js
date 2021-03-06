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
  const {expenseToEdit, showModal, handleClose, addExpense, user} = props;

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
          <Modal.Title>{`${expenseToEdit ? 'Edit Expense' : 'Add An Expense'}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="expense-form">
            <Row>
              <Form.Group as={Col} xs='12' controlId="expenseFormCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control required pattern="[a-zA-Z0-9\s]+" title="Only alphanumeric characters are allowed." placeholder="Company" defaultValue={expenseToEdit ? expenseToEdit.company : undefined}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} xs='6' controlId="expenseFormDate">
                <Form.Label>Date</Form.Label>
                <DayPickerInput
                  inputProps={{pattern:"^\\d{2}\\/\\d{2}\\/\\d{4}$", title:"Ex: 01/01/2020"}}
                  onDayChange={day => handleDatePicked(day)}
                  placeholder={"Date"}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  value={parseDate(expenseToEdit ? expenseToEdit.date : undefined)}
                />
              </Form.Group>
              <Form.Group as={Col} xs='6' controlId="expenseFormAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control required pattern="^\d+(\.\d{2}$)?" title="Ex: 10.00" placeholder="Amount" defaultValue={expenseToEdit ? expenseToEdit.amount : undefined}/>
              </Form.Group>
              <Form.Group  as={Col} xs='6' controlId="expenseFormDate">
                <Form.Control type='hidden' defaultValue={expenseToEdit ? expenseToEdit.date : undefined}/>
              </Form.Group>
            </Row>
            <Row>
              <FormGroup as={Col} xs='12' controlId="expenseFormNote">
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue={expenseToEdit ? expenseToEdit.note : undefined}/>
              </FormGroup>
            </Row>
            <Row>
              <Form.Group as={Col} xs={'12'} controlId="expenseFormReoccurring">
                <Form.Check type="checkbox" label="Reoccurring Expense" defaultChecked={expenseToEdit ? expenseToEdit.isReoccurring : false} />
              </Form.Group>
            </Row>
            <FormGroup controlId="expenseFormUid">
              <Form.Control type="hidden" defaultValue={expenseToEdit ? expenseToEdit.uid : undefined}/>
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