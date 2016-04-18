import {
    FREAK_OUT,
    SOOTHE,
} from '../actions/actionTypes';

const crazyPerson = (state = { status: 'calm' }, action) => {
    switch(action.type) {
        case FREAK_OUT:
            return Object.assign({}, state, { status: action.status });
        case SOOTHE:
            return Object.assign({}, state, { status: action.status });
        default:
            return state;
    }
};

export default crazyPerson;
