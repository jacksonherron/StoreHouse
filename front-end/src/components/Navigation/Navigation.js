import React from 'react';
import { withRouter } from 'react-router-dom';
import './Navigation.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import { Link } from 'react-router-dom'

const Navigation = ({ currentUser, setCurrentUser, showLogin, showSignup, handleLogout, handleShowLogin, handleShowSignup }) => {
    return (
        <Navbar bg="light" expand="sm">
            <Nav.Item className="storehouse">
                <Link to='/' className="nav-link storehouse">StoreHouse <i className="fas fa-home nav-home"></i><i className="fas fa-sun nav-sun"></i></Link>
            </Nav.Item>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    {currentUser ? 
                        <>
                            <Nav.Item>
                                <Link to="/home" className="nav-link">Account</Link>
                            </Nav.Item>
                            <Nav.Item onClick={handleLogout} >Logout</Nav.Item>
                        </> :
                        <>
                            <Nav.Item className="authLink" onClick={handleShowLogin} >Log In</Nav.Item>
                            <Login showLogin={showLogin} handleShowLogin={handleShowLogin} setCurrentUser={setCurrentUser} />
                            <Nav.Item className="authLink" onClick={handleShowSignup}>Sign Up</Nav.Item>
                            <Signup showSignup={showSignup}  handleShowSignup={handleShowSignup} setCurrentUser={setCurrentUser} />
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);