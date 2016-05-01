import { SIGN_UP, LOG_IN} from './actionTypes';
import * as ServiceApi from '../modules/serviceApi';

function login(userInfo) {
    return (dispatch, getState) => {
        dispatch({
          type: LOG_IN,
          authenticated: true,
          userInfo,
        });
    }
}

function signUp({ name, password, company, jobTitle, email, phone, admin }) {
    ServiceApi.signUpUser({
       name,
       password,
       company,
       jobTitle,
       email,
       phone,
       admin
    }).then((userInfo) => {
        return (dispatch, getState) => {
            dispatch({
              type: SIGN_UP,
              authenticated: true,
              userInfo,
            });
        }
    })
}

export {
    login,
    signUp,
}
