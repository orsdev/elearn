import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import Header from './header';
import { findByAttr, storeFactory, checkProps } from '../../test/utils';

const setUp = (initialState) => {
 const store = storeFactory(initialState);
 const component = shallow(<Header store={store} />).dive().dive();
 return component;
};

describe('Header Component', () => {

 let wrapper;

 beforeEach(() => {
  wrapper = setUp(undefined);
 });

 test('Should render without error', () => {
  const component = findByAttr(wrapper, "header-component");
  expect(component.length).toBe(1);
 });

 test('Should render a Logo', () => {
  const logo = findByAttr(wrapper, 'udemy-clone-logo');
  expect(logo.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = { auth: false, user: {} };
  const propsError = checkProps(Header, expectedProps);
  expect(propsError).toBeUndefined();
 });

});
