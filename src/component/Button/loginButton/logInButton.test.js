import React from 'react';
import LoginButton from './logInButton';
import { shallow } from 'enzyme';
import { findByAttr, checkProps, storeFactory } from '../../../test/utils';


const setUp = (initialState) => {
 const store = storeFactory(initialState);
 const wrapper = shallow(<LoginButton store={store} />).dive().dive();
 return wrapper;
};

describe('loginButton Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, 'loginButton-component');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   onLogInUser: () => { },
   onGetUser: () => { },
   loggedIn: false,
   userData: {}
  };

  checkProps(LoginButton, expectedProps);
 });

});