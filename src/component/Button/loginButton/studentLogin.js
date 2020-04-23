import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as action from '../../../store/action';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import jsonServer from '../../../api/jsonServer';

const StudentLogin = (props) => {

 useEffect(() => {
 }, [props.studentAuth, props.users.success, props.studentData, props.instructorAuth]);

 //Google auth success function
 const responseGoogle = (response) => {
  if (response && !response.error) {
   props.onStudentLogin(response.profileObj, true);

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
   id: props.studentData.email,
   name: props.studentData.name,
   starred: []
  };
  //save user data to json-server database
  jsonServer.post('/students', data);
 }



 if (!props.instructorAuth && !props.studentAuth) {
  var button = (
   <GoogleLogin
    data-test="google-login-button"
    className="login-btn"
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Student Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    isSignedIn={true}
    cookiePolicy={"single_host_origin"} />
  )
 };

 return (
  <div
   data-test="studentLogin-component">
   {button}
  </div>
 )
};

const mapStateToProps = (state) => {
 return {
  studentAuth: state.studentAuthentication.studentAuth,
  instructorAuth: state.instructorAuthentication.instructorAuth,
  studentData: state.studentAuthentication.studentData,
  users: state.users
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onStudentLogin: (user, auth) => dispatch(action.studentLogIn(user, auth)),
  onGetUser: (query) => dispatch(action.getUsers(query))
 }
}

StudentLogin.propTypes = {
 onStudentLogin: PropTypes.func,
 onGetUser: PropTypes.func,
 studentAuth: PropTypes.bool,
 instructorAuth: PropTypes.bool,
 studentData: PropTypes.object,
 users: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentLogin);