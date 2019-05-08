import axios from './index'

export const getUserInfo = ({ userId }) => {
  return axios.request({
    url: '/getUserInfo',
    method: 'post',
    data: {
      userId
    }
  })
}

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/login',
    data,
    method: 'post'
  })
}

export const authorization = () => {
  return axios.request({
    url: '/users/authorization',
    method: 'get'
  })
}
