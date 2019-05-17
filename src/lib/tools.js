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

/**
 * @description 数组遍历删除
 */
export const deleteByArray=((item,arr)=>{
  arr.splice(arr.findIndex(v => v==item),1);
})

/**
 * @description 验证数组中是否存在值
 */
export const checkArrayhas=((item,arr)=>{
  if(arr==null&&!arr){
    return false
  }else{
    for(let index of arr){
      if(index.subTopic===item){
        return true
      }else{
        return false
      }
    }
  }
  
})

/**
 * 
 */
export const Uint8ArrayToString=((array)=>{
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
        break;
    }
    }
 
    return out;
})
/**
 * @description 日期格式
 */
export const formatDate=((time)=>{
    const hours=time.getHours()<10?'0'+time.getHours():time.getHours()
    const minutes=time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes()
    const seconds=time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds()
    return hours+':'+minutes+':'+seconds
  })