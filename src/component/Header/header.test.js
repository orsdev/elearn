import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';
import { findByAttr, checkProps, storeFactory } from '../../test/utils';

const setUp = (initialState) => {
 const store = storeFactory(initialState)
 const component = shallow(<Header store={store} />).dive().dive();
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

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   auth: false,
   authData: {}
  };

  checkProps(Header, expectedProps);
 });

});
