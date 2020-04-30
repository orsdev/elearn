import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import PropTypes from 'prop-types';
import jsonServer from '../../api/jsonServer';
import GoogleLoginButton from '../../component/Button/loginButton/googleLoginButton';
import { Link } from 'react-router-dom';
import Notification from '../Notification/notification';
import Spinner from '../Spinner/spinner';

class InstructorPage extends Component {

 componentDidUpdate(prevProps, prevState) {

  if (this.props.auth) {
   if (this.props.authData !== prevProps.authData) {
    const { email } = this.props.authData;
    this.props.onGetUser('tutors?id=' + email);
   }
  }

  if (this.props.auth) {
   if (this.props.users.success !== prevProps.users.success) {
    if (this.props.users.user.length && this.props.users.user[0].courses.length) {
     //call function and update redux state
     this.props.getUserCourses(this.props.users.user[0].courses, false);

    } else {
     //call function and update redux state
     this.props.getUserCourses(null, true);
    }
   }
  }

  //save new users details in json-server
  if (this.props.auth) {
   if (this.props.users.success !== prevProps.users.success
    && this.props.users.user.length === 0) {

    const data = {
     id: this.props.authData.email,
     name: this.props.authData.name,
     courses: []
    };

    //save user data to json-server database
    jsonServer.post('/tutors', data);
   }
  }

 }

 //Google auth success function
 responseGoogle = (response) => {
  if (response && !response.error) {
   this.props.onAuthenticate(response.profileObj, true);

   if (response.profileObj) {
    const { email } = response.profileObj;
    //make a httpRequest to tutors api
    this.props.onGetUser('tutors?id=' + email);
   }
  }
 };

 render() {

  let course;
  if (this.props.userCourses.courses) {
   course = this.props.userCourses.courses.map((value, index) => {
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
        responseGoogle={this.responseGoogle} />
       {
        this.props.auth ?
         <Link to="/dashboard"> My Dashboard </Link>
         :
         null
       }
      </div>
     </div>
    </div>
    <div className="instructorPage-main">
     <h2>My Courses</h2>
     {!this.props.auth ?
      <Notification
       text="Login to see your courses."
      /> :
      <div className="grid-container">
       {course}
      </div>
     }
     {this.props.auth
      && this.props.userCourses.isEmpty ?
      <Notification
       text="No course was found."
      /> :
      null
     }
     {this.props.auth
      && !this.props.userCourses.courses
      && !this.props.userCourses.isEmpty
      ?
      <Spinner />
      : null
     }
    </div>
   </div>
  );
 }
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
 onAuthenticate: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(InstructorPage);