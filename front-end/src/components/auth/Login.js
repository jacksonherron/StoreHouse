import React, { Component } from 'react';
// import axios from 'axios';
import './Auth.css';
// import API_URL from '../../constants';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: null
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

    console.log(userInfo)
    this.props.handleShowLogin()

    // axios.post(`${API_URL}/auth/login`, userInfo, { withCredentials: true })
    //     .then(res => {
    //         this.clearModal();
    //         this.props.setCurrentUser(res.data.id, res.data.username);
    //         this.props.history.push('/home');
    //     })
    //     .catch(err => {
    //         this.setState({ errors: err.response.data.errors });
    // });
  };


  render() {
    return (
      <>
        <Button onClick={this.props.handleShowLogin} className="modalOpen">
          Login
        </Button>
  
        <Modal show={this.props.showLogin} onHide={this.props.handleShowLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
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

export default Login;