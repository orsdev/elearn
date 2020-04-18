import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LogoutButton from '../Button/logoutButton/logoutButton';

const Header = (props) => {

 const [dropdown, setDropdown] = useState(false);

 useEffect(() => {
 }, [props.auth]);

 const toggleDropdown = () => {
  let toggleBool = !dropdown;
  setDropdown(toggleBool);
 }

 if (props.auth) {
  var auth = (
   <div
    data-test="header-auth"
    className="header-auth">
    <img
     onClick={toggleDropdown}
     src={props.src}
     alt={props.fullname} />
    {dropdown ?
     <ul className="header-dropdown">
      <li>{props.fullname}</li>
      <li>
       <LogoutButton
        logout={props.logout} />
      </li>
     </ul>
     : null}
   </div>
  );
 }

 return (
  <div
   className="header"
   data-test="header-component">
   <nav
    className="header-nav">
    <a href="#" data-test="elearn-logo" className="header-logo"><span className="first-letter">E</span>Learn</a>
    {auth}
   </nav>
  </div>
 )
};

Header.propTypes = {
 auth: PropTypes.bool,
 logout: PropTypes.func
};

export default Header;