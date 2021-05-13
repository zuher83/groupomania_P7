import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER,
  SET_MESSAGE,
  GET_CURRENT_USER,
  GET_USER,
  GET_ALL_USER
} from './types';

import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

export const register = (name, last_name, email, password) => (dispatch) =>
  AuthService.register(name, last_name, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );

export const login = (email, password) => (dispatch) =>
  AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data }
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT
  });
};

export const currentProfile = () => async (dispatch) => {
  try {
    const res = await UserService.getMyProfile();
    dispatch({
      type: GET_CURRENT_USER,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await UserService.getProfile(userId);
    dispatch({
      type: GET_USER,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAllProfile = () => async (dispatch) => {
  try {
    const res = await UserService.getAllProfile();
    dispatch({
      type: GET_ALL_USER,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const editProfile = (userId, data) => async (dispatch) => {
  try {
    const res = await UserService.updateProfile(userId, data);
    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
