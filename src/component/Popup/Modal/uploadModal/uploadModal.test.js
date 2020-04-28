import React from 'react';
import UploadModal from './uploadModal';
import { shallow } from 'enzyme';
import { findByAttr, checkProps } from '../../../../test/utils';

const setUp = (props = {}) => {
 const wrapper = shallow(<UploadModal {...props} />);
 return wrapper;
};

describe('UploadModal Component', () => {

 test('Should render without error when props{loader} is true', () => {
  let wrapper = setUp({ loader: true });
  const component = findByAttr(wrapper, 'uploadModal-component');
  expect(component.length).toBe(1);
 });

 test('Should render button when props{loader} is true and props{completed} is true', () => {
  let wrapper = setUp({ loader: true, completed: true });
  const button = findByAttr(wrapper, 'button');
  expect(button.length).toBe(1);
 });

 test('Should render progress bar when props{loader} is true', () => {
  let wrapper = setUp({ loader: true });
  const progressBar = findByAttr(wrapper, 'progress');
  expect(progressBar.length).toBe(1);
 });

 test('does not throw warning with expected props', () => {
  const expectedProps = {
   completed: true,
   loader: true,
   closeModal: () => { }
  };

  checkProps(UploadModal, expectedProps);
 });

});