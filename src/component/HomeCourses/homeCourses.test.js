import React from 'react';
import HomeCourses from './homeCourses';
import { shallow } from 'enzyme';
import { findByAttr, storeFactory, checkProps } from '../../test/utils';

const setUp = (props = {}) => {
 const store = storeFactory(undefined);
 const wrapper = shallow(<HomeCourses store={store} />).dive().dive();
 return wrapper;
};


describe('homeCourses Component', () => {

 test('Should render without render', () => {
  const wrapper = setUp(null);
  const component = findByAttr(wrapper, 'home-courses');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   auth: true,
   id: '',
   playlist: []
  };

  checkProps(HomeCourses, expectedProps);
 });

});
