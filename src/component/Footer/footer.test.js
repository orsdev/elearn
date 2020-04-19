import React from 'react';
import { shallow } from 'enzyme';
import Footer from './footer';
import { findByAttr } from '../../test/utils';

const setUp = (props) => {
 const component = shallow(<Footer {...props} />);
 return component;
};

describe('Header Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, "footer-component");
  expect(component.length).toBe(1);
 });

});
