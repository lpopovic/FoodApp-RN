import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    ui: uiReducer
});

// debug redux
let composeEnhacers = compose;

if (__DEV__) {
    composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// end debug
const configureStore = () => {
    return createStore(rootReducer, composeEnhacers(applyMiddleware(thunk)));
};


export default configureStore;