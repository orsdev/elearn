import React, { Fragment } from 'react';
import Backdrop from '../../Backdrop/backdrop';

const messageModal = (props) => {

 let popup;

 if (props.errorMessage) {
  popup = (
   <Backdrop>
    <div className="messageModal">
     <p className="messageModal-error">
      There was a problem with your request.
      Please try again later.
     </p>
     <button
      onClick={props.closeModal}
      className="close">Close Modal</button>
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

export default messageModal;