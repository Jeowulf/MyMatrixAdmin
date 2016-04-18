import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import crazyPerson from './crazyPerson';

const rootReducer = combineReducers({
    routing: routerReducer,
    crazyPerson
});

export {
    rootReducer
}
