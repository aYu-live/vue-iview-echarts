import Mock from 'mockjs'
import { getUserInfo, login, authorization } from './response/user'
import { getTableData, getFileList, getFolderList } from './response/data'
import {getHomeData,getRealData} from './response/homedata'
const Random = Mock.Random

Mock.mock(/\/getUserInfo/, 'post', getUserInfo)
// Mock.mock(/\/index\/login/, 'post', login)
// Mock.mock(/\/authorization/, 'get', authorization)
Mock.mock(/\/getTableData/, 'get', getTableData)
Mock.mock(/\/getFileList/, 'get', getFileList)
Mock.mock(/\/getFolderList/, 'get', getFolderList)
Mock.mock(/\/getHomeData/, 'get', getHomeData)
Mock.mock(/\/getRealData/, 'get', getRealData)

Mock.setup({
  timeout: 0
})

Random.extend({
  fruit () {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  }
})

export default Mock
