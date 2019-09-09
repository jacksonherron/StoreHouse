import React, { Component } from 'react';
import './Specify.css'

class Specify extends Component {
    state = {
        formData: 'empty'
    };

    render() {
        return (
            <div className="specify">
                <div className="welcome">
                    <h1>Welcome <span>Current User</span>,</h1>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default Specify;