import React from 'react';
import * as action from '../../../store/action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

const LogoutButton = (props) => {

 const logout = (response) => {
  props.onLogOutUser();
 }

 return (
  <div data-test="logoutButton-component">
   <GoogleLogout
    className="logout-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={logout}
   >
   </GoogleLogout>
  </div>
 )
};

LogoutButton.propTypes = {
 onLogOutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
 return {
  onLogOutUser: () => dispatch(action.logOutUser())
 }
}

export default connect(null, mapDispatchToProps)(LogoutButton);