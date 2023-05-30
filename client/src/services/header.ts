export default function authHeader() {
  const userJson = localStorage.getItem('user')
  const user = userJson !== null ? JSON.parse(userJson) : {}

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken };
    return { 'x-auth-token': user.accessToken }
  } else {
    return {}
  }
}
