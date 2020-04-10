import React from 'react'
import { shallow } from 'enzyme';
import Header from './header';
import { findByAttr } from '../../test/utils';

const setUp = () => {
 const component = shallow(<Header />);
 return component;
};

describe('Header Component', () => {

 let wrapper;

 beforeEach(() => {
  wrapper = setUp();
 });

 test('Should render without error', () => {
  const component = findByAttr(wrapper, "header-component");
  expect(component.length).toBe(1);
 });

 test('Should render a Logo', () => {
  const logo = findByAttr(wrapper, 'udemy-clone-logo');
  expect(logo.length).toBe(1);
 });

});
