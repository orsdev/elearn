import React from 'react';
import AllCourses from './allCourses';
import { shallow } from 'enzyme';
import { findByAttr, storeFactory, checkProps } from '../../test/utils';

const setUp = (props = {}) => {
 const store = storeFactory(undefined);
 const wrapper = shallow(<AllCourses store={store} />).dive().dive();
 console.log(wrapper.debug());
 return wrapper;
};


describe('allCourses Component', () => {

 test('Should render without render', () => {
  const wrapper = setUp(null);
  const component = findByAttr(wrapper, 'all-courses');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   auth: true,
   id: '',
   playlist: [],
   onGetPlayListId: () => { },
   onGetPlayListItems: () => { },
   onRemovePlayList: () => { }
  };

  checkProps(AllCourses, expectedProps);
 });

});
