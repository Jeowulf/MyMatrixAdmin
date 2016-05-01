import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as ServiceApi from '../modules/serviceApi';
import { getSurveys } from '../actions/survey';
import * as SurveyActionCreators from '../actions/survey';

const styles = {
    mainContainer: {
        position: 'relative',
        zIndex: 125,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'pink',
        overflowY: 'scroll',
    },
    surveyOption: {
        display: 'flex',
    },
    subOptions: {
        height: '100vh',
        width: '100vw',
    },
    subInput: {
        backgroundColor: 'pink',
        color: 'grey',
    }
}
class ViewSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: null,
            updateQuestionComponent: false,
            answerType: null,
            questionText: null,
            questions: [],
            answerOptions: [],
            questionId: null,
            answerId: null,
        };
    }

    componentWillMount() {
        this.setState({ survey: this.props.survey, questions: this.props.survey.questions })
    }

    componentDidUpdate(prevProps, prevState) {
    }

    openUpdateQuestionForSurvey(question) {
        if (question && question.id) {
            this.setState({ updateQuestionComponent: !this.state.updateQuestionComponent, questionId: question.id, answerType: question.answer.type, answerOptions: question.answer.options, questionText: question.text, answerId: question.answer.id })
        } else {
            this.setState({ updateQuestionComponent: !this.state.updateQuestionComponent, questionId: null, answerType: null, answerOptions: [], questionText: null })
        }
    }

    handleQuestionTextChange(event) {
        this.setState({questionText: event.target.value});
    }

    handleAnswerType(type) {
        if (type === 'radio') {
            const questions = this.state.questions;

            this.setState({ answerType: 'radio' });
        }

        if (type === 'textbox') {
            this.setState({ answerType: 'textbox' });
        }

        if (type === 'checkbox') {
            this.setState({ answerType: 'checkbox' });
        }
    }

    handleAddingOption() {
        const array = this.state.answerOptions;
        array.push({
            selected: false,
            value: this.state.answerOptions.length + 1,
            display: null,
        });
        this.setState({ answerOptions: array })
    }

    handleOptionChange(option, event) {
        const
            array = this.state.answerOptions,
            newOption = option;
        newOption.display = event.target.value;

        array.splice(option.value - 1, 1, option);
        this.setState({ answerOptions: array });
    }

    updateQuestion() {
        const
            state = this.props.state,
            authToken = state.admin.userInfo.token,
            surveyId = this.state.survey.id,
            questionId = this.state.questionId,
            questions = [
                {
                    text: this.state.questionText,
                    id: questionId,
                    answer: {
                        type: this.state.answerType,
                        options: this.state.answerOptions,
                        id: this.state.answerId
                    }
                }
            ];
        SurveyActionCreators.updateQuestion({ surveyId, questions, auth: authToken });
        this.openUpdateQuestionForSurvey();
    }

    deleteQuestionFromSurvey(question) {
        const
            state = this.props.state,
            authToken = state.admin.userInfo.token,
            surveyId = this.state.survey.id,
            questionId = question.id,
            questions = [questionId];

        SurveyActionCreators.deleteQuestionFromSurvey({ surveyId, questionId, auth: authToken });
        this.removeDeletedQuestion(questionId);
    }

    removeDeletedQuestion(questionId) {
        const
            questions = this.state.questions,
            question = questions.find((q) => {
                return questionId === q.id;
            }),
            questionIndex = questions.indexOf(question),
            newQuestionsArray = questions;
        newQuestionsArray.splice(questionIndex, 1);
        this.setState({ questions: newQuestionsArray });
    }


    render() {
            const
            survey = this.state.survey,
            surveyName = survey.name,
            handleAnswerType = this.handleAnswerType,
            handleQuestionTextChange = this.handleQuestionTextChange.bind(this),
            preEvent = survey.preEvent ? 'true' : 'false',
            openUpdateQuestionForSurvey = this.openUpdateQuestionForSurvey,
            updateQuestion = this.updateQuestion.bind(this),
            handleAddingOption = this.handleAddingOption.bind(this),
            handleOptionChange = this.handleOptionChange,
            deleteQuestionFromSurvey = this.deleteQuestionFromSurvey,
            answerType = this.state.answerType,
            options = this.state.answerOptions.map((option) => {
                return (
                        <div>
                            <input type="text" style={styles.subInput} placeholder={`option number: ${option.value}`} value={option.display} onChange={handleOptionChange.bind(this, option)}></input>
                        </div>
                );
            }),
            questions = this.state.questions;

        let
            questionsList = (<div>There are no questions yet for this survey</div>),
            updateQuestionComponent = (<div></div>),
            introComponent = (
                <div>
                    Here is your survey data:
                    <div>survey name: {surveyName}</div>
                    <div>pre-event: {preEvent}</div>
                    <div onClick={this.props.viewSurvey}>Close Survey</div>
                </div>
            );

        if (this.state.updateQuestionComponent) {
            const question = this.state.survey.questions.find((q) => {
                return q.id === this.state.questionId;
            });
            updateQuestionComponent = (
                <div style={styles.subOptions}>
                    <div>
                       <input type="text" style={styles.subInput} placeholder={question.text} value={question.text} onChange={handleQuestionTextChange}></input>
                    </div>
                    <div>What is the answer type? (select only one)</div>
                    <div>
                       <label><input type="radio" style={styles.subInput} checked={answerType === 'radio'} onChange={handleAnswerType.bind(this, 'radio')}></input>radio</label>
                    </div>
                    <div>
                       <label><input type="radio" style={styles.subInput} checked={answerType === 'textbox'} onChange={handleAnswerType.bind(this, 'textbox')}></input>textbox</label>
                    </div>
                    <div>
                       <label><input type="radio" style={styles.subInput} checked={answerType === 'checkbox'} onChange={handleAnswerType.bind(this, 'checkbox')}></input>checkbox</label>
                    </div>
                    {options}
                    <div onClick={handleAddingOption}> add answer option</div>
                    <div onClick={updateQuestion}>Save Updates</div>
                    <div onClick={openUpdateQuestionForSurvey.bind(this)}>Close Update Question Component</div>
                </div>
            );
            introComponent = (<div></div>);
            questionsList = (<div></div>);
        }

        if (questions && questions.length > 0 && !this.state.updateQuestionComponent) {
            questionsList = questions.map((q) => {
                return (
                    <div>
                        <div>question: {q.text}</div>
                        <div>answer type: {q.answer.type}</div>
                        <div>answer choices: {
                            q.answer.options.map((o, idx) => {
                                return (
                                    <div>
                                        <div>Option number {idx + 1}:</div>
                                        <div>{o.display}</div>
                                    </div>
                                );
                            })
                        }
                        </div>
                        <div style={styles.buildOptions}>
                            <div style={styles.surveyOption} onClick={openUpdateQuestionForSurvey.bind(this, q)}>update Question</div>
                        </div>
                        <div style={styles.buildOptions}>
                            <div style={styles.surveyOption} onClick={deleteQuestionFromSurvey.bind(this, q)}>delete Question</div>
                        </div>
                    </div>
                );
            })
        }


        return (

            <div style={styles.mainContainer}>
                {introComponent}
                {questionsList}
                {updateQuestionComponent}
            </div>
        );
    }
}
ViewSurvey = Radium(ViewSurvey);

ViewSurvey.PropTypes = {
    survey: React.PropTypes.object,
    viewSurvey: React.PropTypes.func,
    state: React.PropTypes.object,
}

export default ViewSurvey;

