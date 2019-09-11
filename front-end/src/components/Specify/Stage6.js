import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage6 = ({ handleChange, handleChangeStage }) => {
    return(
        <>
            <h3>Battery System Specification</h3>
            <div className="form-group">
                <label htmlFor="battery_system">Battery System</label>
                <Form.Control as="select" className="form-control form-control-lg">
                    <option>Tesla Powerwall - 14 kWh, 5 kW</option>
                    <option>LG Chem RESU - 10 kWh, 5 kW</option>
                </Form.Control>
            </div>
            <Button id="previous" variant="secondary" onClick={handleChangeStage}>Previous</Button>
            <Button id="submit" variant="primary">Submit</Button>
        </>
    );
};

export default Stage6;