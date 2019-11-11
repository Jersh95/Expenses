import React from 'react';
import logo from "../../logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {UserConsumer} from "../../UserContext";
import Spinner from "react-bootstrap/Spinner";
import './styles.scss';

class Header extends React.Component {

  componentDidMount = () => {

  };

  render() {
    return (
      <UserConsumer>
        {({user, loginUser, logoutUser}) => {
          return (
            <Navbar expand="lg" variant="dark" bg="dark" className="justify-content-between">
              <Navbar.Brand href="#home">
                <img src={logo} className="App-logo" alt="logo"/>
              </Navbar.Brand>
              {/*User is initially undefined until either it is read from local storage*/}
              {user === undefined &&
              <Spinner variant="light" animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>}
              {/*User is null if it does not exist in local storage*/}
              {/*{user === null && <Button className="float-right" variant="light" onClick={loginUser}><i className="fab fa-google"></i>Sign In</Button>}*/}
              {user === null && <Button className="float-right" variant="light" size="sm" onClick={loginUser}><img id="google-icon" src="https://img.icons8.com/color/28/000000/google-logo.png"/>Sign In</Button>}
              {/*User is read from local storage or signed in from Google Auth*/}
              {user && <Button variant="light" size="sm" onClick={logoutUser}>Sign out</Button>}
            </Navbar>
          )
        }}
      </UserConsumer>
    )
  }
}

export default Header;