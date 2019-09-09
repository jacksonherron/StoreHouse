import React from 'react';
import './Landing.css'
import Login from '../auth/Login';
import Signup from '../auth/Signup';

const Landing = ({ showLogin, showSignup, handleShowLogin, handleShowSignup }) => {
    return(
        <div className="landing">
            <div className="brand">
                <h1>StoreHouse</h1>
                <i className="fas fa-home"></i>
                <i className="fas fa-sun"></i>
            </div>
            <p className="slogan">Fast, simple solar and storage cost savings calculator for California property owners</p>
            <div className='auth-buttons'>
                <Login showLogin={showLogin} handleShowLogin={handleShowLogin} />
                <Signup showSignup={showSignup} handleShowSignup={handleShowSignup}/>
            </div>
        </div>
    )
}

export default Landing;