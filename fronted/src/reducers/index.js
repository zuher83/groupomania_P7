import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import posts from './posts';
import comment from './comment';
import likedislike from './likedislike';
import profiles from './profiles';

// Combinaison des reducers
export default combineReducers({
  auth,
  message,
  posts,
  profiles,
  comment,
  likedislike
});
