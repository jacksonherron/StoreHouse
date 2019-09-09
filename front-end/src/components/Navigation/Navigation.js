import React from 'react';
import './Navigation.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Navigation = ({ handleShowLogin, handleShowSignup }) => {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={handleShowLogin}>Log In</Nav.Link>
                    <Nav.Link onClick={handleShowSignup}>Sign Up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;