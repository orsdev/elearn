import React from 'react';
import { shallow } from 'enzyme';
import { findByAttr, storeFactory, checkProps } from '../../test/utils';
import Banner from './banner';

const setUp = () => {
 const store = storeFactory(undefined);
 const wrapper = shallow(<Banner store={store} />).dive();
 return wrapper;
};

describe('Banner Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp();
  const component = findByAttr(wrapper, 'banner-component');
  expect(component.length).toBe(1);
 });


 test('does not throw warning with expected props', () => {

  const expectedProps = {
   onLogOutUser: () => { }
  };

  checkProps(Banner, expectedProps);
 });

});