import React from 'react';

const Footer = () => {
 return (
  <div
   data-test="footer-component"
   className="footer">
   <small>&copy; copyright
     <strong>ELEARN</strong>
    {new Date().getFullYear()}
   </small>
  </div>
 )
}

export default Footer;