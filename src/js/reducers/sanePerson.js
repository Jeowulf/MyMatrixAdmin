import { MAKE_SANE } from '../actions/actionTypes';

const sanePerson = (state = { status: 'angry' }, action) => {
    switch(action.type) {
        case MAKE_SANE:
            return Object.assign({}, state, { status: action.status });
        default:
            return state;
    }
};

export default sanePerson;
