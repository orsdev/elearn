import React from 'react';
import LoginButton from './logInButton';
import { shallow } from 'enzyme';
import { findByAttr, checkProps } from '../../../test/utils';


const setUp = (props = {}) => {
 const wrapper = shallow(<LoginButton {...props} />);
 return wrapper;
};

describe('loginButton Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, 'loginButton-component');
  expect(component.length).toBe(1);
 });

 test('Should render Google login button', () => {
  let wrapper = setUp({ auth: false });
  const component = findByAttr(wrapper, 'google-login-button');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   responseGoogle: () => { },
   auth: false
  };

  checkProps(LoginButton, expectedProps);
 });

});