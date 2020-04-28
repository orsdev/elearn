import React, { Component, Fragment } from 'react';
import * as action from '../../store/action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notification from '../Notification/notification';
import Spinner from '../Spinner/spinner';
import jsonServer from '../../api/jsonServer';

class HomeCourses extends Component {

 state = {
  emptyCourses: false,
  courses: null
 }

 componentDidUpdate(prevProps, prevState) {
  /*
  get all available course when user is authenticated
  */
  if (this.props.auth) {
   if (this.props.auth !== prevProps.auth) {
    this.props.onGetAllCourses();
   }
  }

  if (this.props.auth) {
   if (this.props.allCourses !== prevProps.allCourses) {

    const { courses } = this.props.allCourses;

    const extractCourses = courses.filter(function (value) {
     return value.courses.length !== 0;
    }).map(function (value) {
     return [...value.courses];
    });

    /*
    update state(courses) if course is found
    and state(emptyCourses) if none is found
    */
    if (extractCourses.length !== 0) {
     this.setState({
      courses: extractCourses.flat()
     })
    } else {
     this.setState({
      emptyCourses: true
     })
    }

   }
  }

 }


 /* add and remove video 
 from favorite list function */
 favoriteVideo = (e) => {
  let target = e.target;
  let id = target.id;
  let getAttribute = target.getAttribute('data-fav');
  let { email } = this.props.authData;

  if (getAttribute === 'remove') {

   target.className = "fa fa-heart-o";
   target.setAttribute("data-fav", "add");

   //remove video from favorite list
   jsonServer.get('/students?id=' + email)
    .then(function (response) {
     const data = response.data[0].starred;

     const filterData = data.filter(function (value) {
      return value !== id;
     });

     jsonServer.patch('/students/' + email, { starred: filterData });
    });

  } else {
   target.className = "fa fa-heart";
   target.setAttribute("data-fav", "remove");

   //add video to favorite list
   jsonServer.get('/students?id=' + email)
    .then(function (response) {
     const data = response.data[0].starred;
     data.push(id);
     jsonServer.patch('/students/' + email, { starred: data });
    });

  }

 }

 render() {

  let course;
  let dataAtrribute;
  let favorite;

  if (this.props.auth && this.props.allCourses.isSuccessful) {

   if (this.state.courses) {
    course = this.state.courses.map((value, index) => {

     if (this.props.users.success && this.props.users.user.length) {

      //assign true of false if url is found
      favorite = this.props.users.user[0].starred.includes(value.url);

      if (favorite) {
       dataAtrribute = "remove";
      } else {
       dataAtrribute = "add";
      }
     }

     return (
      <Fragment key={index}>
       <div className="grid-item">
        <video width="400" controls>
         <source src={value.url} type="video/mp4" />
      Your browser does not support HTML5 video.
     </video>
        <div className="course-body">
         <h4 className="course-title">{value.title}</h4>
         <p className="course-about">{value.description}</p>
         <div className="course-body-footer">
          <p className="course-author">{value.author}</p>
          <i
           onClick={this.favoriteVideo}
           className={favorite ? "fa fa-heart" : "fa fa-heart-o"}
           data-fav={dataAtrribute}
           aria-hidden="true"
           id={value.url}></i>
         </div>
        </div>
       </div>
      </Fragment>
     )
    })
   }
  }

  return (
   <div
    className="home-courses"
    data-test="home-courses">
    <h2> Courses </h2>
    {!this.props.auth ?
     <Notification
      text="Login to see available courses."
     /> :
     <div className="home-courses-container grid-container">
      {course}
     </div>
    }
    {this.props.auth
     && this.state.emptyCourses ?
     <Notification
      text="No course was found."
     /> :
     null
    }
    {this.props.auth
     && !this.state.emptyCourses
     && !this.state.courses
     ?
     <Spinner />
     : null
    }
   </div>
  )
 }
}

const mapStateToProps = (state) => {
 return {
  auth: state.authentication.auth,
  authData: state.authentication.authData,
  users: state.users,
  allCourses: state.allCourses
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onGetUser: (query) => dispatch(action.getUsers(query)),
  onGetAllCourses: () => dispatch(action.getAllCourses())
 }
}

HomeCourses.propTypes = {
 auth: PropTypes.bool,
 authData: PropTypes.object,
 users: PropTypes.object,
 allCourses: PropTypes.object,
 onGetUser: PropTypes.func,
 onGetAllCourses: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCourses);
