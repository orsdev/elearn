import React from 'react';
import GoogleLoginButton from './googleLoginButton';
import { shallow } from 'enzyme';
import { findByAttr, checkProps, storeFactory } from '../../../test/utils';


const setUp = () => {
 const store = storeFactory(undefined);
 const wrapper = shallow(<GoogleLoginButton store={store} />).dive().dive();
 return wrapper;
};

describe('GoogleLoginButton Button Component', () => {

 test('Should render without error', () => {
  let wrapper = setUp(undefined);
  const component = findByAttr(wrapper, 'googleLoginButton-component');
  expect(component.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   auth: false,
   responseGoogle: () => { }
  };

  checkProps(GoogleLoginButton, expectedProps);
 });

});