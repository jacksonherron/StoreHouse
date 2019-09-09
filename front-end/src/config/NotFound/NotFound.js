import React from 'react';
import Button from 'react-bootstrap/Button'
import './NotFound.css'

const NotFound = (props) => {
    return (
        <div className="not-found">
            <h1>The page you are looking for does not exist...</h1>
            <Button className="go-back" onClick={ () => props.history.goBack() }>
                Go Back
            </Button>
        </div>
    );
};

export default NotFound