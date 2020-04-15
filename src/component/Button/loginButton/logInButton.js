import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

const LoginButton = (props) => {

 useEffect(() => {

 }, [props.auth]);

 if (!props.auth) {
  var button = (
   <GoogleLogin
    data-test="google-login-button"
    className="login-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Log in with Google"
    onSuccess={props.responseGoogle}
    onFailure={props.responseGoogle}
    isSignedIn={true}
    cookiePolicy={"single_host_origin"} />
  )
 };

 return (
  <div
   data-test="loginButton-component">
   {button}
  </div>
 )
};

LoginButton.propTypes = {
 responseGoogle: PropTypes.func,
 auth: PropTypes.bool
};

export default LoginButton;