import React from 'react';
import Hero from './hero';
import { shallow } from 'enzyme';
import { findByAttr, checkProps } from '../../test/utils'

const setUp = () => {
 const component = shallow(<Hero />);
 return component;
};

describe('Hero Component', () => {

 let wrapper;
 beforeEach(() => {
  wrapper = setUp();
 });

 test('Should render with error', () => {
  const component = findByAttr(wrapper, 'hero-component');
  expect(component.length).toBe(1);
 });

 test('Should render with hero-body', () => {
  const component = findByAttr(wrapper, 'hero-body');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = { auth: false, responseGoogle: () => { } };
  checkProps(Hero, expectedProps);
 });


})