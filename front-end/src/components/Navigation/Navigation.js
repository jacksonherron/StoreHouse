import React from 'react';
import { withRouter } from 'react-router-dom';
import './Navigation.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import { Link } from 'react-router-dom';

const Navigation = ({ location, currentUser, setCurrentUser, showLogin, showSignup, handleLogout, handleShowLogin, handleShowSignup }) => {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to='/' className="navLink">About</Link>
                    {currentUser ? 
                        <>
                            {<Link to="/home" className="navLink">Home</Link> }
                            <li onClick={handleLogout} className="navLink">Logout</li>
                        </> :
                        <>
                            <li className="navLink" onClick={handleShowLogin} >Log In</li>
                            <Login showLogin={showLogin} handleShowLogin={handleShowLogin} setCurrentUser={setCurrentUser} />
                            <li className="navLink" onClick={handleShowSignup}>Sign Up</li>
                            <Signup showSignup={showSignup} handleShowSignup={handleShowSignup} setCurrentUser={setCurrentUser} />
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);