import React from 'react';

const Backdrop = (props) => {
 return (
  <div
   data-test="backdrop-component"
   className="backdrop">
   {props.children}
  </div>
 )
}
export default Backdrop;