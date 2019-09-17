import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const Stage6 = ({ handleChange, handleSubmit6, submit6, customer_class, battery_system }) => {
    return(
        <>
            {submit6 === true && <Alert variant="warning">Submitted! Hang tight, this will take a few minutes to process.</Alert>} 
            <div className="form-group battery">
                <label htmlFor="battery_system">Battery System</label>
                <Form.Control name="battery_system" value={battery_system} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value='0' >No storage</option>
                    {customer_class === 'residential' && <option value="1" >LG Chem RESU - 10 kWh (capacity), 5 kW (power)</option>}
                    {customer_class === 'residential' && <option value="2" >Tesla Powerwall - 13.5 kWh (capacity), 5 kW (power)</option>}
                    {customer_class === 'residential' && <option value="3" >Two (2) LG Chem RESU - 20 kWh (capacity), 10 kW (power)</option>}
                    {customer_class === 'residential' && <option value="4" >Two (2) Tesla Powerwall - 27 kWh (capacity), 10 kW (power)</option>}
                    {customer_class === 'commercial' && <option value='3' >20 kWh (capacity), 10 kW (power)</option>}
                    {customer_class === 'commercial' && <option value='5' >50 kWh (capacity), 20 kW (power)</option>}
                    {customer_class === 'commercial' && <option value='6' >120 kWh (capacity), 40 kW (power)</option>}
                    {customer_class === 'commercial' && <option value='7' >240 kWh (capacity), 60 kW (power)</option>}
                </Form.Control>
            </div>
            <Button id="submit" variant="primary" onClick={handleSubmit6}>Submit</Button>
        </>
    );
};

export default Stage6;