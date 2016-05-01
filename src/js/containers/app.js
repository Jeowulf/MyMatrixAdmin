import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { makeFunOfHim } from '../actions/crazyPerson';
import { makeHimSane } from '../actions/sanePerson';
import Main from './main.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const
            { crazyPerson, onclick, clicker, sanePerson } = this.props;
        return (
            <div>
                <Main />
            </div>
        );
    }
}

App.propTypes = {
    crazyPerson: PropTypes.object.isRequired,
    onclick: PropTypes.func.isRequired,
    sanePerson: PropTypes.object.isRequired,
    clicker: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        crazyPerson: state.crazyPerson,
        sanePerson: state.sanePerson,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onclick: () => dispatch(makeFunOfHim()),
        clicker: () => dispatch(makeHimSane()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
