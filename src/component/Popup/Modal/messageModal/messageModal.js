import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../Backdrop/backdrop';

const messageModal = (props) => {

 let popup;

 if (props.openModal) {
  popup = (
   <Backdrop>
    <div
     data-test="messageModal-component"
     className="messageModal">
     <p className="messageModal-error">
      {props.text}
     </p>
     <button
      data-test="button"
      onClick={props.closeModal}
      className="close">X</button>
    </div>
   </Backdrop>
  )
 }

 return (
  <Fragment>
   {popup}
  </Fragment>
 )
}

messageModal.propTypes = {
 text: PropTypes.string,
 errorMessage: PropTypes.bool,
 closeModal: PropTypes.func
}

export default messageModal;