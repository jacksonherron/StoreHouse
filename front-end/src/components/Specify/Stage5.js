import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage5 = ({ handleChange, handleChangeStage }) => {
    return(
        <>
            <h3>Solar System Specification</h3>
            <div className="form-group solar">
                <label htmlFor="solar_system_kw">Capacity (kW)</label>
                <Form.Control as="select" className="form-control form-control-lg">
                    <option>3</option>
                    <option>6</option>
                    <option>9</option>
                    <option>12</option>
                </Form.Control>
            </div>
            <div className="form-group solar">
                <label htmlFor="solar_system_direction">Direction facing</label>
                <Form.Control as="select" className="form-control form-control-lg">
                    <option>East</option>
                    <option>South</option>
                    <option>West</option>
                </Form.Control>
            </div>
            <div className="form-group solar">
                <label htmlFor="solar_system_tilt">Tilt (&deg;)</label>
                <Form.Control as="select" className="form-control form-control-lg">
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                </Form.Control>
            </div>
            <Button id="previous" variant="secondary" onClick={handleChangeStage}>Previous</Button>
            <Button id="next" variant="secondary" onClick={handleChangeStage}>Next</Button>
        </>
    );
};

export default Stage5;