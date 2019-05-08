import Mock from 'mockjs'
const Random = Mock.Random
import { doCustomTimes, doIntervalTime } from '@/lib/tools'

export const getHomeData = () => {
  const template1 = {
    'title': '新增用戶',
    'icon': 'icon_addperson',
    'count|500-800': 0,
    'color': '#2d8cf0'
  }
  const template2 = {
    'title': '累计点击',
    'icon': 'icon_addperson',
    'count': 233,
    'color': '#19be6b'
  }
  const template3 = {
    'title': '分享统计',
    'icon': 'icon_addperson',
    'count': 20,
    'color': '#ed3f14'
  }
  const template4 = {
    'title': '新增页面',
    'icon': 'icon_addperson',
    'count|6-10': 0,
    'color': '#9A66E4'
  }
  const template5 = {
    'title': '新增互动',
    'icon': 'icon_addperson',
    'count': 22,
    'color': '#E46CBB'
  }
  let arr = []
  doCustomTimes(1, () => {
    arr.push(Mock.mock(template1))
  })
  doCustomTimes(1, () => {
    arr.push(Mock.mock(template2))
  })
  doCustomTimes(1, () => {
    arr.push(Mock.mock(template3))
  })
  doCustomTimes(1, () => {
    arr.push(Mock.mock(template4))
  })
  doCustomTimes(1, () => {
    arr.push(Mock.mock(template5))
  })
  return arr
}

var realarr=[]
export const getRealData = () => {
  const template = {
    'id':'1',
    'name':'设备1',
    'time': Random.now(),
    'value|1000-1500':0
  }
  doCustomTimes(1, () => {
    realarr.push(Mock.mock(template))
  })
  return realarr
}