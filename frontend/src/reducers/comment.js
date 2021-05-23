import {
  RETRIEVE_COMMENTS,
  CREATE_COMMENT,
  COUNT_COMMENTS
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_COMMENT:
      return [...state, payload];

    case RETRIEVE_COMMENTS:
      return payload;
    case COUNT_COMMENTS:
      return payload;

    default:
      return state;
  }
}
