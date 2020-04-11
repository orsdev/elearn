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