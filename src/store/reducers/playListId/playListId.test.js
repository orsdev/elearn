import PlayListId from './playListId';
import { types } from '../../types';

describe('playListId reducer', () => {

 test('Should return default state', () => {
  const playListId = PlayListId(null, {});
  expect(playListId).toEqual(null);
 });

 test('Should return new state if action.type( PLAYLIST_ID) is provided', () => {

  const newState = {
   type: types.PLAYLIST_ID,
   id: 'id'
  }

  const playListId = PlayListId(null, newState);
  expect(playListId).toEqual('id');
 });

});
