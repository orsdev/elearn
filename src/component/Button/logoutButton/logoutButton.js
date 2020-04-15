import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

const LogoutButton = (props) => {

 return (
  <div data-test="logoutButton-component">
   <GoogleLogout
    data-test="google-logout-button"
    className="logout-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={props.logout}
   >
   </GoogleLogout>
  </div>
 )
};

LogoutButton.propTypes = {
 logout: PropTypes.func
};

export default LogoutButton;