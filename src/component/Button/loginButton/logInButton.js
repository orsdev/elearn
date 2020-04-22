import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as action from '../../../store/action';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import jsonServer from '../../../api/jsonServer';

const LoginButton = (props) => {

 useEffect(() => {
 }, [props.loggedIn, props.users.success, props.userData]);

 //Google auth success function
 const responseGoogle = (response) => {
  if (response && !response.error) {
   props.onLogInUser(response.profileObj, true);

   if (response.profileObj) {
    const { email } = response.profileObj;
    //make a httpRequest to student api
    props.onGetUser('students?id=' + email);
   }
  }
 };

 //save new users details in json-server
 if (props.users.success && props.users.user.length === 0) {
  const data = {
   id: props.userData.email,
   name: props.userData.name,
   starred: []
  };
  //save user data to json-server database
  jsonServer.post('/students', data);
 }



 if (!props.loggedIn) {
  var button = (
   <GoogleLogin
    data-test="google-login-button"
    className="login-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText={props.text}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
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

const mapStateToProps = (state) => {
 return {
  loggedIn: state.authenticate.loggedIn,
  userData: state.authenticate.userData,
  users: state.users
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onLogInUser: (user, auth) => dispatch(action.logInUser(user, auth)),
  onGetUser: (query) => dispatch(action.getUsers(query))
 }
}

LoginButton.propTypes = {
 onLogInUser: PropTypes.func,
 onGetUser: PropTypes.func,
 loggedIn: PropTypes.bool,
 userData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);