import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import API_URL from '../../constants';

class Home extends Component {
    state = {
        showModal: false,
        properties: []
    };

    handleShowModal = () => {
        if (this.state.showModal) {
            return this.setState({ showModal: false })
        }
        this.setState({ showModal: true })
    }

    deleteAccount = () => {
        const currentUser = JSON.parse(this.props.currentUser);
        axios.delete(
            `${API_URL}/user/${currentUser.id}`,
            { withCredentials: true },
            { headers: {
                "Access-Control-Allow-Origin": "*"
                } 
            } 
        )
            .then(() => {
                localStorage.removeItem('user');
                this.props.setCurrentUser(null);
                this.props.history.push('/');
            })
    };

    render() {
        const currentUser = JSON.parse(this.props.currentUser);
        return (
            <div className="homePage">
                <div className="welcome">
                    <h1>Welcome</h1>
                    <h1><span className="username">{currentUser && currentUser.first_name} {currentUser && currentUser.last_name}</span> ,</h1>
                </div>
                <div className="properties">
                    <h2>Your Properties</h2>
                </div>
                <div className="newProperty">
                    <h2>Add a Property</h2>
                    <p>This process will walkthrough specifying a new solar and storage system for one of your properties. It shouldn't take any longer than 10 minutes to complete.</p>
                    <Link to='/specify' ><Button className="begin">Begin</Button></Link>
                    <p className="deleteAccount" onClick={this.handleShowModal} >Delete Account</p>
                
                    <Modal show={this.state.showModal} onHide={this.handleShowModal}>
                        <Modal.Header>
                            <Modal.Title>Delete Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert variant="danger">Are you sure you want to permanently delete your account?</Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={this.deleteAccount}>
                                Delete
                            </Button>
                            <Button variant="secondary" onClick={this.handleShowModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);