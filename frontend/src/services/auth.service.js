import axios from 'axios';
import * as constant from '../constants/url.constant';

const API_URL = constant.API_URL;

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + 'auth/signin', {
      email,
      password
    });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(name, last_name, email, password) {
    // const dateNow = new Date.now();
    const joined = { joined: Date.now() };
    return axios.post(API_URL + 'auth/signup', {
      name,
      last_name,
      email,
      password,
      joined
    });
  }
}

export default new AuthService();
