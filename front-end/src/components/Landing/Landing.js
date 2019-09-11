import React from 'react';
import './Landing.css'
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Button from 'react-bootstrap/Button'

const Landing = ({ currentUser, setCurrentUser, showLogin, showSignup, handleShowLogin, handleShowSignup }) => {
    return(
        <div className="landing">
            <div className="brand">
                <h1>StoreHouse</h1>
                <i className="fas fa-home"></i>
                <i className="fas fa-sun"></i>
            </div>
            <p className="slogan">Fast, simple solar and storage cost savings calculator for California property owners</p>
            { !currentUser && <div className='auth-buttons'>
            <Button onClick={handleShowLogin} className="modalOpen">
                Login
            </Button>
            <Button onClick={handleShowSignup} className="modalOpen">
                Signup
            </Button>
                {/* <Login showLogin={showLogin} handleShowLogin={handleShowLogin} currentUser={currentUser} setCurrentUser={setCurrentUser} />
                <Signup showSignup={showSignup} handleShowSignup={handleShowSignup} currentUser={currentUser} setCurrentUser={setCurrentUser} /> */}
            </div>}
        </div>
    )
}

export default Landing;