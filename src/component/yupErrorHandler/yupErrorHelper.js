import React from 'react';

const yupErrorHelper = ({ touched, message }) => {
 if (!touched) {
  return <div className="error-message">&nbsp;</div>
 }
 if (message) {
  return <div className="error-message">{message}</div>
 }
 return null;
}

export default yupErrorHelper