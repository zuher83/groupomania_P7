import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/';

class ContentService {
  allPosts() {
    return axios.get(API_URL + 'posts-all', { headers: authHeader() });
  }

  onePost(postId) {
    return axios.get(API_URL + `posts-get/${postId}`, {
      headers: authHeader()
    });
  }

  myPosts() {
    return axios.get(API_URL + 'posts-my', { headers: authHeader() });
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
    return axios.delete(API_URL + 'posts-delete/', +postId, {
      headers: authHeader()
    });
  }

  allComments(postId) {
    return axios.get(API_URL + `comments-all/${postId}`, {
      headers: authHeader()
    });
  }

  oneComment(commentId) {
    return axios.get(API_URL + `comments/${commentId}`, {
      headers: authHeader()
    });
  }

  createComments(data) {
    console.log(data);
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
