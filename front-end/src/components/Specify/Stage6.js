import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage6 = ({ handleChange, handleSubmit, handleChangeStage, battery_system }) => {
    return(
        <>
            <div className="form-group battery">
                <label htmlFor="battery_system">Battery System</label>
                <Form.Control name="battery_system" value={battery_system} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="1" >Tesla Powerwall (14 kWh, 5 kW)</option>
                    <option value="2" >LG Chem RESU (10 kWh, 5 kW)</option>
                </Form.Control>
            </div>
            <Button id="previous" variant="secondary" onClick={handleChangeStage}>Previous</Button>
            <Button id="submit" variant="primary" onClick={handleSubmit}>Submit</Button>
        </>
    );
};

export default Stage6;