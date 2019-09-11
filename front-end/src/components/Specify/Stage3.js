import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage3 = ({ handleChange, handleChangeStage }) => {
    return(
        <>
            <h3>Tariff</h3>
            <div className="form-group">
                <label htmlFor="tariff">Tariff</label>
                <Form.Control as="select" className="form-control form-control-lg">
                    <option>E1</option>
                    <option>E1-T</option>
                    <option>E2</option>
                </Form.Control>
            </div>
            <Button id="previous" variant="secondary" onClick={handleChangeStage}>Previous</Button>
            <Button id="next" variant="secondary" onClick={handleChangeStage}>Next</Button>
        </>
    );
};

export default Stage3;