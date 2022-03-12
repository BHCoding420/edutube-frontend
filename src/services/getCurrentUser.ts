import jwt_decode from 'jwt-decode';



export function getCurrentUser() {
  try {
    const token:any = localStorage.getItem("token");
    //console.log(token);
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
}

export function log_out() {
  try {
    const token = localStorage.removeItem("token");
    //console.log(token);
    window.location.reload();
  } catch (error) {
    return null;
  }
}
