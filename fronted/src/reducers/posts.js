import {
  CREATE_POST,
  RETRIEVE_POST,
  RETRIEVE_POSTS,
  UPDATE_POST,
  DELETE_POST
} from '../actions/types';

const initialState = [];

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST:
      return [...state, payload];

    case RETRIEVE_POSTS:
      return payload;

    case RETRIEVE_POST:
      return payload;

    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === payload.id) {
          return {
            ...post,
            ...payload
          };
        } else {
          return post;
        }
      });

    case DELETE_POST:
      return state.filter((post) => post.post_id !== payload);

    default:
      return state;
  }
}

export default postReducer;
