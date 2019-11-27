import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import uiReducer from './reducers/ui';
import locationReducer from './reducers/location'
import userReducer from './reducers/user'
import filterReducer from './reducers/filter'
import orderReducer from './reducers/order'

const rootReducer = combineReducers({
    ui: uiReducer,
    location:locationReducer,
    user: userReducer,
    filter:filterReducer,
    order:orderReducer,
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