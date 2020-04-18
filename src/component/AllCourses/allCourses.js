import React, { useEffect, Fragment } from 'react';
import * as action from '../../store/action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AllCourses = (props) => {

 const { auth, id } = props;
 const { onGetPlayListId, onGetPlayListItems, onRemovePlayList } = props;

 useEffect(() => {

  if (auth) {
   onGetPlayListId();
  }

  if (id && auth) {
   onGetPlayListItems(id, null)
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
    <Fragment key={index + videoId}>
     <div className="grid-item" id={videoId}>
      <iframe title={title} src={"https://www.youtube.com/embed/" + videoId} video="true" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="courses-body">
       <h4 className="courses-title">{title}</h4>
       <p className="courses-about">{description}</p>
       <div className="fav-icon">
        <i className="fa fa-heart-o" data-fav="add-fav" id={videoId} aria-hidden="true"></i>
       </div>
      </div>
     </div>
    </Fragment>
   )
  })
 }

 return (
  <div
   data-test="all-courses"
   className="allCourses">
   <h2>All Courses </h2>
   <div className="grid-container">
    {!auth ? <Redirect to="/" /> : null}
    {playlist}
   </div>
  </div>
 )
};

AllCourses.propTypes = {
 auth: PropTypes.bool,
 id: PropTypes.string,
 playlist: PropTypes.object,
 onGetPlayListId: PropTypes.func,
 onGetPlayListItems: PropTypes.func,
 onRemovePlayList: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCourses);
