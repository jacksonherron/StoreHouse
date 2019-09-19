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
                { !currentUser && <div className='auth-buttons'>
                <Button onClick={handleShowLogin} className="modalOpen">
                    Login
                </Button>
                <Button onClick={handleShowSignup} className="modalOpen">
                    Signup
                </Button>
                </div>}
            </div>
            <div className="features">
                <div className="feature">
                    <h3>Save money by buying electricity when rates are cheapest</h3>
                </div>
                <div className="feature">
                    <h3>Increase your self reliance and keep power on during blackouts</h3>
                </div>
                <div className="feature">
                    <h3>Participate in decarbonizing the grid of the future</h3>
                </div>
            </div>
            <div className="safari">Please note, if accessing this site through Safari you must disable 'prevent cross-site tracking' in your privacy preferences. Don't forget to enable it again when you leave!</div>
        </div>
    )
}

export default Landing;