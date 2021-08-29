export default function authHeader() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
  
    if (usuario && usuario.accessToken) {
      return { 'x-access-token': usuario.accessToken };
    } else {
      return {};
    }
  }