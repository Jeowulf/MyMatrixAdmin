import { GET_SURVEYS, GET_RESPONSES } from './actionTypes';
import * as ServiceApi from '../modules/serviceApi';

function getSurveys() {
    return (dispatch, getState) => {
        ServiceApi.getSurveys().then((surveys) => {
            dispatch({
                type: GET_SURVEYS,
                surveys,
            });
        })
    }
}

function getResponses({ auth, surveyId }) {
    return (dispatch, getState) => {
        ServiceApi.getSurveyResponses({ auth, surveyId }).then((responses) => {
            dispatch({
                type: GET_RESPONSES,
                responses,
            });
        })
    }
}

function updateQuestion({ surveyId, questions, auth, questionId }) {
    ServiceApi.updateQuestionsForSurvey({ surveyId, questions, auth, questionId }).then(() => {
        getSurveys();
    })
}

function deleteQuestionFromSurvey({ surveyId, auth, questionId }) {
    ServiceApi.deleteQuestionFromSurvey({ surveyId, auth, questionId }).then((response) => {
        getSurveys();
    })
}

// function deleteQuestionFromSurvey(surveys) {
//   ServiceApi.deleteQuestionFromSurvey({ surveyId, questions }).then((res) => {
//     if (res.success) {
//       return (dispatch, getState) => {
//         dispatch({
//           type: DELETE_QUESTION,
//         });
//       }.then()
//     } else {
//       console.log("error deleting question");
//     }
//   })

// }

export {
  getSurveys,
  updateQuestion,
  deleteQuestionFromSurvey,
  getResponses,
}
