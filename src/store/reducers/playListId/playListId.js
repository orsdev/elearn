import { types } from '../../types';

const playListId = (state = null, action) => {
 switch (action.type) {
  case types.PLAYLIST_ID:
   return action.id;
  default:
   return state;
 }
}

export default playListId;