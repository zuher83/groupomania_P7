import {
  CREATE_POST,
  RETRIEVE_POSTS,
  RETRIEVE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKEDISLIKE,
  UPDATE_LIKE_UNLIKE
} from './types';

import ContentService from '../services/content.service';

export const createPost = (datas) => async (dispatch) => {
  try {
    const res = await ContentService.createPosts(datas);

    dispatch({
      type: CREATE_POST,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveAllPosts = () => async (dispatch) => {
  try {
    const res = await ContentService.allPosts();
    dispatch({
      type: RETRIEVE_POSTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveMyPosts = () => async (dispatch) => {
  try {
    const res = await ContentService.myPosts();
    dispatch({
      type: RETRIEVE_POSTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveOnePost = (postId) => async (dispatch) => {
  try {
    const res = await ContentService.onePost(postId);
    dispatch({
      type: RETRIEVE_POST,
      payload: res.data
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (postId, data) => async (dispatch) => {
  try {
    const res = await ContentService.updatePosts(postId, data);

    dispatch({
      type: UPDATE_POST,
      payload: data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await ContentService.deletePost(postId);

    dispatch({
      type: DELETE_POST,
      payload: { postId }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getLikes = (postId) => async (dispatch) => {
  try {
    const res = await ContentService.getLikes(postId);
    dispatch({
      type: LIKEDISLIKE,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const likeUnlike = (postId, state) => async (dispatch) => {
  try {
    let res;
    if (state === 0) {
      res = await ContentService.likeUnlikePost(postId);
    } else {
      res = await ContentService.likeUnlikeDelete(postId);
    }

    dispatch({
      type: UPDATE_LIKE_UNLIKE,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};