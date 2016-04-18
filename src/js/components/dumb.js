import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Dumb extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (

            <div>
                <h1>This is the Dumb component</h1>
            </div>
        );
    }
}

// Dumb.propTypes = {
// }

export default Dumb;
