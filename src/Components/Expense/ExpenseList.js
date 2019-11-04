import React from 'react';
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const ExpenseList = (props) => {

  const expenses = props.expenses;

  return(
    <React.Fragment>
      {expenses.length > 0 ? (
        <React.Fragment>
          <Container>
            <CardGroup>
              {expenses.map((expense) => {
                return (
                  <Col xs={12} sm={4} key={`expense-${expense.company}`}>
                    <Card bg="dark" text="white">
                      <Card.Header>{expense.company}</Card.Header>
                      <Card.Body>
                        <Row>
                          <Col xs={6}>
                            <span>${expense.amount}</span>
                          </Col>
                          <Col xs={6}>
                            <span>{expense.date}</span>
                          </Col>
                          <Col xs={12}>
                            <span>{expense.note}</span>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </CardGroup>
          </Container>
        </React.Fragment>

      ) : (
        <React.Fragment>
          <p>You have no expenses.</p>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}