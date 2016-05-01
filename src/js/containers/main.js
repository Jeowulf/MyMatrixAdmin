import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Link, browserHistory } from 'react-router';

const styles = {
    mainContainer: {
        height: '100vh',
        width: '100vw',
    },
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          enabled: true,
        };
    }

    toggleEnabled() {
        this.setState({ enabled: !this.state.enabled });
    }

    componentDidMount() {
    }

    login() {
      browserHistory.push('/login');
    }

    render() {
      const
        login = this.login;
        return (
            <div onClick={login}>
                <div>Welcome to the MyMatrix Admin App</div>
            </div>
        );
    }
}
Main = Radium(Main);



Main.propTypes = {
}

export default Main;
