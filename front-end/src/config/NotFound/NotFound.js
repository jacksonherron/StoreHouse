import React from 'react';
import Button from 'react-bootstrap/Button'

const NotFound = (props) => {
    return (
        <div id="not-found">
            <img src="https://http.cat/404" alt="404"/>
            <Button variant="primary" onClick={ () => props.history.goBack() }>
                Go Back
            </Button>
        </div>
    );
};

export default NotFound