import axios from 'axios';
import authHeader from './auth-header.service';
import * as constant from '../constants/url.constant';

const API_URL = constant.API_URL;

class ContentService {
  allPosts() {
    return axios.get(API_URL + 'posts-all', { headers: authHeader() });
  }

  friendsPosts() {
    return axios.get(API_URL + `posts-friends}`, {
      headers: authHeader()
    });
  }

  onePost(postId) {
    return axios.get(API_URL + `posts-get/${postId}`, {
      headers: authHeader()
    });
  }

  myPosts(userId) {
    return axios.get(API_URL + `posts-my/${userId}`, { headers: authHeader() });
  }

  createPosts(data) {
    return axios.post(API_URL + 'posts-create', data, {
      headers: authHeader()
    });
  }

  updatePosts(postId, data) {
    return axios.put(API_URL + `posts-update/${postId}`, data, {
      headers: authHeader()
    });
  }

  deletePost(postId) {
    return axios.delete(API_URL + `posts-delete/${postId}`, {
      headers: authHeader()
    });
  }

  allComments(postId) {
    return axios.get(API_URL + `comments-all/${postId}`, {
      headers: authHeader()
    });
  }

  countComments(postId) {
    return axios.get(API_URL + `comments-count/${postId}`, {
      headers: authHeader()
    });
  }

  oneComment(commentId) {
    return axios.get(API_URL + `comments/${commentId}`, {
      headers: authHeader()
    });
  }

  createComments(data) {
    return axios.post(API_URL + 'comments-create', data, {
      headers: authHeader()
    });
  }

  likeUnlikePost(data) {
    return axios.post(API_URL + 'posts-likes', data, {
      headers: authHeader()
    });
  }

  likeUnlikeDelete(postId) {
    return axios.delete(API_URL + `posts-likes/${postId.post}`, {
      headers: authHeader()
    });
  }

  getLikes(postId) {
    return axios.get(API_URL + `posts-likes/${postId}`, {
      headers: authHeader()
    });
  }
}

export default new ContentService();
