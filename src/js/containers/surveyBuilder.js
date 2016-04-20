import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as Api from '../modules/serviceApi';

//define your styling with Javascript objects
//use flexbox for styling "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
const styles = {
    mainComponent: {
        backgroundColor: 'blue',
    },
};

class SurveyBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyId: null,
            name: null,
            preEvent: null,
            auth: "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoianVzdGluIGphY290IiwiUGFzc3dvcmQiOiJyMVdwVk15cThDY2EyNEhLcFB0THNXYXcraDZ2WnVuZHYyQzUzcUtKV2RJPSIsIkNvbXBhbnkiOiJtYXRyaXgiLCJKb2JUaXRsZSI6ImJvc3Mgb2YgZXZlcnl0aGluZyIsIkVtYWlsIjoianVzdGluLmphY290QG1hdHJpeHJlcy5jb20iLCJQaG9uZSI6Iig3NzApIDgyNi00NzI5IiwiSWQiOjQsIkFkbWluIjp0cnVlLCJSZXNwb25zZXMiOltdLCJVc2VyQXV0aGVudGljYXRpb25zIjpbXSwiVXNlckV2ZW50cyI6W10sIlVzZXJTdXJ2ZXlzIjpbXX0.NwX6BX_QjEPpe1m-bsSnqpAV8M_6vidJgXdZEB1qyRe_0MAYfbR4f4W_e0xZT2VR",
            questions: [],
            questionId: null,
        };
    }

    getSurveys() {
        const
            name = this.state.name,
            preEvent = this.state.preEvent,
            auth = this.state.auth,
            surveyId = this.state.surveyId,
            questions = this.state.questions,
            questionId = this.state.questionId;
    }

    deleteSurvey() {
        const
            auth = this.state.auth,
            surveyId = this.state.surveyId;

        Api.deleteSurvey(surveyId, auth);
    }

    createSurvey() {
        const
            name = this.state.name,
            preEvent = this.state.preEvent,
            auth = this.state.auth;

        Api.createSurvey(name, preEvent, auth);
    }

    updateSurvey() {
        const
            name = this.state.name,
            preEvent = this.state.preEvent,
            auth = this.state.auth,
            surveyId = this.state.surveyId;

        Api.updateSurvey(name, preEvent, surveyId, auth);
    }

    addQuestionToSurvey() {
        const
            auth = this.state.auth,
            surveyId = this.state.surveyId,
            questions = this.state.questions;

        Api.addQuestionToSurvey(surveyId, questions, auth);
    }

    updateQuestionsForSurvey() {
        const
            auth = this.state.auth,
            surveyId = this.state.surveyId,
            questions = this.state.questions,
            questionId = this.state.questionId;

        Api.updateQuestionsForSurvey(surveyId, questions, auth, questionId);
    }

    deleteQuestionFromSurvey() {
        const
            name = this.state.name,
            preEvent = this.state.preEvent,
            auth = this.state.auth,
            surveyId = this.state.surveyId,
            questions = this.state.questions,
            questionId = this.state.questionId;
    }

    getSurveyResponses() {
        const
            auth = this.state.auth,
            surveyId = this.state.surveyId;

        Api.getSurveyResponses(surveyId, auth);
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
        const
            getSurveys = this.getSurveys.bind(this),
            deleteSurvey = this.deleteSurvey.bind(this),
            createSurvey = this.createSurvey.bind(this),
            updateSurvey = this.updateSurvey.bind(this),
            addQuestionToSurvey = this.addQuestionToSurvey.bind(this),
            updateQuestionsForSurvey = this.updateQuestionsForSurvey.bind(this),
            deleteQuestionFromSurvey = this.deleteQuestionFromSurvey.bind(this),
            getSurveyResponses = this.getSurveyResponses.bind(this);

        return (
            <div>
                <button onClick={getSurveys}>getSurveys</button>
                <button onClick={createSurvey}>createSurvey</button>
                <button onClick={updateSurvey}>updateSurvey</button>
                <button onClick={deleteSurvey}>deleteSurvey</button>
                <button onClick={addQuestionToSurvey}>addQuestionToSurvey</button>
                <button onClick={updateQuestionsForSurvey}>updateQuestionsForSurvey</button>
                <button onClick={deleteQuestionFromSurvey}>deleteQuestionFromSurvey</button>
                <button onClick={getSurveyResponses}>getSurveyResponses</button>
            </div>
        );
    }
}
//required to allow the inline styling using radium
SurveyBuilder = Radium(SurveyBuilder);

//define your incoming props
SurveyBuilder.propTypes = {
}

export default SurveyBuilder;
