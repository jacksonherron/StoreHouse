import React, { Component } from 'react';
import './Home.css'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

class Home extends Component {
    state = {
        formData: 'empty'
    };

    render() {
        return (
            <div className="homePage">
                <div className="welcome">
                    <h1>Welcome,<span className="username">Current User</span></h1>
                </div>
                <div className="properties">
                    <h2>Your Properties</h2>
                </div>
                <div className="newProperty">
                    <h2>Add a property</h2>
                    <p>This process will walkthrough specifying a new solar and storage system for one of your properties. It shouldn't take any longer than 10 minutes to complete.</p>
                    <Link to='/specify' ><Button className="begin" onClick={this.handleSubmit}>Begin</Button></Link>
                </div>
            </div>
        )
    }
}

export default Home;