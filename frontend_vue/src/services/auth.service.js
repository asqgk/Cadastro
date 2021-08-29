import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(usuario) {
    return axios
      .post(API_URL + 'signin', {
        username: usuario.username,
        password: usuario.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('usuario', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  register(usuario) {
    return axios.post(API_URL + 'signup', {
      username: usuario.username,
      email: usuario.email,
      password: usuario.password
    });
  }
}

export default new AuthService();