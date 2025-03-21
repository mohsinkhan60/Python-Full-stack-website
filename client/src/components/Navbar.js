import React from "react";
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <>
      <Navbar className="px-3" bg="dark" data-bs-theme="dark">
          <Navbar.Brand href="/">Recipes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/signup">Sign up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/create_recipe">Create Recipes</Nav.Link>
            <Nav.Link href="#pricing">Log Out</Nav.Link>
          </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
