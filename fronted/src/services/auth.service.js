import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + 'signin', { email, password });
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
    return axios.post(API_URL + 'signup', {
      name,
      last_name,
      email,
      password,
      joined
    });
  }
}

export default new AuthService();
