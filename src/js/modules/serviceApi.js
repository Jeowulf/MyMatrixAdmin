import 'isomorphic-fetch';

function signUp(name, password, company, jobTitle, email, phone, admin) {
  const init = {
    method: 'POST',
    body: JSON.stringify({
        name,
        password,
        company,
        jobTitle,
        email,
        phone,
        admin
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  fetch('http://mymatrixapidev.azurewebsites.net/users', init)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(user) {
      console.log(user);
    });
}

function loginUser(email, password) {
  const init = {
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
    .then(function(user) {
      console.log(user);
    });
}

function getSurveys() {
  const init = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  };
  fetch('http://mymatrixapidev.azurewebsites.net/surveys', init)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(surveys) {
      console.log(surveys);
    });
}

function createSurvey(name, preEvent, auth) {
  fetch('http://mymatrixapidev.azurewebsites.net/surveys', {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      preEvent,
    })
  })
}

function updateSurvey(name, preEvent, surveyId, auth) {
  fetch(`http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}`, {
    method: 'PUT',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      preEvent,
    })
  })
}

function deleteSurvey(surveyId, auth) {
  fetch(`http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': auth,
    },
  })
}

function addQuestionToSurvey(surveyId, questions, auth) {
  fetch(`http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}/questions`, {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(questions)
  })
}

function updateQuestionsForSurvey(surveyId, questions, auth, questionId) {
  fetch(`http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}/questions/${questionId}`, {
    method: 'PUT',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(questions)
  })
}

function deleteQuestionFromSurvey() {

}

function getSurveyResponses(surveyId, auth) {
  fetch('http://mymatrixapidev.azurewebsites.net/surveys/${surveyId}/responses', {
    method: 'GET',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
  })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(surveyResponses) {
      console.log(surveyResponses);
    });
}




export {
  getSurveys,
  loginUser,
  signUp,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  addQuestionToSurvey,
  updateQuestionsForSurvey,
  deleteQuestionFromSurvey,
  getSurveyResponses,
}
