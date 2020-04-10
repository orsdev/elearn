import React from 'react';
import Logo from '../../assets/img/google-icon.png';

const header = () => {

 return (
  <div
   className="header"
   data-test="header-component">
   <nav
    className="header-nav">
    <a href="#" data-test="udemy-clone-logo" className="header-logo">Udemy Clone</a>
   </nav>
  </div>
 )
};

export default header;