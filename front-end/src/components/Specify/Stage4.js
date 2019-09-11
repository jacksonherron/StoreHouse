import React from 'react';
import Button from 'react-bootstrap/Button';

const Stage4 = ({ handleChange, handleChangeStage, month_1_usage, month_2_usage, month_3_usage}) => {
    return(
        <>
            <h3>Last Three Months Electricity Usage in kWh</h3>
            <div className="form-group usage">
                <label htmlFor="month_1_usage">Month 1</label>
                <input type="text" id="month_1_usage" name="month_1_usage" value={month_1_usage} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group usage">
                <label htmlFor="month_2_usage">Month 2</label>
                <input type="text" id="month_2_usage" name="month_2_usage" value={month_2_usage} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group usage">
                <label htmlFor="month_3_usage">Month 3</label>
                <input type="text" id="month_3_usage" name="month_3_usage" value={month_3_usage} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <Button id="previous" variant="secondary" onClick={handleChangeStage}>Previous</Button>
            <Button id="next" variant="secondary" onClick={handleChangeStage}>Next</Button>
        </>
    );
};

export default Stage4;