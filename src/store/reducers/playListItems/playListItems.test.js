import PlayListItems from './playListItems';
import { types } from '../../types';

describe('playListItems Reducer', () => {

 test('Should return default state', () => {
  const playListItems = PlayListItems(null, {});
  expect(playListItems).toEqual(null);
 });

 test('Should return new state if action.type(PLAYLIST_ITEMS) is provided', () => {

  const action = {
   type: types.PLAYLIST_ITEMS,
   playlistitems: []
  }

  const OldState = {
   playlist: null
  }

  const playListItems = PlayListItems(OldState, action);
  expect(playListItems).toEqual({ playlist: [] });
 });

 test('Should return new state if action.type(REMOVE_PLAYLIST) is provided', () => {

  const action = {
   type: types.REMOVE_PLAYLIST,
   playlist: null
  }

  const OldState = {
   playlist: null
  }

  const playListItems = PlayListItems(OldState, action);
  expect(playListItems).toEqual({ playlist: null });
 });

});