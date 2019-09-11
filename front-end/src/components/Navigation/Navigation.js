import React from 'react';
import { withRouter } from 'react-router-dom';
import './Navigation.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Navigation = ({ location, currentUser, handleLogout, handleShowLogin, handleShowSignup }) => {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {currentUser ? 
                        <>
                            <li onClick={handleLogout} className="navLink">Logout</li>
                            { location.pathname !== '/' && <Link to="/" className="navLink">About</Link> }
                            { location.pathname !== '/home' && <Link to="/home" className="navLink">Home</Link> }
                        </> :
                        <>
                            <li className="navLink" onClick={handleShowLogin}>Log In</li>
                            <li className="navLink" onClick={handleShowSignup}>Sign Up</li>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);