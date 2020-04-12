import React from 'react';
import * as action from '../../store/action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

const Button = (props) => {

 const responseGoogle = (response) => {
  if (response) {
   props.onLogInUser(response.profileObj);
  }
 };

 if (!props.auth) {
  var button = (
   <GoogleLogin
    className="hero-button btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Log in with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    isSignedIn={true}
    cookiePolicy={"single_host_origin"} />
  )
 };

 return (
  <div data-test="button-component">
   {button}
  </div>
 )
};

Button.propTypes = {
 onLogInUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
 return {
  auth: state.authenticate.auth,
  user: state.authenticate.user
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onLogInUser: (user) => dispatch(action.logInUser(user))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);