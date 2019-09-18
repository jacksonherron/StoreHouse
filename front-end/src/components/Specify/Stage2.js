import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Stage2 = ({ handleChange, handleSubmit2, utility, utilities }) => {      
    let options = []
    
    utilities.forEach((u, i) => {
        options.push(<option key={i} value={i}>{u.name}</option>)
    })

    return(
        <>
            <div className="form-group utility">
                <label htmlFor="utility">Utility*</label>
                <Form.Control name="utility" value={utility} onChange={handleChange} as="select" className="form-control form-control-lg">
                    {options}
                </Form.Control>
            </div>
            <div className="required">(* indicates required)</div>
            <Button id="next" variant="secondary" onClick={handleSubmit2}>Next</Button>
        </>
    );
};

export default Stage2;