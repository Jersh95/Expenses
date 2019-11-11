import React from 'react';
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export const ExpenseList = (props) => {

  const {user, editExpense, deleteExpense} = props;
  return(
    <div id="expense-list">
      {user.expenses.length > 0 ? (
        <React.Fragment>
          <Container>
            <CardGroup>
              {user.expenses.map((expense) => {
                return (
                  <Col xs={12} sm={4} key={`expense-${expense.company}`} className="expense-item">
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
                      <Card.Footer>
                        <Button size="sm" variant="light" className="float-left" onClick={() => editExpense(expense)}>
                          <i className="fas fa-pencil-alt"/>
                        </Button>
                        <Button size="sm" variant="light" className="float-right" onClick={() => deleteExpense(user, expense)}>
                          <i className="fas fa-trash"/>
                        </Button>
                      </Card.Footer>
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
    </div>
  )
}