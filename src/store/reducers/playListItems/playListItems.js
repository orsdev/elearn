import { types } from '../../types';

const playListItems = (state = { playlist: null }, action) => {
 switch (action.type) {
  case types.PLAYLIST_ITEMS:
   return {
    ...state,
    playlist: action.playlistitems
   };
  case types.REMOVE_PLAYLIST:
   return {
    ...state,
    playlist: null
   }
  default:
   return state;
 }
}

export default playListItems;