import { FOLLOWED, FOLLOW_UNFOLLOW } from './types';

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

export const followUnfollow = (userId, state) => async (dispatch) => {
  try {
    let res;
    if (state === 0) {
      res = await UserService.followUnfollowPost(userId);
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
