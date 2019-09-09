import React, { Component } from 'react';
// import axios from 'axios';
import './Auth.css';
// import API_URL from '../../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Signup extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
    }

    console.log(newUser)
    this.props.handleShowSignup()

      // axios.post(`${API_URL}/auth/register`, newUser)
      //     .then(res => {
      //         this.clearModal();
      //         this.props.history.push('/');
      //     })     
      //     .catch(err => {
      //         this.setState({ errors: err.response.data.errors });
      //     });
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
            {this.state.errors && this.state.errors.map((e, i) => (
                <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert" key={i}>
                    {e.message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
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
              <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input type="password" id="password2" name="password2" value={this.state.password2} onChange={this.handleChange} className="form-control form-control-lg" />
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

export default Signup;