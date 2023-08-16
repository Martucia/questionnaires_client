import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import formsReducer from './formsReducer';
import formReducer from './formReducer';
import notificationReducer from './notificationReducer';
import commonReducer from './commonReducer';
import userReducer from './usersRudecur';

const rootReducer = combineReducers({
    forms: formsReducer,
    notification: notificationReducer,
    common: commonReducer,
    form: formReducer,
    user: userReducer
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);