import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage5 = ({ handleChange, handleChangeStage, solar_system_kw, solar_system_dir, solar_system_tilt }) => {
    return(
        <>
            <div className="form-group solar">
                <label htmlFor="solar_system_kw">Capacity (kW)</label>
                <Form.Control name="solar_system_kw" value={solar_system_kw} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                </Form.Control>
            </div>
            <div className="form-group solar">
                <label htmlFor="solar_system_dir">Direction facing</label>
                <Form.Control name="solar_system_dir" value={solar_system_dir} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="EAST">East</option>
                    <option value="SOUTH">South</option>
                    <option value="WEST">West</option>
                </Form.Control>
            </div>
            <div className="form-group solar">
                <label htmlFor="solar_system_tilt">Tilt (&deg;)</label>
                <Form.Control name="solar_system_tilt" value={solar_system_tilt} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </Form.Control>
            </div>
            <Button id="next" variant="secondary" onClick={handleChangeStage}>Next</Button>
        </>
    );
};

export default Stage5;