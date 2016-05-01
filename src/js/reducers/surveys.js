import { GET_SURVEYS, GET_RESPONSES } from '../actions/actionTypes';

const
    surveys = (state = { surveys: null }, action) => {
        switch(action.type) {
            case GET_SURVEYS:
                return Object.assign({}, state, { surveys: action.surveys });
            default:
                return state;
        }
    },
    responses = (state = { responses: null }, action) => {
        switch(action.type) {
            case GET_RESPONSES:
                return Object.assign({}, state, { responses: action.responses });
            default:
                return state;
        }
    };

export {
    surveys,
    responses,
}
