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

export const ExpenseForm = (props) => {
  const {showModal, handleClose, handleSubmit} = props;

  const handleDatePicked = (day) => {
    document.querySelector("#expenseFormDate").value = formatDate(day);
  };

  return (
    <Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add An Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="expense-form">
            <Row>
              <Form.Group as={Col} xs='12' controlId="expenseFormCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control required type="text" placeholder="Company" />
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
                />
              </Form.Group>
              <Form.Group as={Col} xs='6' controlId="expenseFormAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control required type="number" placeholder="Amount"/>
              </Form.Group>
              <Form.Group  as={Col} xs='6' controlId="expenseFormDate">
                <Form.Control type='hidden'/>
              </Form.Group>
            </Row>
            <Row>
              <FormGroup as={Col} xs='12' controlId="expenseFormNote">
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </FormGroup>
            </Row>
            <Row>
              <Form.Group as={Col} xs={'12'} controlId="expenseFormReoccurring">
                <Form.Check type="checkbox" label="Reoccurring Expense" />
              </Form.Group>
            </Row>

            <Button variant="dark" type="submit" id="expenseFormSubmit">
              Save Expense
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
};