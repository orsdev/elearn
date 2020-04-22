import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Button/logoutButton/logoutButton';

const Header = (props) => {

 const [dropdown, setDropdown] = useState(false);

 useEffect(() => {
 }, [props.loggedIn]);

 const toggleDropdown = () => {
  let toggleBool = !dropdown;
  setDropdown(toggleBool);
 }

 if (props.loggedIn) {
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
       <LogoutButton />
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
    <NavLink
     to="/"
     data-test="elearn-logo"
     activeClassName="header-logo">
     <span className="first-letter">E</span>
     Learn
     </NavLink>
    {auth}
   </nav>
  </div>
 )
};

Header.propTypes = {
 loggedIn: PropTypes.bool
};

export default Header;