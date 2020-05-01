import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as action from '../../store/action';
import jsonServer from '../../api/jsonServer';
import GoogleLoginButton from '../Button/loginButton/googleLoginButton';

const Hero = (props) => {

 useEffect(() => {
 }, [props.auth, props.users.success, props.authData]);

 //Google auth success function
 const responseGoogle = (response) => {
  if (response && !response.error) {
   props.onAuthenticate(response.profileObj, true);

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
   id: props.authData.email,
   name: props.authData.name,
   starred: []
  };
  //save user data to json-server database
  jsonServer.post('/students', data);
 }


 return (
  <div
   className="hero"
   data-test="hero-component">
   <div
    className="hero-body"
    data-test="hero-body">
    <h1>HONE YOUR SKILLS</h1>
    <p>
     Learn from professional intructors.
     It’s easy to learn a new skill,
     and even easier to get started.
     </p>
    <div className="button-wrapper">
     <GoogleLoginButton
      text="Student Login"
      responseGoogle={responseGoogle}
     />
     {
      props.auth ?
       <Link to="/favourite"> Favourite Courses </Link>
       :
       null
     }
    </div>
   </div>
  </div >
 )
};

const mapStateToProps = (state) => {
 return {
  auth: state.authentication.auth,
  authData: state.authentication.authData,
  users: state.users
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onAuthenticate: (authData, auth) => dispatch(action.authenticate(authData, auth)),
  onGetUser: (query) => dispatch(action.getUsers(query))
 }
}

Hero.propTypes = {
 auth: PropTypes.bool,
 authData: PropTypes.object,
 users: PropTypes.object,
 onAuthenticate: PropTypes.func,
 onGetUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Hero);