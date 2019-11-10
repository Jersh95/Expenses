import React from 'react';
import logo from "../../logo.svg";
import Navbar from "react-bootstrap/Navbar";
import GoogleButton from "react-google-button";
import Button from "react-bootstrap/Button";
import {UserConsumer} from "../../UserContext";

class Header extends React.Component {

  state = {
    user: undefined
  };

  componentDidMount = () => {

  };

  render() {
    let {user} = this.state;
    console.log('component user', user)
    return (
      <UserConsumer>
        {({user, loginUser, logoutUser}) =>
          <Navbar expand="lg" variant="dark" bg="dark" className="justify-content-between">
            <Navbar.Brand href="#home">
              <img src={logo} className="App-logo" alt="logo"/>
            </Navbar.Brand>
            {user ? (
              <Button variant="light" onClick={logoutUser}>Sign out</Button>
            ) : (
              <GoogleButton className="float-right" onClick={loginUser}/>
            )}
          </Navbar>
        }
      </UserConsumer>
    )
  }
}

export default Header;