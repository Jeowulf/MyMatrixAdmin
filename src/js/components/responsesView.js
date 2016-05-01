import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as ServiceApi from '../modules/serviceApi';

const styles = {
    mainComponent: {
        backgroundColor: 'blue',
    },
};

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <div>
                Your component build goes here
            </div>
        );
    }
}

Feed = Radium(Feed);

Feed.propTypes = {
}

export default Feed;
