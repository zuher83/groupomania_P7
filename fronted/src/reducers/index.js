import { combineReducers } from 'redux';
import auth from './auth';
import comment from './comment';
import follow from './follow';
import likedislike from './likedislike';
import message from './message';
import posts from './posts';
import profiles from './profiles';

// Combinaison des reducers
export default combineReducers({
  auth,
  comment,
  follow,
  likedislike,
  message,
  posts,
  profiles
});
