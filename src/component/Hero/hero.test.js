import React from 'react';
import Hero from './hero';
import { shallow } from 'enzyme';
import { findByAttr, checkProps, storeFactory } from '../../test/utils'

const setUp = () => {
 const store = storeFactory(undefined);
 const component = shallow(<Hero store={store} />).dive().dive();
 return component;
};

describe('Hero Component', () => {

 test('Should render with error', () => {
  let wrapper = setUp();
  const component = findByAttr(wrapper, 'hero-component');
  expect(component.length).toBe(1);
 });

 test('Should render with hero-body', () => {
  let wrapper = setUp();
  const component = findByAttr(wrapper, 'hero-body');
  expect(component.length).toBe(1);
 });


 test('does not throw warning with expected props', () => {
  const expectedProps = {
   auth: false,
   responseGoogle: () => { },
   authData: {},
   users: {},
   onAuthenticate: () => { },
   onGetUser: () => { }
  };

  checkProps(Hero, expectedProps);
 });

})
