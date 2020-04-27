import React from 'react';
import Notification from './notification';
import { shallow } from 'enzyme';
import { findByAttr, } from '../../test/utils'

const setUp = (props = {}) => {
 const component = shallow(<Notification {...props} />);
 return component;
};

describe('Notification Component', () => {

 test('Should render with error', () => {
  let wrapper = setUp();
  const component = findByAttr(wrapper, 'notification-component');
  expect(component.length).toBe(1);
 });

 test('Should render H1 text when props(text) is assigned value', () => {
  let wrapper = setUp({ text: 'testing' });
  const loginText = findByAttr(wrapper, 'login-text');
  expect(loginText.text().length).not.toBe(0);
 });

});