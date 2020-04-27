import React from 'react';

const Notification = (props) => {
 return (
  <div
   data-test="notification-component"
   className="notification">
   <h1 data-test="login-text">{props.text}</h1>
  </div>
 )
};

export default Notification;