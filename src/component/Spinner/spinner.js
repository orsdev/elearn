import React from 'react';

const spinner = () => {
 return (
  <div
   className="spinner-container"
   data-test="spinner-component">
   <div
    className="spinner"
    data-test="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
   </div>
  </div>
 )
}

export default spinner;