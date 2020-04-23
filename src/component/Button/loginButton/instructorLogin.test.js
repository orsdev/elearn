import React from 'react';
import InstructorLogIn from './instructorLogIn';
import { shallow } from 'enzyme';
import { findByAttr, checkProps, storeFactory } from '../../../test/utils';


const setUp = (initialState) => {
 const store = storeFactory(initialState);
 const wrapper = shallow(<InstructorLogIn store={store} />).dive().dive();
 return wrapper;
};

describe('Student Login Button Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, 'instructorLogin-component');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   oninstructorLogIn: () => { },
   onGetUser: () => { },
   studentAuth: false,
   instructorAuth: false,
   instructorData: {},
   users: {}
  };

  checkProps(InstructorLogIn, expectedProps);
 });

});