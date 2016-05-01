import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as ServiceApi from '../modules/serviceApi';
import { Link, browserHistory } from 'react-router';

const styles = {
    mainComponent: {
        backgroundColor: 'blue',
    },
};

class ResponsesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: [],
            survey: {},
        };
    }

    componentWillMount() {

        const
            survey = this.props.surveys.surveys.find((s) => {
                return s.id === this.props.responses.responses.surveyId;
            });

        this.setState({ survey });

        //     responseIds = [],
        //     responses = [],
        //     responsesMap = this.props.responses.responses.answers.forEach((answer, idx) => {
        //         if (responseIds.indexOf(answer.questionId) === -1) {
        //             responseIds.push(answer.questionId);

        //             responses.push({
        //                 questionId: answer.questionId,
        //                 value: answer.value,
        //                 timesSelected: 1,
        //             });
        //         } else {
        //             const
        //                 soughtResponse = responses.find((r, idx) => {
        //                     return r.questionId = answer.questionId;
        //                 }),
        //                 newTimesSelected = soughtResponse.timesSelected + 1;
        //                 //todo compare values before incrementing- fix incrementor
        //             responses.splice(responses.indexOf(soughtResponse), 1, {
        //                 questionId: answer.questionId,
        //                 value: answer.value,
        //                 timesSelected: newTimesSelected,
        //             });
        //         }
        //     });
        //     this.setState({ responses });
    }

    componentDidMount() {
        const
            answers = this.props.responses.responses.answers,
            survey = this.state.survey,
            surveyQuestionsArray = survey.questions;

        answers.forEach((a, idx) => {
            const
                soughtQuestion = surveyQuestionsArray.find((q) => {
                    return a.questionId === q.id;
                }),
                options = soughtQuestion.answer.options,
                index = surveyQuestionsArray.indexOf(soughtQuestion),
                chosenOption = options.find((o) => {
                    console.log(idx);
                    return o.display === a.value;
                }),
                chosenOptionIndex = options.indexOf(chosenOption),
                type = soughtQuestion.answer.type;

            if (type === 'textBox') {
                let
                    responses = soughtQuestion.answer.responses,
                    newAnswer;

                if (responses) {
                    newAnswer = soughtQuestion.answer;
                    newAnswer.responses.push(a.value);
                } else {
                    newAnswer = Object.assign(soughtQuestion.answer, { responses: [] });
                    newAnswer.responses.push(a.value);
                }

                surveyQuestionsArray.splice(index, 1, {
                    answer: newAnswer,
                    id: soughtQuestion.id,
                    text: soughtQuestion.text
                });
            } else {
                let newOptions = options;

                if (newOptions[0].timesSelected >= 0) {
                    newOptions[chosenOptionIndex].timesSelected = newOptions[chosenOptionIndex].timesSelected + 1;
                } else {
                    newOptions = newOptions.map((o) => {
                        return Object.assign(o, { timesSelected: 0 });
                    });
                    newOptions[chosenOptionIndex].timesSelected = newOptions[chosenOptionIndex].timesSelected + 1;
                }

                surveyQuestionsArray.splice(index, 1, {
                    answer: {
                        id: soughtQuestion.answer.id,
                        type: soughtQuestion.answer.type,
                        options: newOptions,
                    },
                    id: soughtQuestion.id,
                    text: soughtQuestion.text
                });
            }
        })
        this.setState({
            survey: {
                id: survey.id,
                name: survey.name,
                preEvent: survey.preEvent,
                questions: surveyQuestionsArray,
            }
        });
    }

    componentWillReceiveProps() {
    }

    componentDidUpdate() {
        console.log('survey', this.state.survey)
    }

    componentWillUnmount() {
    }

    returnToSurveyOptions() {
        browserHistory.push('/surveyBuilder');
    }

    findSelectedAmount() {
    }

    render() {
        const
            returnToSurveyOptions = this.returnToSurveyOptions.bind(this),
            survey = this.state.surveys.find((s) => {
                return s.id === this.props.responses.responses.surveyId;
            }),
            questions = survey.questions.map((question) => {
                return (
                    <div>
                        <div>text: {question.text}</div>
                        <div>id: {question.id}</div>
                        <div>type: {question.type}</div>
                        <div>Answer id: {question.answer.id}</div>
                        <div>Options:</div>
                        <div>answer choices: {
                            question.answer.options.map((o, idx) => {
                                return (
                                    <div>
                                        <div>Option number {idx + 1}:</div>
                                        <div>{o.display}<span></span></div>
                                    </div>
                                );
                            })
                        }</div>
                    </div>
                );
            });

        return (
            <div>
                <div>Your Survey Response Information:</div>
                <div>Survey Name: {survey.name}</div>
                <div>id: {survey.id}</div>
                <div>pre-event: {survey.preEvent}</div>
                <div>questions and responses:</div>
                {questions}
                <div onClick={returnToSurveyOptions}>Back To Survey Options</div>
            </div>
        );
    }
}

ResponsesView = Radium(ResponsesView);

ResponsesView.propTypes = {
    responses: PropTypes.object,
    admin: PropTypes.object,
    surveys: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
        responses: state.responses,
        surveys: state.surveys,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResponsesView);
