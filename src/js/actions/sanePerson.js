import { MAKE_SANE } from './actionTypes';

function makeHimSane() {
  return (dispatch, getState) => {
    dispatch({
      type: MAKE_SANE,
      status: 'so calm, such tranquil'
    });
  }
}

export {
  makeHimSane,
}
