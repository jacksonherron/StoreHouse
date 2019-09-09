import React from 'react';
import './Navigation.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navigation = ({ handleShowLogin, handleShowSignup }) => {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="navLink">About</Link>
                    <Link to="/home" className="navLink">Home</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;