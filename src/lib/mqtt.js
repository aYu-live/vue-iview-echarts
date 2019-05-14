import mqtt from 'mqtt'
/**
 * @description MQTT连接
 * @param {*} url 
 * @param {*} options 
 */
export const connect=(url,options)=>{
  const client = mqtt.connect('mqtt:\/\/'+url+'\/mqtt',options)
  return client
}

