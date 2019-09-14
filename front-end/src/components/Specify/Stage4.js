import React from 'react';
import Button from 'react-bootstrap/Button';

const Stage4 = ({ handleChange, handleSubmit4, month_1_usage, month_2_usage, month_3_usage}) => {
    return(
        <>
            <div className="form-group usage">
                <label htmlFor="month_1_usage">Month 1 (kWh)</label>
                <input type="text" id="month_1_usage" name="month_1_usage" value={month_1_usage} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group usage">
                <label htmlFor="month_2_usage">Month 2 (kWh)</label>
                <input type="text" id="month_2_usage" name="month_2_usage" value={month_2_usage} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group usage">
                <label htmlFor="month_3_usage">Month 3 (kWh)</label>
                <input type="text" id="month_3_usage" name="month_3_usage" value={month_3_usage} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <Button id="next" variant="secondary" onClick={handleSubmit4}>Next</Button>
        </>
    );
};

export default Stage4;