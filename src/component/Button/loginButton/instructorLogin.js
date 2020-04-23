import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as action from '../../../store/action';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import jsonServer from '../../../api/jsonServer';

const InstructorButton = (props) => {

 useEffect(() => {
 }, [props.instructorAuth, props.studentAuth, props.users.success, props.instructorData]);

 //Google auth success function
 const responseGoogle = (response) => {
  if (response && !response.error) {
   props.oninstructorLogIn(response.profileObj, true);

   if (response.profileObj) {
    const { email } = response.profileObj;
    //make a httpRequest to tutors api
    props.onGetUser('tutors?id=' + email);
   }
  }
 };

 //save new users details in json-server
 if (props.users.success && props.users.user.length === 0) {
  const data = {
   id: props.instructorData.email,
   name: props.instructorData.name,
   videoId: [],
   starred: []
  };

  //save user data to json-server database
  jsonServer.post('/tutors', data);
 }



 if (!props.instructorAuth && !props.studentAuth) {
  var button = (
   <GoogleLogin
    data-test="google-login-button"
    className="login-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Instructor Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    isSignedIn={true}
    cookiePolicy={"single_host_origin"} />
  )
 };

 return (
  <div
   data-test="instructorLogin-component">
   {button}
  </div>
 )
};

const mapStateToProps = (state) => {
 return {
  instructorAuth: state.instructorAuthentication.instructorAuth,
  studentAuth: state.studentAuthentication.studentAuth,
  instructorData: state.instructorAuthentication.instructorData,
  users: state.users
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  oninstructorLogIn: (user, auth) => dispatch(action.instructorLogIn(user, auth)),
  onGetUser: (query) => dispatch(action.getUsers(query))
 }
}

InstructorButton.propTypes = {
 oninstructorLogIn: PropTypes.func,
 onGetUser: PropTypes.func,
 instructorAuth: PropTypes.bool,
 instructorData: PropTypes.object,
 studentAuth: PropTypes.bool,
 users: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorButton);