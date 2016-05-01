import { SIGN_UP, LOG_IN } from '../actions/actionTypes';

const admin = (state = {
                         authenticated: false,
                         userInfo: {
                            name: 'nameless'
                         }
                       }, action) => {
  console.log(action.type);
    switch(action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                                              authenticated: action.authenticated,
                                              userInfo: action.userInfo
                                            });
        case SIGN_UP:
            return Object.assign({}, state, {
                                              authenticated: action.authenticated,
                                              userInfo: action.userInfo
                                            });
        default:
            return state;
    }
};

export default admin;
