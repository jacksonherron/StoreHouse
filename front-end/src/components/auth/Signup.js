import React from 'react';
import './Auth.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Signup = ({ showSignup, handleShowSignup }) => {
  return (
    <>
      <Button onClick={handleShowSignup} className="modalOpen">
        Sign Up
      </Button>

      <Modal show={showSignup} onHide={handleShowSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please sign up for an account</Modal.Body>
        <Modal.Footer>
          <Button className="submit" onClick={handleShowSignup}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signup;