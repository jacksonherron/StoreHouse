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
        customer_class: 'residential',
        utilities: [],
        utility: '',
        tariff: '',
        tariffs: [],
        month_1_usage: '',
        month_2_usage: '',
        month_3_usage: '',
        electricity_profile_id: '',
        solar_system_kw: '',
        solar_system_dir: 'SOUTH',
        solar_system_tilt: '20',
        solar_profile_id: '',
        battery_system: '0',
        provider_account_id: '',
        errors: [],
        stage: 1,
        submit1: false,
        submit2: false,
        submit3: false,
        submit4: false,
        submit5: false,
        submit6: false,
    };

    stages = ['Site', 'Utility', 'Tariff', 'Electricity Usage', 'Solar System Specification', 'Battery System Specification']

    handleChange = (event) => {
            this.setState({
            [event.target.name]: event.target.value,
            });
        };

    handleChangeStage = (event) => {
        if (this.state.stage === 6) {
            return
        }
        return this.setState({ stage: this.state.stage + 1})
    }

    handleSubmit1 = () => {
        if (this.state.submit1 === false){
            this.setState({submit1: true})
            const currentUser = JSON.parse(this.props.currentUser);
            const new_property = {
                property_name: this.state.property_name,
                address_line_1: this.state.address_line_1,
                address_line_2: this.state.address_line_2,
                city: this.state.city,
                zipcode: this.state.zipcode,
                customer_class: this.state.customer_class,
                user_id: currentUser.id
            }
            axios.post(
                `${API_URL}/specify/1`, 
                new_property,
                { withCredentials: true }
                )
                .then(res => {
                    if (res.data.status === "400"){
                        this.setState({
                            errors: ["The request failed. Please edit the form and try again."],
                            submit1: false
                        })
                    }
                    const response_data = JSON.parse(res.data.utilities)
                    const utilities = response_data.results
                    let solar_size_default = 0.6
                    if (this.state.customer_class === 'commercial'){
                        solar_size_default = 3;
                    };
                    this.setState({
                        stage: this.state.stage + 1,
                        provider_account_id: res.data.provider_account_id,
                        utility: utilities[0].lseId,
                        utilities: utilities,
                        solar_system_kw: solar_size_default,
                        errors: []
                    });
                })
                .catch(err => console.log(err));
        }
    }

    handleSubmit2 = () => {
        if (this.state.submit2 === false){
            this.setState({submit2: true})
            const data = {
                provider_account_id: this.state.provider_account_id,
                lseId: this.state.utility
            }
            axios.post(
                `${API_URL}/specify/2`, 
                data,
                { withCredentials: true }
                )
                .then(res => {
                    if (res.data.status === "400"){
                        this.setState({
                            errors: ["The request failed. Please select a different utility."],
                            submit2: false
                        })
                    }
                    this.setState({
                        stage: this.state.stage + 1,
                        tariff: res.data[0].masterTariffId,
                        tariffs: res.data,
                        errors: []
                    });
                })
                .catch(err => console.log(err));
        };
    };

    handleSubmit3 = () => {
        if (this.state.submit3 === false){
            this.setState({submit3: true})
            const data = {
                provider_account_id: this.state.provider_account_id,
                master_tariff_id: this.state.tariff
            }
            axios.post(
                `${API_URL}/specify/3`, 
                data,
                { withCredentials: true }
                )
                .then((res) => {
                    if (res.data.status === "400"){
                        this.setState({
                            errors: ["The request failed. Please select a different tariff."],
                            submit3: false
                        })
                    }
                    this.setState({
                        stage: this.state.stage + 1,
                        errors: []
                    });
                })
                .catch(err => console.log(err));
        }
    }

    handleSubmit4 = () => {
        if (this.state.submit4 === false){
            this.setState({submit4: true})
            const data = {
                provider_account_id: this.state.provider_account_id,
                month_1_usage: this.state.month_1_usage,
                month_2_usage: this.state.month_2_usage,
                month_3_usage: this.state.month_3_usage
            }
            axios.post(
                `${API_URL}/specify/4`, 
                data,
                { withCredentials: true }
                )
                .then((res) => {
                    if (res.data.status === "400"){
                        this.setState({
                            errors: ["The request failed. Please try again."],
                            submit4: false
                        })
                    }
                    const electricity_profile_id = res.data.results[0].providerProfileId
                    this.setState({
                        electricity_profile_id: electricity_profile_id,
                        stage: this.state.stage + 1,
                        errors: []
                    });
                })
                .catch(err => console.log(err));
        };
    };

    handleSubmit5 = () => {
        if (this.state.submit5 === false){
            this.setState({submit5: true})
            const data = {
                provider_account_id: this.state.provider_account_id,
                solar_system_kw: this.state.solar_system_kw,
                solar_system_dir: this.state.solar_system_dir,
                solar_system_tilt: this.state.solar_system_tilt
            }
            axios.post(
                `${API_URL}/specify/5`, 
                data,
                { withCredentials: true }
                )
                .then((res) => {
                    if (res.data.status === "400"){
                        this.setState({
                            errors: ["The request failed. Please try again."],
                            submit5: false
                        })
                    }
                    const solar_profile_id = res.data.results[0]["providerProfileId"]
                    this.setState({
                        solar_profile_id: solar_profile_id,
                        stage: this.state.stage + 1,
                        errors: []
                    });
                })
                .catch(err => console.log(err));
        };
    };

    handleSubmit6 = () => {
        if (this.state.submit6 === false){
            this.setState({submit6: true})
            const data = {
                provider_account_id: this.state.provider_account_id,
                storage_system: this.state.battery_system
            }
            axios.post(
                `${API_URL}/specify/6`, 
                data,
                { withCredentials: true },
                )
                .then((res) => {
                    if (res.data.status === "400"){
                        this.setState({
                            errors: ["The request failed. Please try again."],
                            submit6: false
                        });
                    } else {
                        this.props.history.push('/home');
                    };
                })
                .catch(err => console.log(err));
        };
    };;

    render() {
        return (
            <div className="specify">
                <h1>New Property</h1>
                <h2>{this.stages[this.state.stage-1]}</h2>
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
                        { this.state.stage===1 && <Stage1 handleChange={this.handleChange} handleSubmit1={this.handleSubmit1}/> }
                        { this.state.stage===2 && <Stage2 handleChange={this.handleChange} handleSubmit2={this.handleSubmit2} utilities={this.state.utilities}/> }
                        { this.state.stage===3 && <Stage3 handleChange={this.handleChange} handleSubmit3={this.handleSubmit3} tariffs={this.state.tariffs} /> }
                        { this.state.stage===4 && <Stage4 handleChange={this.handleChange} handleSubmit4={this.handleSubmit4} /> }
                        { this.state.stage===5 && <Stage5 handleChange={this.handleChange} handleSubmit5={this.handleSubmit5} customer_class={this.state.customer_class} /> }
                        { this.state.stage===6 && <Stage6 handleChange={this.handleChange} handleSubmit6={this.handleSubmit6} submit6={this.state.submit6} customer_class={this.state.customer_class} /> }
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Specify);