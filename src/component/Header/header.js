import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
     src={props.authData.imageUrl}
     alt={props.authData.name} />
    {dropdown ?
     <ul className="header-dropdown">
      <li>{props.authData.name}</li>
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
    <h3
     data-test="elearn-logo"
     className="header-logo">
     <span className="first-letter">E</span>
     Learn
     </h3>
    {auth}
   </nav>
  </div>
 )
};

Header.propTypes = {
 auth: PropTypes.bool,
 authData: PropTypes.object,
};

const mapStateToProps = (state) => {
 return {
  auth: state.authentication.auth,
  authData: state.authentication.authData,
 }
};

export default connect(mapStateToProps, null)(Header);
