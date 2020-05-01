import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import jsonServer from '../../api/jsonServer';
import Notification from '../Notification/notification';
import Spinner from '../Spinner/spinner';

class FavouriteCourses extends Component {

 state = {
  favourite: null,
  isEmpty: false
 }

 componentDidMount() {

  //get favourite courses when user is authenticated
  if (this.props.auth) {
   let { email } = this.props.authData;
   jsonServer.get('/students?id=' + email)
    .then((response) => {
     const data = response.data[0].starred;

     if (data.length) {
      this.setState({
       favourite: data
      })
     } else {
      this.setState({
       isEmpty: true
      })
     }
    });
  }
 }

 removeFavouriteCourse = (e) => {

  let target = e.target;
  let id = target.id;

  let { email } = this.props.authData;

  //remove video from favourite list
  jsonServer.get('/students?id=' + email)
   .then(function (response) {
    const data = response.data[0].starred;

    const filterData = data.filter(function (value) {
     return value.url !== id;
    });

    jsonServer.patch('/students/' + email, { starred: filterData })
     .then((response) => {
      if (response.status === 200) {
       //remove element from the dom
       target.parentElement.parentElement.remove();
      }
     })
   });
 }

 render() {

  let courses;
  if (this.state.favourite) {
   courses = this.state.favourite.map((value, index) => {
    return (
     <Fragment key={index}>
      <div className="grid-item">
       <div className="grid-body">
        <i
         onClick={this.removeFavouriteCourse}
         id={value.url}
         className="fa fa-times"
         aria-hidden="true"></i>
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
      </div>
     </Fragment>
    )
   });
  };

  return (
   <Fragment>
    {
     !this.props.auth ?
      <Redirect to="/" />
      : null
    }
    <div className="favouriteCourses">
     <nav className="favouriteCourses-nav home-nav">
      <Link to="/">
       <i className=" fa fa-arrow-left"></i>
       Home
       </Link>
     </nav>
     <h2> Favourite Courses</h2>
     {
      this.state.favourite
       && !this.state.isEmpty
       ?
       <div className="favouriteCourses-container grid-container">
        {courses}
       </div>
       :
       null
     }
     {
      !this.state.favourite
       && this.state.isEmpty
       ?
       <Notification
        text="You don't have a favourite course" />
       :
       null
     }
     {
      !this.state.favourite
       && !this.state.isEmpty
       ?
       <Spinner />
       :
       null
     }
    </div>
   </Fragment>
  )
 }
};

FavouriteCourses.propTypes = {
 authData: PropTypes.object,
 auth: PropTypes.bool
};

const mapStateToProps = (state) => {
 return {
  auth: state.authentication.auth,
  authData: state.authentication.authData
 }
};

export default connect(mapStateToProps)(FavouriteCourses);