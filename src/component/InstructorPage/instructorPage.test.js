import React from 'react';
import InstructorPage from './instructorPage';
import { shallow } from 'enzyme';
import { findByAttr, storeFactory, checkProps } from '../../test/utils';

const setUp = () => {
 const store = storeFactory(undefined);
 const wrapper = shallow(<InstructorPage store={store} />).dive().dive();
 return wrapper;
};


describe('InstructorPage Component', () => {

 test('Should render without render', () => {
  const wrapper = setUp(null);
  const component = findByAttr(wrapper, 'instructorPage-component');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   authData: {},
   users: {},
   onGetUser: () => { },
   onLogOutUser: () => { },
   onAuthenticate: () => { }
  };

  checkProps(InstructorPage, expectedProps);
 });

});
