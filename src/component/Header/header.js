import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
     src={props.user.imageUrl}
     alt="user picture" />
    {dropdown ?
     <ul className="header-dropdown">
      <li>{props.user.name}</li>
      <li>Logout</li>
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
    <a href="#" data-test="udemy-clone-logo" className="header-logo">Udemy Clone</a>
    {auth}
   </nav>
  </div>
 )
};

Header.propTypes = {
 auth: PropTypes.bool,
 user: PropTypes.object
};

const mapStateToProps = (state) => {
 return {
  auth: state.authenticate.auth,
  user: state.authenticate.user
 }
};

export default connect(mapStateToProps)(Header);