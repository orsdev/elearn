import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';
import { findByAttr, checkProps } from '../../test/utils';

const setUp = (props) => {
 const component = shallow(<Header {...props} />);
 return component;
};

describe('Header Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, "header-component");
  expect(component.length).toBe(1);
 });

 test('Should render a Logo', () => {
  let wrapper = setUp(undefined);
  const logo = findByAttr(wrapper, 'elearn-logo');
  expect(logo.length).toBe(1);
 });

 test('Should render a Header-auth if props(loggedIn) is true', () => {
  let wrapper = setUp({ loggedIn: true });
  const logo = findByAttr(wrapper, 'header-auth');
  expect(logo.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = { loggedIn: false };
  checkProps(Header, expectedProps);
 });

});
