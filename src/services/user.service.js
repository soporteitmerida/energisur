import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://diesel.grupoitsur.com/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'users',{ headers: authHeader() });
  }
  getUserBoard() {
    return axios.get(API_URL + 'devices',{ headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'vehicles', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getTrips(){
    return axios.get(API_URL + 'trips' 
    + '?groups=260&from=2020-11-25T10:05:00&to=2020-11-28T11:00:00&fields=id,vid,aid,groups,distance,mean_speed,duration,moving,start_time&distance=km&time=minute&speed=kph'
    , {headers: authHeader()});
  }

}
export default new UserService();
