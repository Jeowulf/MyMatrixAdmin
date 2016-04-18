import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

//define your styling with Javascript objects
//use flexbox for styling "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
const styles = {
    mainComponent: {
        backgroundColor: 'blue',
    },
    firstStyle: {
        backgroundColor: 'red',
    },
    secondStyle: {
        backgroundColor: 'purple',
    },
};

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: true,
        };
    }
    //set component initial state above

    //custom functions here- use this.setState() to change the state of the app
    toggleEnabled() {
        this.setState({ enabled: !this.state.enabled });
    }

    whichStyle() {
        if (this.state.enabled === true) {
            return styles.firstStyle;
        } else {
            return styles.secondStyle;
        }
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
        //define your content- JSX variables and dynamic JSX
      const
        special = this.props.special,
        toggleEnabled = this.toggleEnabled,
        mainStyle = this.whichStyle();
        //return your JSX with defined content (anything in the render method occurs anytime a change occurs, to limit rerendering add changes to component lifecycle)
        //bind your functions to allow them access to the this functionality
        return (
            <div style={mainStyle} onClick={toggleEnabled.bind(this)}>
                Your component build goes here
            </div>
        );
    }
}
//required to allow the inline styling using radium
Feed = Radium(Feed);

//define your incoming props
Feed.propTypes = {
    special: PropTypes.string.isRequired,
}

export default Feed;
