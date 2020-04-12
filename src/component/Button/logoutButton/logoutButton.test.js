import React from 'react';
import LogoutButton from './logoutButton';
import { shallow } from 'enzyme';
import { findByAttr, storeFactory, checkProps } from '../../../test/utils';

const setUp = (initialState) => {
 const store = storeFactory(initialState);
 const wrapper = shallow(<LogoutButton store={store} />).dive();
 return wrapper;
};

describe('logoutButton Component', () => {

 let wrapper;

 beforeEach(() => {
  wrapper = setUp(undefined);
 });

 test('Should render without error', () => {
  const component = findByAttr(wrapper, 'logoutButton-component');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {

  const expectedProps = {
   onLogOutUser: () => { }
  };

  checkProps(LogoutButton, expectedProps);
 });

});