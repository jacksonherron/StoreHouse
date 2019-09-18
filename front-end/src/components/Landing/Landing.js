import React from 'react';
import './Landing.css'
import Button from 'react-bootstrap/Button'

const Landing = ({ currentUser, handleShowLogin, handleShowSignup }) => {
    return(
        <div className="landing">
            <div className="titleInfo">
                <div className="brand">
                    <h1>StoreHouse</h1>
                    <i className="fas fa-home"></i>
                    <i className="fas fa-sun"></i>
                </div>
                <p className="slogan">Fast, simple solar and storage cost savings calculator for property owners</p>
            </div>
            <div className="features">

            </div>

            { !currentUser && <div className='auth-buttons'>
            <Button onClick={handleShowLogin} className="modalOpen">
                Login
            </Button>
            <Button onClick={handleShowSignup} className="modalOpen">
                Signup
            </Button>
            </div>}
        </div>
    )
}

export default Landing;