import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import combinedReducer from '../store/reducers/combinedReducer.js';

export const findByAttr = (wrapper, value) => {
 return wrapper.find(`[data-test='${value}']`);
};

export const storeFactory = (initialState) => {
 return createStore(combinedReducer, initialState, applyMiddleware(ReduxThunk));
};
