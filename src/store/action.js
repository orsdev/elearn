import { types } from './types';
import youtube from '../api/youtube';
import jsonServer from '../api/jsonServer';

export const logInUser = (user, auth) => {
 return {
  type: types.LOGIN_USER,
  user: user,
  auth: auth
 }
};

export const logOutUser = () => {
 return {
  type: types.LOGOUT_USER
 }
};

export const removePlaylist = () => {
 return {
  type: types.REMOVE_PLAYLIST
 }
};

export const getPlaylistId = () => {
 return async (dispatch) => {
  await youtube.get('/channels', {
   params: {
    part: 'snippet, statistics, contentDetails',
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    id: process.env.REACT_APP_YOUTUBE_CHANNEL_ID
   }
  })
   .then((response) => {
    let playListId = response.data.items[0].contentDetails.relatedPlaylists.uploads;
    dispatch({
     type: types.PLAYLIST_ID,
     id: playListId
    })
   }).catch(function (error) {
    console.log('playlist id not retrieved', error)
   })
 }
}

export const getPlaylistItems = (id) => {
 return async (dispatch) => {
  await youtube.get('/playlistItems', {
   params: {
    part: 'snippet',
    playlistId: id,
    key: process.env.REACT_APP_YOUTUBE_API_KEY
   }
  })
   .then(function (response) {
    let playlist = response.data.items;
    dispatch({
     type: types.PLAYLIST_ITEMS,
     playlistitems: playlist
    })
   }).catch(function (error) {
    console.log('playlist items not retrieved', error)
   })
 }
}

export const getUsers = (query) => {
 return async (dispatch) => {
  await jsonServer.get(`/${query}`)
   .then(function (response) {
    dispatch({
     type: types.USERS_DATA,
     data: response.data
    })
   })
 }
}