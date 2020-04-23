import React from 'react';
import StudentLogin from './studentLogin';
import { shallow } from 'enzyme';
import { findByAttr, checkProps, storeFactory } from '../../../test/utils';


const setUp = (initialState) => {
 const store = storeFactory(initialState);
 const wrapper = shallow(<StudentLogin store={store} />).dive().dive();
 return wrapper;
};

describe('Student Login Button Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, 'studentLogin-component');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   onStudentLogin: () => { },
   onGetUser: () => { },
   studentAuth: false,
   instructorAuth: false,
   studentData: {},
   users: {}
  };

  checkProps(StudentLogin, expectedProps);
 });

});