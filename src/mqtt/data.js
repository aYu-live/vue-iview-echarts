import axios from './index'

export const getV1Real = () => {
  return axios.request({
    // baseURL:'http://192.168.21.233',
    url: '/API/V1/real',
    method: 'get'
  })
}