import {
    FREAK_OUT,
    SOOTHE,
} from './actionTypes';

function freakHimOut() {
    return {
      type: FREAK_OUT,
      status: 'lost his marbles'
    }
}

function sootheHisSoul() {
    return {
      type: SOOTHE,
      status: 'calm and soothed'
    }
}

function makeFunOfHim() {
    return (dispatch, getState) => {
        const state = getState();
        const isCalm = state.crazyPerson.status === 'calm';

        if (isCalm) {
            dispatch(freakHimOut());
        } else {
            dispatch(sootheHisSoul());
        }
    };
}

export {
    makeFunOfHim,
}
