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
  console.log('delect',item,arr);
  arr.splice(arr.findIndex(v =>v.subTopic==item),1);
  return arr
})

/**
 * @description 验证数组中是否存在值
 */
export const checkArrayhas=((item,arr)=>{
  if(arr==null&&!arr){
    return false
  }else{
    for(let i of arr){
      if(i.subTopic===item){
        return true
      }
    }
    return false
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

/**
 * @description AHU按设备名号数分组 返回对象
 * @param {*} str 
 * @param {*} arr 
 */
function returnAHUObj(str,arr){
  const obj=new Object()
  Object.keys(arr).forEach((item,index) => {
    if(item.includes(str)){
      obj[item.substr(5,2)]=(arr[item])/10
    }
  })
  return obj
}

/**
 * @description VAV按设备名号数分组 返回对象
 * @param {*} str 
 * @param {*} arr 
 */
function returnVAVObj(str,arr){
  const obj=new Object()
  Object.keys(arr).forEach((item,index) => {
    if(item.includes(str)){
      if(['T','P','A'].includes(item.substr(6,1))){
        obj[item.substr(6,1)]=(arr[item])/10
      }else{
        obj[item.substr(6,1)]=(arr[item])
      }
    }
  })
  return obj
}

/**
 * @description 处理AHU的数据，返回数据数组
 * @param {*} strArr 
 * @param {*} arr 
 */
export const returnAHUArray=((strArr,arr)=>{
  const arr1=[]
  for (let i = 0; i < strArr.length; i++) {
    var obj=returnAHUObj(strArr[i],arr)
    obj['id']=i+1
    obj['device']='AHU'+(i+1)
    obj['partition']='风柜'
    arr1.push(obj)
  }
  return arr1
})

/**
 * @description 处理VAV的数据，返回数据数组
 * @param {*} strArr 
 * @param {*} arr 
 */
export const returnVAVArray=((strArr,arr)=>{
  const arr1=[]
  for (let i = 0; i < strArr.length; i++) {
    var obj=returnVAVObj(strArr[i],arr)
    obj['id']=i+1
    if(i===29){
      obj['device']='VAV-'+(i+1)+'-DT'
    }else{
      obj['device']='VAV-'+((i+1)<10?'0'+(i+1):(i+1))
    }
    obj['partition']=casePartition((i+1))
    arr1.push(obj)
  }
  return arr1
})


/**
 * 
 * @description 创建数组
 * @param {} str1 
 * @param {*} str2 
 */
function pushArr(str1,str2){
  const arr=[]
  for(let i=str1;i<=str2;i++){
    i=i<10?'0'+i:i
    arr.push(i)
  }
  return arr
}

/**
 * @description 筛选AHU重复数据，返回不重复的数据数组
 * @param {*} AHUObject 
 */
export const filterAHUArrSame=((AHUObject)=>{
  return Array.from(new Set(Object.keys(AHUObject).map(item=>item.substr(0,5))))
}) 

/**
 * @description 筛选VAV重复数据，返回不重复的数据数组
 * @param {*} AHUObject 
 */
export const filterVAVArrSame=((AHUObject)=>{
  return Array.from(new Set(Object.keys(AHUObject).map(item=>item.substr(0,6))))
})

export const getValuesByKeys=((obj,str)=>{
  const newObj=new Object()
  Object.keys(obj).forEach(item=>{
    if(item.substr(6,1).includes(str)){
      newObj[item]=obj[item]
    }
  })
  return newObj
})

/**
 * @description 返回分区编号
 * @param {*} str 
 */
function casePartition(str){
  str=str<10?'0'+str:str
  if(pushArr(1,5).includes(str)){
    return '01'
  }
  if(pushArr(6,11).includes(str)){
    return '02'
  }
  if(pushArr(12,15).includes(str)){
    return '03'
  }
  if(pushArr(16,19).includes(str)){
    return '04'
  }
  if(pushArr(20,23).includes(str)){
    return '05'
  }
  if(pushArr(24,29).includes(str)){
    return '06'
  }
  if(pushArr(30,35).includes(str)){
    return '07'
  }
  if(pushArr(36,41).includes(str)){
    return '08'
  }
  if(pushArr(42,45).includes(str)){
    return '09'
  }
  if(pushArr(46,49).includes(str)){
    return '10'
  }
  if(pushArr(50,53).includes(str)){
    return '11'
  }
  if(pushArr(54,61).includes(str)){
    return '12'
  }
}

export const createhArr=(str1,str2)=>{
  const arr=[]
  for(let i=str1;i<=str2;i++){
    i=i<10?'0'+i:i.toString()
    arr.push(i)
  }
  return arr
}