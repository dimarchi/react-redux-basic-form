import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import combineReducers from './reducers';

import './index.css';
import App from './App';

// use applyMiddleware to add the thunk middleware to the store
export const store = createStore(combineReducers, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
