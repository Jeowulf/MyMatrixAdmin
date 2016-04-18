import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dumb from '../components/dumb';
import Radium from 'radium';
import Feed from './feed';
import Login from './login';
import Longform from './longform';
import GraphicNovel from './graphicNovel';
import MenuAndSettings from './menuAndSettings';

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
        debugger
        this.setState({ enabled: !this.state.enabled });
    }

    componentDidMount() {
      console.log('hola')
    }

    render() {
      const
        special = this.props.special,
        toggleEnabled = this.toggleEnabled;
        return (
            <div>
                <div style={styles.rowContainer}>
                    <div style={styles.colContainer} onClick={toggleEnabled.bind(this)}>Last Day</div>
                    <div style={styles.colContainer}>Of School</div>
                </div>
                <div style={styles.rowContainer}>
                    <div style={styles.colContainer}>first</div>
                    <div style={styles.colContainer}>most</div>
                </div>
                <h1 style={styles.base}>This is the main component it is {special}</h1>
                <button onClick={onclick}></button>
                <Dumb />
                <Feed special={'special'}/>
                <Login special={'special'}/>
                <Longform special={'special'}/>
                <GraphicNovel special={'special'}/>
                <MenuAndSettings special={'special'}/>
            </div>
        );
    }
}
Main = Radium(Main);



Main.propTypes = {
    special: PropTypes.string.isRequired,
    dave: PropTypes.string,
}

export default Main;
