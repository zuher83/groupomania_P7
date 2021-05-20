import { LIKEDISLIKE, UPDATE_LIKE_UNLIKE } from '../actions/types';

const initialState = [];

function likeDislike(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LIKEDISLIKE:
      return payload;
    case UPDATE_LIKE_UNLIKE:
      return payload;

    default:
      return state;
  }
}

export default likeDislike;
