import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dumb from '../components/dumb';
import Radium from 'radium';
import { Link, browserHistory } from 'react-router';

const styles = {
    base: {
    display: 'flex',
    justifyContent: 'flex-end',
    background: 'blue',
    border: 0,
    borderRadius: 4,
    color: 'white',
    padding: '1.5em'
  },
  rowContainer: {
    display: 'flex',
    flexFlow: 'row-nowrap',
    justifyContent: 'space-between',
  },
  colContainer: {
    display: 'flex',
    flexFlow: 'col-nowrap',
  }
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
            <div>
                <button onClick={login}>click dis button</button>
            </div>
        );
    }
}
Main = Radium(Main);



Main.propTypes = {
}

export default Main;
