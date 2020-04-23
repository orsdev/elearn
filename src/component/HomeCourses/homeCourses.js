import React, { Component, Fragment } from 'react';
import * as action from '../../store/action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginNotification from '../loginNotification/loginNotification';
import Spinner from '../Spinner/spinner';
import jsonServer from '../../api/jsonServer';

class HomeCourses extends Component {

 componentDidUpdate(prevProps, prevState) {
  if (this.props.loggedIn !== prevProps.loggedIn) {
   this.props.onGetPlayListId();
  };

  if (this.props.loggedIn && this.props.id !== prevProps.id) {
   this.props.onGetPlayListItems(this.props.id);
  };

  if (!this.props.loggedIn) {
   this.props.onRemovePlayList();
  };

 }

 /* add and remove video 
 from favorite list function */
 favoriteVideo = (e) => {
  let target = e.target;
  let id = target.id;
  let getAttribute = target.getAttribute('data-fav');
  let { email } = this.props.userData;

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

  let playlist;
  let className = "fa fa-heart-o";
  let dataAtrribute;

  if (this.props.playlist !== null) {
   playlist = this.props.playlist.map((item, index) => {
    let videoId = item.snippet.resourceId.videoId;
    let title = item.snippet.title;
    let description = item.snippet.description;

    if (this.props.users.success && this.props.users.user.length) {
     if (this.props.users.user[0].starred.includes(videoId)) {
      className = "fa fa-heart";
      dataAtrribute = "remove";
     } else {
      dataAtrribute = "add";
     }
    }

    return (
     <Fragment key={index}>
      <div className="grid-item" id={videoId}>
       <iframe title={title} src={"https://www.youtube.com/embed/" + videoId} video="true" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
       <div className="courses-body">
        <h4 className="courses-title">{title}</h4>
        <p className="courses-about">{description}</p>
        <div className="fav-icon">
         <i
          className={className}
          data-fav={dataAtrribute}
          id={videoId}
          onClick={this.favoriteVideo}
          aria-hidden="true"></i>
        </div>
       </div>
      </div>
     </Fragment>
    )
   })
  } else {
   playlist = (
    <Spinner />
   )
  }

  return (
   <div
    className="home-courses"
    data-test="home-courses">
    <h2> Courses </h2>
    {!this.props.loggedIn ? <LoginNotification /> :
     <div className="home-courses-container grid-container">
      {playlist}
     </div>
    }
   </div>
  )
 }
}

const mapStateToProps = (state) => {
 return {
  loggedIn: state.authenticate.loggedIn,
  userData: state.authenticate.userData,
  id: state.playListId,
  users: state.users,
  playlist: state.playListItems.playlist
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onGetPlayListId: () => dispatch(action.getPlaylistId()),
  onGetPlayListItems: (id) => dispatch(action.getPlaylistItems(id)),
  onRemovePlayList: () => dispatch(action.removePlaylist()),
  onGetUser: (query) => dispatch(action.getUsers(query))
 }
}

HomeCourses.propTypes = {
 loggedIn: PropTypes.bool,
 id: PropTypes.string,
 playlist: PropTypes.array,
 onGetPlayListId: PropTypes.func,
 onGetPlayListItems: PropTypes.func,
 onRemovePlayList: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCourses);
