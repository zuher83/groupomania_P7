import { FOLLOWED, FOLLOW_UNFOLLOW, FOLLOWED_USER } from '../actions/types';

const initialState = [];

function followUnfollow(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FOLLOWED:
      return payload;
    case FOLLOW_UNFOLLOW:
      return payload;
    case FOLLOWED_USER:
      return payload;
    default:
      return state;
  }
}

export default followUnfollow;
