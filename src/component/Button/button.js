import React, { useEffect } from 'react';
import * as action from '../../store/action';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

const Button = (props) => {

 const responseGoogle = (response) => {
  if (response) {
   props.onGetUser(response.profileObj);
  }
 };

 if (!props.auth) {
  var button = (
   <GoogleLogin
    className="hero-button btn"
    clientId="298090003140-a782s0vh75oft0704e1q65i5m07f7oan.apps.googleusercontent.com"
    buttonText="Log in with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={"single_host_origin"} />
  )
 };

 return (
  <div data-test="button-component">
   {button}
  </div>
 )
};

const mapStateToProps = (state) => {
 return {
  auth: state.authenticate.auth,
  user: state.authenticate.user
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onGetUser: (user) => dispatch(action.getUser(user))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);