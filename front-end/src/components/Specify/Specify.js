import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Specify.css';
import API_URL from '../../constants';

class Specify extends Component {
    state = {
        property_name: '',
        address_line_1: '',
        address_line_2: '', 
        address_line_3: '',
        utility: '',
        tariff: '',
        solar_system: '',
        battery_system: '',
        errors: [],
        stage: 1
    };

    handleChange = (event) => {
            this.setState({
            [event.target.name]: event.target.value,
            });
        };
    
      handleSubmit = (event) => {
        const new_property = {
            property_name: this.state.property_name,
            address_line_1: this.state.address_line_1,
            address_line_2: this.state.address_line_2, 
            address_line_3: this.state.address_line_3,
            utility: this.state.utility,
            tariff: this.state.tariff,
            solar_system: this.state.solar_system,
            battery_system: this.state.battery_system,
            monthly_savings: 145.32,
            payback_period: 5.67,
            user_id: this.props.currentUser.id,
        }
    
        axios.post(`${API_URL}/specify`, new_property)
            .then(() => this.props.history.push('/home'))
            .catch(err => console.log(err));
      };

    render() {
        const currentUser = JSON.parse(this.props.currentUser);
        return (
            <div className="specify">
                <div className="welcome">
                    <h1>{currentUser.first_name} {currentUser.last_name}</h1>
                </div>
                <div>
                    {this.state.errors && this.state.errors.map((e, i) => (
                        <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert" key={i}>
                            {e.message}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    ))}
                    <form>
                        <div className="form-group">
                            <label htmlFor="property_name">Name</label>
                            <input type="text" id="property_name" name="property_name" value={this.state.property_name} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_line_1">Line 1</label>
                            <input type="text" id="address_line_1" name="address_line_1" value={this.state.address_line_1} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_line_2">Line 2</label>
                            <input type="text" id="address_line_2" name="address_line_2" value={this.state.address_line_2} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_line_3">Line 3</label>
                            <input type="text" id="address_line_3" name="address_line_3" value={this.state.address_line_3} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="utility">Utility</label>
                            <input type="text" id="utility" name="utility" value={this.state.utility} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tariff">Tariff</label>
                            <input type="text" id="tariff" name="tariff" value={this.state.tariff} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="solar_system">Solar System</label>
                            <input type="text" id="solar_system" name="solar_system" value={this.state.solar_system} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="battery_system">Battery System</label>
                            <input type="text" id="battery_system" name="battery_system" value={this.state.battery_system} onChange={this.handleChange} className="form-control form-control-lg" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Specify);