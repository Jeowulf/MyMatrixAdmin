import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as Api from '../modules/serviceApi';
import { getSurveys, getResponses } from '../actions/survey';
import { Link, browserHistory } from 'react-router';
import Surveys from '../components/surveys';

//define your styling with Javascript objects
//use flexbox for styling "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
const styles = {
    mainContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    buildOptions: {
        display: 'flex',
        flexFlow: 'column nowrap',
    }
};

class SurveyBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveysComponent: false,
            createSurveyComponent: false,
            surveyName: null,
            preEvent: false,
            authToken: null,
        };
    }

    getSurveys() {
        this.props.getSurveys();
    }

    getResponses({ auth, surveyId }) {
         this.props.getResponses({ auth, surveyId });
    }

    handleNameChange(event) {
        this.setState({surveyName: event.target.value});
    }

    handlePreEventClick(event) {
        this.setState({preEvent: !this.state.preEvent});
    }

    enterCreateSurveyMode() {
        this.setState({ createSurveyComponent: !this.state.createSurveyComponent })
    }

    createSurvey() {
        const
            name = this.state.surveyName,
            preEvent = this.state.preEvent,
            authToken = this.state.authToken;

        Api.createSurvey(name, preEvent, authToken);
    }



    componentWillMount() {
    }

    componentDidMount() {
        if (this.props.admin.authenticated) {
            this.setState({ authToken: this.props.admin.userInfo.token });
        }
    }

    componentWillReceiveProps() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.surveys !== prevProps.surveys) {
            this.setState({ surveysComponent: !this.state.surveysComponent });
        }
        if (this.props.admin.authenticated && this.props.admin.authenticated !== prevProps.admin.authenticated) {
            this.setState({ authToken: this.props.admin.userInfo.token });
        }
    }

    componentWillUnmount() {
    }

    render() {
        const
            { surveys, admin } = this.props,
            handleNameChange = this.handleNameChange.bind(this),
            handlePreEventClick = this.handlePreEventClick.bind(this),
            getSurveys = this.getSurveys.bind(this),
            getResponses = this.getResponses.bind(this),
            responses = this.props.responses,
            createSurvey = this.createSurvey.bind(this),
            preEvent = this.state.preEvent,
            enterCreateSurveyMode = this.enterCreateSurveyMode.bind(this);

        let
            surveysComponent = (<div></div>),
            getSurveysButton = this.state.surveysComponent ? 'hide surveys' : 'get surveys',
            createSurveyComponent = (<div></div>),
            createSurveyButton = this.state.createSurveyComponent ? 'exit create survey' : 'create survey';

        if (this.state.surveysComponent) {
            surveysComponent = (
                <div>
                    <Surveys surveyList={surveys} admin={admin} getSurveys={getSurveys} getResponses={getResponses} responses={responses} />
                </div>
            );
        }

        if (this.state.createSurveyComponent) {
            createSurveyComponent = (
                <div>
                    <div>
                       <input type="text" placeholder='survey name' value={this.state.surveyName} onChange={handleNameChange}></input>
                    </div>
                    <div>
                       <label><input type="checkbox" checked={preEvent} onChange={handlePreEventClick}/>Check this box if creating a pre-event survey</label>
                    </div>
                    <div onClick={createSurvey}>create survey</div>
                </div>
            );
        }

        return (
            <div style={styles.mainContainer}>
                <div>Welcome to the Survey Builder!</div>
                <div style={styles.buildOptions}>
                    <button onClick={getSurveys}>{getSurveysButton}</button>
                    {surveysComponent}
                </div>
                <div style={styles.buildOptions}>
                    <button onClick={enterCreateSurveyMode}>{createSurveyButton}</button>
                    {createSurveyComponent}
                </div>
            </div>
        );
    }
}
SurveyBuilder = Radium(SurveyBuilder);

SurveyBuilder.propTypes = {
    surveys: PropTypes.object,
    admin: PropTypes.object,
    getSurveys: PropTypes.func,
    getResponses: React.PropTypes.func.isRequired,
    responses: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        surveys: state.surveys,
        admin: state.admin,
        responses: state.responses,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSurveys: () => dispatch(getSurveys()),
        getResponses: ({ auth, surveyId }) => dispatch(getResponses({ auth, surveyId })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyBuilder);
