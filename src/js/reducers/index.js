import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import crazyPerson from './crazyPerson';
import sanePerson from './sanePerson';
import admin from './admin';
import { surveys, responses } from './surveys';

const rootReducer = combineReducers({
    routing: routerReducer,
    crazyPerson,
    sanePerson,
    admin,
    surveys,
    responses
});

export {
    rootReducer
}
