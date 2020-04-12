import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import combinedReducer from '../store/reducers/combinedReducer.js';
import checkPropTypes from 'check-prop-types';

export const findByAttr = (wrapper, value) => {
 return wrapper.find(`[data-test='${value}']`);
};

export const storeFactory = (initialState) => {
 return createStore(combinedReducer, initialState, applyMiddleware(ReduxThunk));
};

export const checkProps = (component, expectedProps) => {
 const propsError = checkPropTypes(component.propTypes, expectedProps, 'prop', component.name);
 expect(propsError).toBeUndefined();
};
