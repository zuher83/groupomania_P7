import { RETRIEVE_COMMENTS, CREATE_COMMENT } from '../actions/types';

const initialState = [];

function commentReducer(content = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_COMMENT:
      return [...content, payload];

    case RETRIEVE_COMMENTS:
      return payload;

    default:
      return content;
  }
}

export default commentReducer;
