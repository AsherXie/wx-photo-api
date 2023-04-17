import axios from 'axios';

export function login(data) {
  return axios({
    method: 'post',
    url: '/test/api/login',
    data
  });
}

export function getUserInfo() {
  return axios({
    method: 'post',
  });
}
