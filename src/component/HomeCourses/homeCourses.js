import React, { useEffect, Fragment } from 'react';
import * as action from '../../store/action';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginNotification from '../loginNotification/loginNotification';

const HomeCourses = (props) => {

 const { auth, id } = props;
 const { onGetPlayListId, onGetPlayListItems, onRemovePlayList } = props;

 useEffect(() => {

  if (auth) {
   onGetPlayListId();
  }

  if (id && auth) {
   onGetPlayListItems(id)
  }

  if (!auth) {
   onRemovePlayList();
  }

 }, [auth, id]);

 if (props.playlist !== null) {
  var playlist = props.playlist.map((item, index) => {
   let videoId = item.snippet.resourceId.videoId;
   let title = item.snippet.title;
   let description = item.snippet.description;

   return (
    <Fragment key={index}>
     <div className="grid-item" id={videoId}>
      <iframe title={title} src={"https://www.youtube.com/embed/" + videoId} video="true" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="courses-body">
       <h4 className="courses-title">{title}</h4>
       <p className="courses-about">{description}</p>
      </div>
     </div>
    </Fragment>
   )
  })
 }

 return (
  <div
   className="home-courses"
   data-test="home-courses">
   <h2> Courses </h2>
   {!auth ? <LoginNotification /> : null}
   <div className="home-courses-container grid-container">
    {playlist}
   </div>
   <div className="btn-wrapper">
    {props.playlist ?
     <NavLink
      to="/all-courses"
      data-btn="home-courses-btn">
      View All Courses
     </NavLink>
     : null}
   </div>
  </div>
 );
}

const mapStateToProps = (state) => {
 return {
  auth: state.authenticate.auth,
  id: state.playListId,
  playlist: state.playListItems.playlist
 }
};

const mapDispatchToProps = (dispatch) => {
 return {
  onGetPlayListId: () => dispatch(action.getPlaylistId()),
  onGetPlayListItems: (id, max) => dispatch(action.getPlaylistItems(id, max)),
  onRemovePlayList: () => dispatch(action.removePlaylist()),
 }
}

HomeCourses.propTypes = {
 auth: PropTypes.bool,
 id: PropTypes.string,
 playlist: PropTypes.array,
 onGetPlayListId: PropTypes.func,
 onGetPlayListItems: PropTypes.func,
 onRemovePlayList: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCourses);
