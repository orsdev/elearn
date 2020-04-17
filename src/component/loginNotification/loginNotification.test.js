import React from 'react';
import LoginNotification from './loginNotification';
import { shallow } from 'enzyme';
import { findByAttr, } from '../../test/utils'

const setUp = () => {
 const component = shallow(<LoginNotification />);
 return component;
};

describe('LoginNotification Component', () => {

 let wrapper;
 beforeEach(() => {
  wrapper = setUp();
 });

 test('Should render with error', () => {
  const component = findByAttr(wrapper, 'loginNotification-component');
  expect(component.length).toBe(1);
 });

 test('Should render with H1 text', () => {
  const loginText = findByAttr(wrapper, 'login-text');
  expect(loginText.text().length).not.toBe(0);
 });

});