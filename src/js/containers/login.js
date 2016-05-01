import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, signUp } from '../actions/adminAuth';
import Radium from 'radium';
import { Link, browserHistory } from 'react-router';
import * as Api from '../modules/serviceApi';
import * as Admin from '../actions/adminAuth';

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

        if (prevProps.admin !== this.props.admin) {
            if (this.props.admin.authenticated === true) {
                browserHistory.push('/surveyBuilder');
            }
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
        const
            email = this.state.email,
            loginAction = this.props.login,
            password = this.state.password,
            init = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          };
      fetch('http://mymatrixapidev.azurewebsites.net/users/login/admin', init)
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          if (response.ok) {
            return response.json();
          }
        })
        .then((user) => {
          loginAction(user);
        })
    }

    signUp() {
        const
            signUpUser = this.props.signUp,
            name = this.state.name,
            password = this.state.password,
            company = this.state.company,
            jobTitle = this.state.jobTitle,
            email = this.state.email,
            phone = this.state.phone,
            admin = true;

        if (name && password && company && jobTitle && email && phone) {
            signUpUser({
                name,
                password,
                company,
                jobTitle,
                email,
                phone,
                admin
            });
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
        admin = this.props.admin,
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
            <div>Welcome: {admin.userInfo.name}</div>
                {selectedView}
            </div>
        );
    }
}
//required to allow the inline styling using radium
Login = Radium(Login);

Login.propTypes = {
    login: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (userInfo) => dispatch(login(userInfo)),
        signUp: ({
                name,
                password,
                company,
                jobTitle,
                email,
                phone,
                admin,
            }) => dispatch(signUp({
                name,
                password,
                company,
                jobTitle,
                email,
                phone,
                admin,
            })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
