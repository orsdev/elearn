import React from 'react';
import Button from './button';
import { shallow } from 'enzyme';
import { findByAttr, storeFactory } from '../../test/utils';


const setUp = (initialState) => {
 const store = storeFactory(initialState);
 const wrapper = shallow(<Button store={store} />).dive().dive();
 return wrapper;
};

describe('Button Component', () => {

 let wrapper;

 beforeEach(() => {
  wrapper = setUp();
 });

 test('Should render without error', () => {
  const component = findByAttr(wrapper, 'button-component');
  expect(component.length).toBe(1);
 });

});