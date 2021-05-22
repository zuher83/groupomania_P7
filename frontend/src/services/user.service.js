import axios from 'axios';
import authHeader from './auth-header.service';
import * as constant from '../constants/url.constant';

const API_URL = constant.API_URL;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'public');
  }

  getHome() {
    return axios.get(API_URL + 'home', { headers: authHeader() });
  }

  deleteUser(userId) {
    return axios.delete(API_URL + `user/${userId}`, {
      headers: authHeader()
    });
  }

  updateProfile(userId, data) {
    return axios.put(API_URL + `user-update/${userId}`, data, {
      headers: authHeader()
    });
  }

  updateProfileImage(userId, data) {
    console.log(data);
    let headers = authHeader();
    headers['Content-Type'] = 'multipart/form-data';
    return axios.put(API_URL + `user-update/${userId}`, data, {
      headers
    });
  }

  getProfile(userId) {
    return axios.get(API_URL + `user/${userId}`, {
      headers: authHeader()
    });
  }

  getMyProfile() {
    return axios.get(API_URL + 'me', {
      headers: authHeader()
    });
  }

  getAllProfile() {
    return axios.get(API_URL + 'users', {
      headers: authHeader()
    });
  }

  getRole(userId) {
    return axios.get(API_URL + `role/${userId}`, {
      headers: authHeader()
    });
  }

  updateRole(userId, data) {
    return axios.put(API_URL + `role/${userId}`, data, {
      headers: authHeader()
    });
  }

  // Follow call Api
  followUnfollowPost(data) {
    return axios.post(API_URL + 'follow', data, {
      headers: authHeader()
    });
  }

  followUnfollowDelete(userId) {
    return axios.delete(API_URL + `follow/${userId}`, {
      headers: authHeader()
    });
  }

  FollowUnfollowGet(userId) {
    return axios.get(API_URL + `follow/${userId}`, {
      headers: authHeader()
    });
  }

  FollowUnfollowAllGet(userId) {
    return axios.get(API_URL + `followed/${userId}`, {
      headers: authHeader()
    });
  }
}

export default new UserService();
