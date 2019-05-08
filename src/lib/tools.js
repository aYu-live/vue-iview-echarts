export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}
/**
 * @description 定时器，模拟实时推送
 */
export const doIntervalTime = (time,times,callback) => {
    let i = -1
  setInterval(() => {
    while(++i<times){
      callback(i)
    }
  },time)
}


export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  else return !keysArr1.some(key => obj1[key] !== obj2[key])
}

/**
 * @description 绑定监听事件 on(element, event, handler)
 */
export const on =(function (){
  if(document.addEventListener){
    return function(element, event, handler) {
      if(element && event && handler){
        element.addEventListener(event, handler, false)
      }
    }
  } else{
    return function(element, event, handler) {
      if(element && event && handler){
        element.attachEvent('on'+ event, handler)
      }
    } 
  }
})()

/**
 * @description 解绑监听事件 off(element, event, handler)
 */
export const off=(function(){
  if(document.removeEventListener){
    return function(element, event, handler) {
      if(element && event && handler){
        element.removeEventListener(event, handler, false)
      }
    }
  } else{
    return function(element, event, handler) {
      if(element && event && handler){
        element.detachEvent('on'+ event, handler)
      }
    } 
  }
})()