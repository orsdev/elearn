import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

const GoogleLoginButton = (props) => {

 useEffect(() => {
 }, [props.auth]);

 if (!props.auth) {
  var button = (
   <GoogleLogin
    data-test="google-login-button"
    className="login-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText={props.text}
    onSuccess={props.responseGoogle}
    onFailure={props.responseGoogle}
    isSignedIn={true}
    cookiePolicy={"single_host_origin"} />
  )
 };

 return (
  <div
   data-test="googleLoginButton-component">
   {button}
  </div>
 )
};

const mapStateToProps = (state) => {
 return {
  auth: state.authentication.auth
 }
};

GoogleLoginButton.propTypes = {
 auth: PropTypes.bool,
 responseGoogle: PropTypes.func
};

export default connect(mapStateToProps)(GoogleLoginButton);