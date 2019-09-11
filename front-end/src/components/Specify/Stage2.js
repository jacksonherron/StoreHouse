import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage2 = ({handleChangeStage}) => {
    return(
        <>
            <h3>Utility</h3>
            <div className="form-group">
                <label htmlFor="utility">Utility</label>
                <Form.Control as="select" className="form-control form-control-lg">
                    <option>Pacific Gas & Electric</option>
                    <option>Southern California Edison</option>
                </Form.Control>
            </div>
            <Button id="previous" variant="secondary" onClick={handleChangeStage}>Previous</Button>
            <Button id="next" variant="secondary" onClick={handleChangeStage}>Next</Button>
        </>
    );
};

export default Stage2;