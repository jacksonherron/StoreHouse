import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import './Auth.css';
import API_URL from '../../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class Signup extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    errors: []
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const new_user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
    }

    axios.post(`${API_URL}/register`, new_user)
      .then(res => {
        this.props.handleShowSignup()
        this.props.setCurrentUser(res.data.id, res.data.first_name, res.data.last_name);
        this.props.history.push('/home');
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors })
      });

  };

  render() {
    return (
      <>
        <Button onClick={this.props.handleShowSignup} className="modalOpen">
          Sign Up
        </Button>
  
        <Modal show={this.props.showSignup} onHide={this.props.handleShowSignup}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.errors && this.state.errors.map((error, i) => (
              <Alert 
                className="alert"
                key={i}
                variant={"danger"}
                onClose={() => {
                  let errors = this.state.errors;
                  errors.splice(i);
                  this.setState({ errors: errors })
                }}
                dismissible>
                {error}
              </Alert>
            ))}
            <form>
              <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleChange} className="form-control form-control-lg" />
              </div>
              <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleChange} className="form-control form-control-lg" />
              </div>
              <div className="form-group">
                  <label htmlFor="email-register">Email</label>
                  <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control form-control-lg"/>
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password-register" name="password" value={this.state.password} onChange={this.handleChange} className="form-control form-control-lg" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="submit" onClick={this.handleSubmit}>
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(Signup);