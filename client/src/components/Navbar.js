import React from "react";
// import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logout, useAuth } from "../auth";

const LoggedInLink = () => {
  return (
    <>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/create_recipe">Create Recipes</Nav.Link>
      <Nav.Link href="/login" onClick={() => {logout()}}>Log Out</Nav.Link>
    </>
  );
};

const LoggedOutLink = () => {
  return (
    <>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/signup">Sign up</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </>
  );
};

const NavBar = () => {
  const [logged] = useAuth();

  return (
    <>
      <Navbar className="px-3" bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="#">Recipes</Navbar.Brand>
        <Nav className="me-auto">
          {logged ? <LoggedInLink /> : <LoggedOutLink />}
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
