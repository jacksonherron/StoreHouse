import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Stage1 = ({ handleChange, handleSubmit1, property_name, address_line_1, address_line_2, city, zipcode, customer_class }) => {
    return(
        <>
            <div className="form-group address">
                <label htmlFor="property_name">Property Name</label>
                <input type="text" id="property_name" name="property_name" value={property_name} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group address">
                <label htmlFor="address_line_1">Address Line 1</label>
                <input type="text" id="address_line_1" name="address_line_1" value={address_line_1} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group address">
                <label htmlFor="address_line_2">Address Line 2</label>
                <input type="text" id="address_line_2" name="address_line_2" value={address_line_2} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group address">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={city} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group zip">
                <label htmlFor="zipcode">Zip Code</label>
                <input type="text" id="zipcode" name="zipcode" value={zipcode} onChange={handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group utility">
            <label htmlFor="utility">Utility</label>
                <Form.Control name="customer_class" value={customer_class} onChange={handleChange} as="select" className="form-control form-control-lg">
                    <option value="residential" >Residential</option>
                    <option value="commercial" >Commercial</option>
                </Form.Control>
            </div>
            <Button id="next" variant="secondary" onClick={handleSubmit1}>Next</Button>
        </>
    );
};

export default Stage1;