import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage2 = ({ handleChange, handleChangeStage, utility }) => {
    return(
        <>
            <div className="form-group utility">
                <label htmlFor="utility">Utility</label>
                <Form.Control name="utility" value={utility} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="PGE" >Pacific Gas & Electric</option>
                    <option value="SCE" >Southern California Edison</option>
                </Form.Control>
            </div>
            <Button id="previous" variant="secondary" onClick={handleChangeStage}>Previous</Button>
            <Button id="next" variant="secondary" onClick={handleChangeStage}>Next</Button>
        </>
    );
};

export default Stage2;