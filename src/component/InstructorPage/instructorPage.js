import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import PropTypes from 'prop-types';
import jsonServer from '../../api/jsonServer';
import GoogleLoginButton from '../../component/Button/loginButton/googleLoginButton';
import { Link } from 'react-router-dom';
import Notification from '../Notification/notification';
import Spinner from '../Spinner/spinner';

const InstructorPage = (props) => {

 useEffect(() => {

  /*
   when user is authenticated
   get user details from json-server(db)
   */
  if (props.auth && props.authData) {
   const { email } = props.authData;
   props.onGetUser('tutors?id=' + email);
  }

 }, [props.auth]);

 useEffect(() => {

  //save new users details in json-server
  if (props.users.success
   && props.users.user.length === 0) {

   const data = {
    id: props.authData.email,
    name: props.authData.name,
    courses: []
   };

   //save user data to json-server database
   jsonServer.post('/tutors', data);
  }

 }, [props.users.success]);

 useEffect(() => {

  if (props.auth) {
   if (props.users.user.length
    && props.users.user[0].courses.length) {
    //call function and update redux state
    props.getUserCourses(props.users.user[0].courses, false);

   } else {
    //call function and update redux state
    props.getUserCourses(null, true);
   }
  }

 }, [props.users.user]);

 //Google auth success function
 const responseGoogle = (response) => {
  if (response && !response.error) {
   props.onAuthenticate(response.profileObj, true);

   if (response.profileObj) {
    const { email } = response.profileObj;
    //make a httpRequest to tutors api
    props.onGetUser('tutors?id=' + email);
   }
  }
 };

 if (props.userCourses.courses) {
  var course = props.userCourses.courses.map((value, index) => {
   return (
    <Fragment key={index}>
     <div className="grid-item" id={value.url}>
      <video width="400" controls>
       <source src={value.url} type="video/mp4" />
      Your browser does not support HTML5 video.
     </video>
      <div className="course-body">
       <h4 className="course-title">{value.title}</h4>
       <p className="course-about">{value.description}</p>
       <p className="course-author author-name">{value.author}</p>
      </div>
     </div>
    </Fragment>
   )
  })
 }

 return (
  <div
   data-test="instructorPage-component"
   className="instructorPage">
   <div className="instructorPage-hero">
    <div className="instructorPage-hero-body">
     <h1>Launch Your Course For Free</h1>
     <div className="button-wrapper">
      <GoogleLoginButton
       text="Instructor Login"
       responseGoogle={responseGoogle} />
      {
       props.auth ?
        <Link to="/dashboard"> My Dashboard </Link>
        :
        null
      }
     </div>
    </div>
   </div>
   <div className="instructorPage-main">
    <h2>My Courses</h2>
    {!props.auth ?
     <Notification
      text="Login to see your courses."
     /> :
     <div className="grid-container">
      {course}
     </div>
    }
    {props.auth
     && props.userCourses.isEmpty ?
     <Notification
      text="No course was found."
     /> :
     null
    }
    {props.auth
     && !props.userCourses.courses
     && !props.userCourses.isEmpty
     ?
     <Spinner />
     : null
    }
   </div>
  </div>
 );
}

const mapStateToProps = (state) => {
 return {
  auth: state.authentication.auth,
  authData: state.authentication.authData,
  users: state.users,
  userCourses: state.userCourses
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onGetUser: (query) => dispatch(action.getUsers(query)),
  onLogOutUser: () => dispatch(action.logOutUser()),
  onAuthenticate: (authData, auth) => dispatch(action.authenticate(authData, auth)),
  getUserCourses: (courses, isEmpty) => dispatch(action.userCourses(courses, isEmpty))
 }
}

InstructorPage.propTypes = {
 auth: PropTypes.bool,
 authData: PropTypes.object,
 users: PropTypes.object,
 onGetUser: PropTypes.func,
 onLogOutUser: PropTypes.func,
 onAuthenticate: PropTypes.func,
 getUserCourses: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(InstructorPage);