import React, { Fragment } from 'react';
import Backdrop from '../../Backdrop/backdrop';
import Spinner from '../../../Spinner/spinner';

const uploadModal = (props) => {

 let popup;

 if (props.loader) {
  popup = (
   <Backdrop>
    <div className="uploadModal">
     {props.completed
      ? <h3>Upload Completed...</h3> :
      <Spinner />
     }
     <div className="progress">
      <div className="progress-bar"></div>
     </div>
     <div>
      {props.completed ?
       <button
        onClick={props.closeModal}
        className="close">Close Modal</button>
       : null}
     </div>
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

export default uploadModal;