import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage3 = ({ handleChange, handleSubmit3, tariffs, tariff }) => {
    let options = []
    
    tariffs.forEach((t, i) => {
        options.push(<option key={i} value={t.masterTariffId}>{t.tariffCode}</option>)
    })

    return(
        <>
            <div className="form-group tariff">
                <label htmlFor="tariff">Tariff</label>
                <Form.Control name="tariff" value={tariff} onChange={handleChange} as="select" className="form-control form-control-lg">
                    {options}
                </Form.Control>
            </div>
            <Button id="next" variant="secondary" onClick={handleSubmit3}>Next</Button>
        </>
    );
};

export default Stage3;