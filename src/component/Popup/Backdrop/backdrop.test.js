import React from 'react';
import Backdrop from './backdrop';
import { shallow } from 'enzyme';
import { findByAttr } from '../../../test/utils'

const setUp = () => {
 const component = shallow(<Backdrop />);
 return component;
};

describe('Backdrop Component', () => {

 test('Should render with error', () => {
  let wrapper = setUp();
  const component = findByAttr(wrapper, 'backdrop-component');
  expect(component.length).toBe(1);
 });

})
