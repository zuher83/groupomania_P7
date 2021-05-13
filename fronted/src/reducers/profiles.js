import {
  UPDATE_USER,
  GET_CURRENT_USER,
  GET_USER,
  GET_ALL_USER
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  message: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_USER:
    case GET_CURRENT_USER:
    case GET_USER:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_ALL_USER:
      return {
        ...state,
        profiles: payload
      };
    default:
      return state;
  }
}
