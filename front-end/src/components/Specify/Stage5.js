import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage5 = ({ handleChange, handleSubmit5, solar_system_kw, solar_system_dir, solar_system_tilt }) => {
    return(
        <>
            <div className="form-group solar">
                <label htmlFor="solar_system_kw">Number of panels</label>
                <Form.Control name="solar_system_kw" value={solar_system_kw} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="0.3">1</option>
                    <option value="0.6">2</option>
                    <option value="0.9">3</option>
                    <option value="1.2">4</option>
                    <option value="1.5">5</option>
                    <option value="1.8">6</option>
                    <option value="2.1">7</option>
                    <option value="2.4">8</option>
                </Form.Control>
            </div>
            <div className="form-group solar">
                <label htmlFor="solar_system_dir">Direction facing</label>
                <Form.Control name="solar_system_dir" value={solar_system_dir} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="SOUTH">South</option>
                    <option value="EAST">East</option>
                    <option value="WEST">West</option>
                </Form.Control>
            </div>
            <div className="form-group solar">
                <label htmlFor="solar_system_tilt">Tilt (&deg;)</label>
                <Form.Control name="solar_system_tilt" value={solar_system_tilt} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                </Form.Control>
            </div>
            <Button id="next" variant="secondary" onClick={handleSubmit5}>Next</Button>
        </>
    );
};

export default Stage5;