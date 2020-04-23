import React from 'react';
import Spinner from './spinner';
import { shallow } from 'enzyme';
import { findByAttr } from '../../test/utils';

const setUp = () => {
 const wrapper = shallow(<Spinner />);
 return wrapper;
};

describe('Spinner Component', () => {

 let wrapper;
 beforeEach(() => {
  wrapper = setUp();
 });

 test('Should render without error', () => {
  const component = findByAttr(wrapper, 'spinner-component');
  expect(component.length).toBe(1);
 });

 test('Should render spinner div', () => {
  const component = findByAttr(wrapper, 'spinner');
  expect(component.length).toBe(1);
 });

});