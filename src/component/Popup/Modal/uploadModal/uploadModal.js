import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../Backdrop/backdrop';
import Spinner from '../../../Spinner/spinner';
import Completed from '../../../../assets/img/completed.png';

const uploadModal = (props) => {

 let popup;

 if (props.loader) {
  popup = (
   <Backdrop>
    <div
     data-test="uploadModal-component"
     className="uploadModal">
     {props.completed
      ? <img src={Completed} alt="task completed icon" /> :
      <Spinner />
     }
     <div data-test="progress"
      className="progress">
      <div className="progress-bar"></div>
     </div>
     <div>
      {props.completed ?
       <button
        data-test="button"
        onClick={props.closeModal}
        className="close">X</button>
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

uploadModal.propTypes = {
 completed: PropTypes.bool,
 loader: PropTypes.bool,
 closeModal: PropTypes.func
}

export default uploadModal;