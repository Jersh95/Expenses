import React from 'react';
import Nav from "react-bootstrap/Nav";
import logo from "../../logo.svg";
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import ExpenseContainer from "../Expense/ExpenseContainer";
import {Home} from "../Home/Home";
import Navbar from "react-bootstrap/Navbar";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

export const Header = (props) => {
  return(
    <Router>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="#home">
          <Link to='/'>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </Navbar.Brand>
        <Link to='/expenses'>Expenses</Link>
        <NavbarToggle aria-controls="responsive-navbar-nav"/>
        <NavbarCollapse>
          <Nav className="header">
          </Nav>
        </NavbarCollapse>
      </Navbar>
      <div>
        <Route path='/' exact component={Home}/>
        <Route path='/expenses' exact component={ExpenseContainer}/>
      </div>
    </Router>
  )
};