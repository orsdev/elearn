import React, { useState, useEffect, Fragment } from 'react';
import * as action from '../../store/action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notification from '../Notification/notification';
import Spinner from '../Spinner/spinner';
import jsonServer from '../../api/jsonServer';

const HomeCourses = (props) => {

 const [emptyCourses, setEmptyCourses] = useState(false);
 const [courses, setCourses] = useState(null);

 useEffect(() => {

  //get all courses when user is authenticated
  if (props.auth) {
   props.onGetAllCourses();
  }

 }, [props.auth])

 useEffect(() => {

  if (props.auth) {
   if (props.allCourses.courses
    && props.allCourses.isSuccessful) {

    const { courses } = props.allCourses;
    /*
    update props(courses) if course is found
    and props(emptyCourses) if none is found
    */
    if (courses.length !== 0) {
     setCourses(courses)
    } else {
     setEmptyCourses(true)
    }

   }
  }

 }, [props.allCourses]);

 useEffect(() => {

  //re-update user's data
  if (props.auth) {
   if (props.authData) {
    props.onGetUser('students?id=' + props.authData.email)
   }
  }

 }, [props.authData]);


 /* add and remove video 
 from favourite list function */
 const favouriteVideo = (e) => {

  let target = e.target;
  let id = target.id;
  let getAttributeFav = target.getAttribute('data-fav');
  let getAttributeTitle = target.getAttribute('data-title');
  let getAttributeAuthor = target.getAttribute('data-author');
  let getAttributeDescription = target.getAttribute('data-description');

  //get clicked favourite icon parent element
  const elementParent = target.parentElement;
  //create a new dom element(small)
  const small = document.createElement('small');
  small.textContent = "";

  let { email } = props.authData;

  if (getAttributeFav === 'remove') {

   small.textContent = "removed from favourite";

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

   small.textContent = "added to favourite";

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

  elementParent.append(small);

  //set small(element) to empty string after 2seconds
  setTimeout(() => {
   small.textContent = "";
  }, 2000);

 }

 if (props.auth && courses) {

  if (courses) {

   var course = courses.map((value, index) => {

    if (props.users.success && props.users.user.length) {

     const favouriteUrl = props.users.user[0].starred.map(function (value) {
      return value.url;
     });

     if (favouriteUrl) {
      //assign true of false if url is found
      var favourite = favouriteUrl.includes(value.url);
      var dataAtrribute;

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
         <p className="course-author">{value.author}</p>
         <i
          onClick={favouriteVideo}
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
    {!props.auth ?
     <Notification
      text="Login to see available courses."
     /> :
     <div className="home-courses-container grid-container">
      {course}
     </div>
    }
    {props.auth
     && emptyCourses ?
     <Notification
      text="No course was found."
     /> :
     null
    }
    {props.auth
     && !emptyCourses
     && !courses
     ?
     <Spinner />
     : null
    }
   </div>
  </Fragment>
 )
}

const mappropsToProps = (props) => {
 return {
  auth: props.authentication.auth,
  authData: props.authentication.authData,
  users: props.users,
  allCourses: props.allCourses
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

export default connect(mappropsToProps, mapDispatchToProps)(HomeCourses);
