import axios from 'axios';
//import { data } from 'jquery';

/*const API_URL = 'http://localhost:8080/api/auth/';*/
const API_URL = 'https://diesel.grupoitsur.com/api/login';

class AuthService {
  login(user) {
    return axios
      /*.post(API_URL + 'signin', {*/
        .post(API_URL + '', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.auth) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log('usuario: ',response.data.auth);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
