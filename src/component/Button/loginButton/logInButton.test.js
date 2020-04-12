import React from 'react';
import LoginButton from './logInButton';
import { shallow } from 'enzyme';
import { findByAttr, storeFactory, checkProps } from '../../../test/utils';


const setUp = (initialState) => {
 const store = storeFactory(initialState);
 const wrapper = shallow(<LoginButton store={store} />).dive().dive();
 return wrapper;
};

describe('loginButton Component', () => {

 let wrapper;

 beforeEach(() => {
  wrapper = setUp();
 });

 test('Should render without error', () => {
  const component = findByAttr(wrapper, 'loginButton-component');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = { onLogInUser: () => { } };
  checkProps(LoginButton, expectedProps);
 });

});