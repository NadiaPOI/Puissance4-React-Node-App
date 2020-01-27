import {createStore, compose} from 'redux';

import rootReducer from '../reducers/gameboard-reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer());

export default store;
