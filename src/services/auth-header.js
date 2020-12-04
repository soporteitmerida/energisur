export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.auth) {
    //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    //return { 'x-access-token': user.auth };       // for Node.js Express back-end
    console.log('prueba auth-header: ', user);
    return{
      Authenticate: user.auth
    };
  } else {
    return {};
  }
}
