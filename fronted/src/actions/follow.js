import { FOLLOWED, FOLLOW_UNFOLLOW, FOLLOWED_USER } from './types';

import UserService from '../services/user.service';

export const getFollowed = (userId) => async (dispatch) => {
  try {
    const res = await UserService.FollowUnfollowGet(userId);
    dispatch({
      type: FOLLOWED,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserFollowed = (userId) => async (dispatch) => {
  try {
    const res = await UserService.FollowUnfollowAllGet(userId);
    dispatch({
      type: FOLLOWED_USER,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const followUnfollow = (userId, state) => async (dispatch) => {
  try {
    let res;
    if (state === 0) {
      const user = { user: userId };
      res = await UserService.followUnfollowPost(user);
    } else {
      res = await UserService.followUnfollowDelete(userId);
    }

    dispatch({
      type: FOLLOW_UNFOLLOW,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
