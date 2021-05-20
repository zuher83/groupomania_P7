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
      // console.log('3', state, payload);

      return [...state, payload];

    case RETRIEVE_COMMENTS:
      return payload;
    case COUNT_COMMENTS:
      // console.log('3', state, payload);
      return payload;

    default:
      return state;
  }
}
