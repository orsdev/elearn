import React from 'react';
import LogoutButton from './logoutButton';
import { shallow } from 'enzyme';
import { findByAttr, checkProps } from '../../../test/utils';

const setUp = (props = {}) => {
 const wrapper = shallow(<LogoutButton {...props} />);
 return wrapper;
};

describe('logoutButton Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, 'logoutButton-component');
  expect(component.length).toBe(1);
 });

 test('Should render Google logout button', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, 'google-logout-button');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {

  const expectedProps = {
   logout: () => { }
  };

  checkProps(LogoutButton, expectedProps);
 });

});