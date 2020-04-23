import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Button/logoutButton/logoutButton';

const Header = (props) => {

 const [dropdown, setDropdown] = useState(false);

 useEffect(() => {
 }, [props.studentAuth, props.instructorAuth]);

 const toggleDropdown = () => {
  let toggleBool = !dropdown;
  setDropdown(toggleBool);
 }

 if (props.studentAuth) {
  var auth;
  auth = (
   <div
    data-test="header-auth"
    className="header-auth">
    <img
     onClick={toggleDropdown}
     src={props.studentData.imageUrl}
     alt={props.studentData.name} />
    {dropdown ?
     <ul className="header-dropdown">
      <li>{props.studentData.name}</li>
      <li>
       <LogoutButton />
      </li>
     </ul>
     : null}
   </div>
  );
 } else {
  if (props.instructorAuth) {
   auth = (
    <div
     data-test="header-auth"
     className="header-auth">
     <img
      onClick={toggleDropdown}
      src={props.instructorData.imageUrl}
      alt={props.instructorData.name} />
     {dropdown ?
      <ul className="header-dropdown">
       <li>{props.instructorData.name}</li>
       <li>
        <LogoutButton />
       </li>
      </ul>
      : null}
    </div>
   );
  }
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
 studentAuth: PropTypes.bool,
 instructorAuth: PropTypes.bool,
 studentData: PropTypes.object,
 instructorData: PropTypes.object
};

const mapStateToProps = (state) => {
 return {
  studentAuth: state.studentAuthentication.studentAuth,
  studentData: state.studentAuthentication.studentData,
  instructorAuth: state.instructorAuthentication.instructorAuth,
  instructorData: state.instructorAuthentication.instructorData,
 }
};

export default connect(mapStateToProps, null)(Header);
