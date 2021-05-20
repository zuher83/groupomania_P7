import { RETRIEVE_COMMENTS, CREATE_COMMENT, COUNT_COMMENTS } from './types';

import ContentService from '../services/content.service';

export const createComment = (data) => async (dispatch) => {
  try {
    const res = await ContentService.createComments(data);

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveComments = (postId) => async (dispatch) => {
  try {
    const res = await ContentService.allComments(postId);

    dispatch({
      type: RETRIEVE_COMMENTS,
      payload: res.data
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const countComments = (postId) => async (dispatch) => {
  try {
    const res = await ContentService.countComments(postId);

    dispatch({
      type: COUNT_COMMENTS,
      payload: res.data
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
