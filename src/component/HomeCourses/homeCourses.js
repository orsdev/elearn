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
  courses: null,
  toggleFavourite: false,
  favouriteUrl: null,
  favouriteMessage: ""
 }

 /*
  called componentDidMount to update states
  again when you routes to another page
  */
 componentDidMount() {
  const { courses } = this.props.allCourses;
  if (this.props.auth) {
   if (courses.length !== 0) {
    this.setState({
     courses: courses
    })
   } else {
    this.setState({
     emptyCourses: true
    })
   }
  }
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

    /*
    update state(courses) if course is found
    and state(emptyCourses) if none is found
    */
    if (courses.length !== 0) {
     this.setState({
      courses: courses
     })
    } else {
     this.setState({
      emptyCourses: true
     })
    }

   }
  }

  if (this.props.auth) {

   if (this.props.users.success !== prevProps.users.success
    && this.props.users.user.length !== prevProps.users.user.length) {

    const favouriteUrl = this.props.users.user[0].starred.map(function (value) {
     return value.url;
    });

    this.setState({
     favouriteUrl: favouriteUrl
    })
   }
  }

 }

 /* add and remove video 
 from favourite list function */
 favouriteVideo = (e) => {

  this.setState({
   favouriteMessage: ""
  });

  let target = e.target;
  let id = target.id;
  let getAttributeFav = target.getAttribute('data-fav');
  let getAttributeTitle = target.getAttribute('data-title');
  let getAttributeAuthor = target.getAttribute('data-author');
  let getAttributeDescription = target.getAttribute('data-description');

  let { email } = this.props.authData;

  if (getAttributeFav === 'remove') {

   this.setState({
    favouriteMessage: "removed from favourite"
   });

   target.className = "fa fa-heart-o";
   target.setAttribute("data-fav", "add");

   //remove video from favourite list
   jsonServer.get('/students?id=' + email)
    .then(function (response) {
     const data = response.data[0].starred;

     const filterData = data.filter(function (value) {
      return value.url !== id;
     });

     jsonServer.patch('/students/' + email, { starred: filterData });
    });

  } else {

   this.setState({
    favouriteMessage: "added to favourite"
   });

   target.className = "fa fa-heart";
   target.setAttribute("data-fav", "remove");

   //add video to favourite list
   jsonServer.get('/students?id=' + email)
    .then(function (response) {
     const data = response.data[0].starred;
     data.push({
      title: getAttributeTitle,
      description: getAttributeDescription,
      author: getAttributeAuthor,
      url: id
     });
     jsonServer.patch('/students/' + email, { starred: data });
    });

  }

  this.setState({
   toggleFavourite: true
  });

  setTimeout(() => {
   this.setState({
    toggleFavourite: false
   });

  }, 3000)

 }

 render() {

  let course;
  let dataAtrribute;
  let favourite;

  if (this.props.auth && this.props.allCourses.isSuccessful) {

   if (this.state.courses) {

    course = this.state.courses.map((value, index) => {

     if (this.props.users.success && this.props.users.user.length) {

      if (this.state.favouriteUrl) {
       //assign true of false if url is found
       favourite = this.state.favouriteUrl.includes(value.url);

       if (favourite) {
        dataAtrribute = "remove";
       } else {
        dataAtrribute = "add";
       }
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
          {this.state.toggleFavourite ?
           <small>{this.state.favouriteMessage}</small> :
           null
          }
          <p className="course-author">{value.author}</p>
          <i
           onClick={this.favouriteVideo}
           className={favourite ? "fa fa-heart" : "fa fa-heart-o"}
           data-title={value.title}
           data-author={value.author}
           data-description={value.description}
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
   <Fragment>
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
   </Fragment>
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
