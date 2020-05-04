import React from 'react';
import MessageModal from './messageModal';
import { shallow } from 'enzyme';
import { findByAttr, checkProps } from '../../../../test/utils';

const setUp = (props = {}) => {
 const wrapper = shallow(<MessageModal {...props} />);
 return wrapper;
};

describe('MessageModal Component', () => {

 test('Should render without error when props{openModal} is true', () => {
  let wrapper = setUp({ openModal: true });
  const component = findByAttr(wrapper, 'messageModal-component');
  expect(component.length).toBe(1);
 });

 test('Should render button when props{openModal} is true', () => {
  let wrapper = setUp({ openModal: true });
  const button = findByAttr(wrapper, 'button');
  expect(button.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   openModal: true,
   text: 'testing',
   closeModal: () => { }
  };

  checkProps(MessageModal, expectedProps);
 });

});