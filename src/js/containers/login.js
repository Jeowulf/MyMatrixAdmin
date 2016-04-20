import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Link, browserHistory } from 'react-router';
import * as Api from '../modules/serviceApi';

const styles = {
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column nowrap',
        height: '100vh',
        justifyContent: 'center',
    },
    inputRows: {
        display: 'flex',
    },
    signUpContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
    },
    loginContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
    },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminLoggedIn: false,
            name: null,
            password: null,
            company: null,
            jobTitle: null,
            email: null,
            phone: null,
            admin: null,
            selectedView: 'welcomeView',
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.adminLoggedIn === true) {
             browserHistory.push('/surveyBuilder');
        }

        if (prevState.name !== this.state.name) {
            // console.log(this.state.name);
        }
    }

    componentWillUnmount() {
    }

    signUpClick() {
        this.setState({ selectedView: 'signUpView' })
    }

    loginClick() {
        this.setState({ selectedView: 'loginView' })
    }

    login() {
        Api.loginUser(
            this.state.email,
            this.state.password
        );
    }

    signUp() {
        if (this.state.name && this.state.password && this.state.company && this.state.jobTitle && this.state.email && this.state.phone) {
            Api.signUp(
                this.state.name,
                this.state.password,
                this.state.company,
                this.state.jobTitle,
                this.state.email,
                this.state.phone,
                true
            );
        }
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleCompanyChange(event) {
        this.setState({company: event.target.value});
    }

    handleJobTitleChange(event) {
        this.setState({jobTitle: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePhoneChange(event) {
        this.setState({phone: event.target.value});
    }

    // handleAdminChange(event) {
    //     this.setState({admin: event.target.value});
    // }


    render() {

      const
        handleNameChange = this.handleNameChange.bind(this),
        handlePasswordChange = this.handlePasswordChange.bind(this),
        handleCompanyChange = this.handleCompanyChange.bind(this),
        handleJobTitleChange = this.handleJobTitleChange.bind(this),
        handleEmailChange = this.handleEmailChange.bind(this),
        handlePhoneChange = this.handlePhoneChange.bind(this),
        // handleAdminChange = this.handleAdminChange.bind(this),
        signUpClick = this.signUpClick.bind(this),
        loginClick = this.loginClick.bind(this),
        signUp = this.signUp.bind(this),
        login = this.login.bind(this);

        let
            welcomeView = (
                <div>
                    <button onClick={loginClick}>Login</button>
                    <div>or</div>
                    <button onClick={signUpClick}>Sign Up</button>
                </div>
            ),
            loginView = (
                <div style={styles.loginContainer}>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='email' value={this.state.email} onChange={handleEmailChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='password' value={this.state.password} onChange={handlePasswordChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <button onClick={login}>Log In</button>
                    </div>
                </div>
            ),
            signUpView = (
                <div style={styles.signUpContainer}>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='name' value={this.state.name} onChange={handleNameChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='password' value={this.state.password} onChange={handlePasswordChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='company' value={this.state.company} onChange={handleCompanyChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='title' value={this.state.jobTitle} onChange={handleJobTitleChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='email' value={this.state.email} onChange={handleEmailChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <input type="text" placeholder='phone' value={this.state.phone} onChange={handlePhoneChange} />
                    </div>
                    <div style={styles.inputRows}>
                        <button onClick={signUp}>Create Account</button>
                    </div>
                </div>
            ),
            selectedView = null;

        switch(this.state.selectedView) {
            case 'loginView':
                selectedView = loginView;
                break;
            case 'signUpView':
                selectedView = signUpView;
                break;
            default:
                selectedView = welcomeView;
                break;
        }

        return (
            <div style={styles.mainContainer}>
                {selectedView}
            </div>
        );
    }
}
//required to allow the inline styling using radium
Login = Radium(Login);

//define your incoming props
Login.propTypes = {
}

export default Login;
