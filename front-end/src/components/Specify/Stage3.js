import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage3 = ({ handleChange, handleChangeStage, tariff }) => {
    return(
        <>
            <div className="form-group tariff">
                <label htmlFor="tariff">Tariff</label>
                <Form.Control name="tariff" value={tariff} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="E1">E1</option>
                    <option value="E1-T">E1-T</option>
                    <option value="E2">E2</option>
                </Form.Control>
            </div>
            <Button id="next" variant="secondary" onClick={handleChangeStage}>Next</Button>
        </>
    );
};

export default Stage3;