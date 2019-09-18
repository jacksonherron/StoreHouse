import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Property.css';
import Button from 'react-bootstrap/Button';
import API_URL from '../../constants';


class Property extends Component {
    state = {
        property: {},
        errors: []
    }

    componentDidMount = () => {
        const { property_id } = this.props.match.params
        axios.get(
            `${API_URL}/property/${property_id}`,
            { withCredentials: true }
        )
        .then((res) => {
            this.setState({property: res.data});
        })
        .catch((err) => console.log(err.response))
    }



    render() {
        const date = new Date(this.state.property.timestamp)
        return (
            <div className="propertyContainer">
                <h1 className="propertyTitle">{this.state.property.property_name}</h1>
                <div>Specified on: {date.toLocaleString()}</div>
                <div className="analysis">
                    <div className="monthlySavings">
                        <h2>$<span className="savings">{this.state.property.monthly_savings && this.state.property.monthly_savings.toFixed(2)}</span>/month</h2>
                        <div className="monthlySavingsDesc">Estimated savings</div>
                    </div>
                    <div className="paybackPeriod">
                        <h2><span className="period">{this.state.property.payback_period && this.state.property.payback_period.toFixed(1)}</span> years</h2>
                        <div className="paybackPeriodDescr">Estimated payback period</div>
                    </div>
                </div>
                <div className="specifications">
                    <div className="address_utility">
                        <h6>Address & Utility</h6>
                        <div className="utilityDetails">
                            <div className="specGroup">
                                <div className="label">Address:</div><div className="addressInfo">{this.state.property.address_line_1}{this.state.property.address_line_2 && ", " + this.state.property.address_line_2} <br/> {this.state.property.city}, {this.state.property.zipcode}</div>
                            </div>
                            <div className="specGroup">
                                <div className="label">Utility:</div><div>{this.state.property.utility_name}</div>
                            </div>
                            <div className="specGroup">
                                <div className="label">Tariff:</div><div>{this.state.property.tariff_name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="solar">
                        <h6>Solar System</h6>
                        <div className = "solarDetails">
                            <div className="labels">
                                <div>Capacity:</div>
                                <div>Direction:</div>
                                <div>Tilt:</div>
                                <div>Estimated cost:</div>
                            </div>
                            <div>
                                <div>{this.state.property.solar_system_kw} kW</div>
                                <div>{this.state.property.solar_system_dir}</div>
                                <div>{this.state.property.solar_system_tilt}&deg;</div>
                                <div>${this.state.property.solar_system_cost}</div>
                            </div>
                        </div>
                    </div>
                    <div className="storage">
                        <h6>Storage System</h6>
                        <div className = "storageDetails">
                            <div className="labels">
                                <div>Capacity:</div>
                                <div>Power:</div>
                                <div>Estimated cost:</div>
                            </div>
                            <div>
                                <div>{this.state.property.storage_capacity_kwh} kWh</div>
                                <div>{this.state.property.storage_power_kw} kW</div>
                                <div>${this.state.property.storage_system_cost}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="disclaimer">Disclaimer: Costs and savings presented are only estimations, and do not include factors such as investment tax credits or adjustments to your tariff that may be required after installing solar and storage technologies.</div>
                <Button className="go-back" onClick={ () => this.props.history.goBack() }>
                    Go Back
                </Button>
            </div>
        )
    }
}

export default withRouter(Property)