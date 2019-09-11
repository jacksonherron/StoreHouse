import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Specify.css';
import API_URL from '../../constants';
import Alert from 'react-bootstrap/Alert'
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import Stage4 from './Stage4';
import Stage5 from './Stage5';
import Stage6 from './Stage6';

class Specify extends Component {
    state = {
        property_name: '',
        address_line_1: '',
        address_line_2: '', 
        city: '',
        zipcode: '',
        utility: '',
        tariff: '',
        month_1_usage: '',
        month_2_usage: '',
        month_3_usage: '',
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

    handleChangeStage = (event) => {
        if (event.target.id === "next") {
            if (this.state.stage === 6) {
                return
            }
            this.setState({ stage: this.state.stage + 1})
        }
        if (event.target.id === "previous") {
            if (this.state.stage === 1) {
                return
            }
            this.setState({ stage: this.state.stage - 1})
        }
    }
    
    handleSubmit = (event) => {
        const new_property = {
            property_name: this.state.property_name,
            address_line_1: this.state.address_line_1,
            address_line_2: this.state.address_line_2,
            city: this.state.city,
            zipcode: this.state.zipcode,
            utility: this.state.utility,
            tariff: this.state.tariff,
            month_1_usage: this.state.month_1_usage,
            month_2_usage: this.state.month_2_usage,
            month_3_usage: this.state.month_3_usage,
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
        // const currentUser = JSON.parse(this.props.currentUser);
        return (
            <div className="specify">
                <h1>New Property</h1>
                <p>Step {this.state.stage} / 6</p>
                <div>
                    {this.state.errors && this.state.errors.map((error, i) => (
                        <Alert 
                            key={i}
                            variant="danger"
                            onClose={() => {
                            let errors = this.state.errors;
                            errors.splice(i);
                            this.setState({ errors: errors })
                            }}
                            dismissible>
                            {error}
                        </Alert>
                    ))}
                    <form>
                        { this.state.stage===1 && <Stage1 handleChange={this.handleChange} handleChangeStage={this.handleChangeStage} property_name={this.state.property_name} address_line_1={this.state.address_line_1} address_line_2={this.state.address_line_2} city={this.state.city} zipcode={this.state.zipcode}/> }
                        { this.state.stage===2 && <Stage2 handleChange={this.handleChange} handleChangeStage={this.handleChangeStage} /> }
                        { this.state.stage===3 && <Stage3 handleChange={this.handleChange} handleChangeStage={this.handleChangeStage} /> }
                        { this.state.stage===4 && <Stage4 handleChange={this.handleChange} handleChangeStage={this.handleChangeStage} month_1_usage={this.state.month_1_usage} month_2_usage={this.state.month_2_usage} month_3_usage={this.state.month_3_usage}/> }
                        { this.state.stage===5 && <Stage5 handleChange={this.handleChange} handleChangeStage={this.handleChangeStage} /> }
                        { this.state.stage===6 && <Stage6 handleChange={this.handleChange} handleChangeStage={this.handleChangeStage} handleSubmit={this.handleSubmit} /> }
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Specify);