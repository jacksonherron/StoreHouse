import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import './Auth.css';
import API_URL from '../../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: []
  }

  handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    const userInfo = {
        email: this.state.email,
        password: this.state.password
    }

    axios.post(`${API_URL}/login`, userInfo)
      .then(res => {
        this.props.handleShowLogin()
        this.props.setCurrentUser(res.data.id, res.data.first_name, res.data.last_name);
        this.props.history.push('/home');
      })
      .catch(err => {
        this.setState({ errors:err.response.data.errors })
      });
  };


  render() {
    return (
      <>
        <Modal show={this.props.showLogin} onHide={this.props.handleShowLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.errors && this.state.errors.map((error, i) => (
              <Alert 
                key={i}
                variant="danger"
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
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email-login" name="email" value={this.state.email} onChange={this.handleChange} className="form-control form-control-lg" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password-login" name="password" value={this.state.password} onChange={this.handleChange} className="form-control form-control-lg" />
                </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="submit" onClick={this.handleSubmit}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(Login);