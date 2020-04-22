import React from 'react';
import PropTypes from 'prop-types';
import * as action from '../../../store/action';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

const LogoutButton = (props) => {

 //Google auth logout function
 const logout = () => {
  props.onLogOutUser();
 }

 return (
  <div data-test="logoutButton-component">
   <GoogleLogout
    data-test="google-logout-button"
    className="logout-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={logout}
   />
  </div>
 )
};

LogoutButton.propTypes = {
 onLogOutUser: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
 return {
  onLogOutUser: () => dispatch(action.logOutUser())
 }
}

export default connect(null, mapDispatchToProps)(LogoutButton);