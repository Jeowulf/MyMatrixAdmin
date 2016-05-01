import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import ViewSurvey from './viewSurvey';
import ResponsesView from './responsesView';
import { Link, browserHistory } from 'react-router';

const styles = {
    mainContainer: {
    },
    surveyOptionsPanel: {
        position: 'absolute',
        zIndex: 100,
        height: '50vh',
        width: '50vw',
        top: '25vh',
        left: '25vw',
        background: 'grey',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexFlow: 'column nowrap',
    },
    surveyOption: {
        display: 'flex',
    },
    subOptions: {
        color: 'yellow',
    },
    subInput: {
        backgroundColor: 'pink',
        color: 'grey',
    },
    responsesView: {
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'none',
        backgroundColor: 'white',
        zIndex: 200,
        float: 'left',
    }
}
class Surveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: null,
            selectedSurveyId: null,
            survey: null,
            surveyOptionsOpen: false,
            updateSurveyComponent: false,
            name: null,
            surveyName: null,
            answerType: null,
            preEvent: false,
            questions: [],
            questionId: null,
            answerOptions: [],
            admin: null,
            addQuestionComponent: false,
            viewSurveyComponent: false,
            responsesView: false,
        };
    }

    componentDidMount() {
        if (this.props.surveyList) {
            this.setState({ surveys: this.props.surveyList })
        };

        if (this.props.admin) {
            this.setState({ admin: this.props.admin })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.surveyList && !prevProps.surveyList) {
            this.setState({ surveys: this.props.surveyList});
        }
        console.log(this.state.responsesView, this.props.responses)
        if (this.props.responses && this.props.responses !== prevProps.responses) {
            browserHistory.push('/responsesView');
        }
    }

    closeResponsesView() {
        this.setState({ responsesView: false });
    }

    handleNameChange(event) {
        this.setState({surveyName: event.target.value});
    }

    handleQuestionTextChange(event) {
        this.setState({questionText: event.target.value});
    }


    handlePreEventClick(event) {
        this.setState({preEvent: !this.state.preEvent});
    }

    seeSurveyOptions(survey) {
        this.setState({ surveyOptionsOpen: true, survey });
    }

    hideSurveyOptions() {
        this.setState({ surveyOptionsOpen: false });
    }

    closeOptions() {
        this.setState({ surveyOptionsOpen: false, survey: null });
    }

    openUpdateSurveyComponent() {
        this.setState({ updateSurveyComponent: !this.updateSurveyComponent })
    }

    updateSurvey() {
        const
            surveyName = this.state.surveyName,
            preEvent = this.state.preEvent,
            authToken = this.state.admin.userInfo.token,
            surveyId = this.state.survey.id;

        fetch(`http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}`, {
            method: 'PUT',
            headers: {
              'Authorization': authToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: surveyName,
              preEvent,
            })
          }).then(this.props.getSurveys());
    }

    openAddQuestionToSurveyComponent() {
        this.setState({ addQuestionComponent: !this.state.addQuestionComponent })
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

    handleOptionChange(option, event) {
        const
            array = this.state.answerOptions,
            newOption = option;
        newOption.display = event.target.value;

        array.splice(option.value - 1, 1, option);
        this.setState({ answerOptions: array });
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

    addQuestionToSurvey() {
        const
            authToken = this.state.admin.userInfo.token,
            surveyId = this.state.survey.id,
            questions = [
                {
                    text: this.state.questionText,
                    answer: {
                        type: this.state.answerType,
                        options: this.state.answerOptions
                    }
                }
            ];



        return fetch(`http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}/questions`, {
            method: 'POST',
            headers: {
              'Authorization': authToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(questions)
        }).then(() => {
            this.props.getSurveys();
        });
    }

    viewSurvey() {
        this.setState({ viewSurveyComponent: !this.state.viewSurveyComponent })
    }


    deleteSurvey() {
        this.hideSurveyOptions();
        const
            authToken = this.state.admin.userInfo.token,
            surveyId = this.state.survey.id;

        fetch(`http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': authToken,
            },
        })
    }



    getSurveyResponses() {
        const
            auth = this.state.admin.userInfo.token,
            surveyId = this.state.survey.id;

        this.props.getResponses({ auth, surveyId });
    }

    render() {
        const
            seeSurveyOptions = this.seeSurveyOptions,
            handleOptionChange = this.handleOptionChange,
            viewSurvey = this.viewSurvey.bind(this),
            answerType = this.state.answerType,
            openUpdateSurveyComponent = this.openUpdateSurveyComponent,
            openAddQuestionToSurveyComponent = this.openAddQuestionToSurveyComponent.bind(this),
            handleNameChange = this.handleNameChange.bind(this),
            handleAddingOption = this.handleAddingOption.bind(this),
            handleAnswerType = this.handleAnswerType,
            handleQuestionTextChange = this.handleQuestionTextChange.bind(this),
            handlePreEventClick = this.handlePreEventClick.bind(this),
            preEvent = this.state.preEvent,
            hideSurveyOptions = this.hideSurveyOptions.bind(this),
            setSelectedSurvey = this.setSelectedSurvey,
            closeOptions = this.closeOptions.bind(this),
            deleteSurvey = this.deleteSurvey.bind(this),
            updateSurvey = this.updateSurvey.bind(this),
            closeResponsesView = this.closeResponsesView.bind(this),
            addQuestionToSurvey = this.addQuestionToSurvey.bind(this),
            getSurveyResponses = this.getSurveyResponses.bind(this),
            surveyList = this.state.surveys ? this.state.surveys.surveys.map((survey) => {
            return (
                <div onClick={seeSurveyOptions.bind(this, survey)}>{survey.name}</div>
            );
        }) : null;

        let
            surveyOptions,
            responsesView = (<div></div>),
            updateSurveyComponent = (<div></div>),
            addQuestionComponent = (<div></div>),
            viewSurveyComponent = (<div></div>),
            options = this.state.answerOptions.map((option) => {
                return (
                        <div>
                            <input type="text" style={styles.subInput} placeholder={`option number: ${option.value}`} value={option.display} onChange={handleOptionChange.bind(this, option)}></input>
                        </div>
                );
            });

        if (this.state.updateSurveyComponent) {
            hideSurveyOptions;
            updateSurveyComponent = (
                <div style={styles.subOptions}>
                    <div>
                       <input type="text" style={styles.subInput} placeholder='survey name' value={this.state.surveyName} onChange={handleNameChange}></input>
                    </div>
                    <div>
                       <label><input type="checkbox" checked={preEvent} onChange={handlePreEventClick}/>Check this box if updating a pre-event survey</label>
                    </div>
                    <div onClick={updateSurvey}>update survey</div>
                </div>
            );
        }

        if (this.state.responsesView) {
            responsesView = (
                <div style={styles.responsesView}>
                    <ResponsesView />
                </div>
            );
        }

        if (this.state.viewSurveyComponent) {
            viewSurveyComponent = (
                <div>
                    <ViewSurvey survey={this.state.survey} viewSurvey={this.viewSurvey.bind(this)} state={this.state} />
                </div>
            );
        }

        if (this.state.addQuestionComponent) {
            addQuestionComponent = (
                <div style={styles.subOptions}>
                    <div>
                       <input type="text" style={styles.subInput} placeholder='the question' value={this.state.questions[this.state.questions.length - 1] ? this.state.questions[this.state.questions.length - 1].text : null} onChange={handleQuestionTextChange}></input>
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

                    <div onClick={addQuestionToSurvey}>add question</div>
                    <div onClick={openAddQuestionToSurveyComponent}>Close the add question component</div>
                </div>
            );
        }

        if (this.state.surveyOptionsOpen && !this.state.responsesView) {
            surveyOptions = (
                <div style={styles.surveyOptionsPanel}>
                    <div onClick={closeOptions}>Close Options</div>
                    <div style={styles.buildOptions}>
                        <div style={styles.surveyOption} onClick={openUpdateSurveyComponent.bind(this)}>updateSurvey</div>
                        {updateSurveyComponent}
                    </div>
                    <div style={styles.buildOptions}>
                        <div style={styles.surveyOption} onClick={deleteSurvey}>deleteSurvey</div>
                    </div>
                    <div style={styles.buildOptions}>
                        <div style={styles.surveyOption} onClick={openAddQuestionToSurveyComponent}>addQuestionToSurvey</div>
                        {addQuestionComponent}
                    </div>
                    <div style={styles.buildOptions}>
                        <div style={styles.surveyOption} onClick={viewSurvey}>view survey</div>
                    </div>
                    <div>
                        {viewSurveyComponent}
                    </div>
                    <div style={styles.buildOptions}>
                        <div style={styles.surveyOption} onClick={getSurveyResponses}>getSurveyResponses</div>
                    </div>
                </div>
            );
        }
        return (

            <div style={styles.mainContainer}>
                {surveyList}
                <div>{surveyOptions}</div>
            </div>
        );
    }
}
Surveys = Radium(Surveys);

Surveys.PropTypes = {
    surveyList: React.PropTypes.object,
    admin: React.PropTypes.object,
    getSurveys: React.PropTypes.func,
    getResponses: React.PropTypes.func.isRequired,
    surveys: React.PropTypes.object,
    responses: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Surveys);

export default Surveys;

