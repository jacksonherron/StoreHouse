import React from 'react';
import './Auth.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Login = ({ showLogin, handleShowLogin }) => {
  return (
    <>
      <Button onClick={handleShowLogin} className="modalOpen">
        Login
      </Button>

      <Modal show={showLogin} onHide={handleShowLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter your account details</Modal.Body>
        <Modal.Footer>
          <Button className="submit" onClick={handleShowLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;