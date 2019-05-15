<template>
  <Card title="订阅主题">
    <p><span class="bold">Topic：</span><i-input class="input-content" v-model="subTopic" placeholder='订阅主题Topic'></i-input></p>
    <p class=" margin-top-10 ">
      <Dropdown trigger="click" placement='bottom-start' @on-click="getQos">
        <i-button type='default'>
            <span class="bold">QOS</span>
            <Icon type="ios-arrow-down"></Icon>
        </i-button>
        <DropdownMenu slot="list">
            <DropdownItem name='0'>0</DropdownItem>
            <DropdownItem name='1'>1</DropdownItem>
            <DropdownItem name='2'>2</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <span class="margin-5">默认：{{QOS}}</span>
    <i-button class="sub-button-content"  type='info' @click="subscribe" :disabled='realClient.connected?false:true'>
      订阅
    </i-button>
    </p>
    <Card title="订阅列表" class="margin-top-10">
        
        <Row :gutter="16">
          <transition-group name="fade">
          <i-col v-show="ok" v-for="(item, index) in topicArr" :key="`sub_top_${index}`" class="sub-topic-col">
             {{item}}
             <Icon type="md-backspace" size='18' @click="closeSubTopic(item)" style="cursor : pointer"/>
          </i-col>
      </transition-group>
         </Row>
    </Card>
  </Card>
</template>

<script>
import {deleteByArray,checkArrayhas,Uint8ArrayToString} from '@/lib/tools'
import {mapActions, mapGetters,mapState} from 'vuex'
export default {
  name:'subscribe',
  data(){
    return{
      subTopic:'lm/gw/status/gw1',
      disabled:'',
      topicArr:[],
      QOS:{qos:0},
      ok:true
    }
  },
  computed:{
    realClientConnected(){
      return this.$store.state.mqttData.client.connected
    },
    realClient(){
      return this.$store.state.mqttData.client
    }
  },
  watch:{
    realClientConnected:function(nval){
      if(nval==true){
        this.disabled=true
      }else{
        this.disabled=false
      }
    }
  },
  mounted(){
    
  },
  methods:{
    ...mapGetters([
      'showStateClient'
    ]),
    ...mapActions([
      'saveBasicData'
    ]),
    ...mapGetters([
      'showBasicData'
    ]),
    getQos(name){
      this.QOS=Object({qos:Number.parseInt(name)})
    },
    subscribe(){
      if(checkArrayhas(this.subTopic,this.topicArr)){
        this.$Message.error('已订阅过该主题，不可重复订阅')
      }else{
        if(this.realClientConnected==true){
          const client=this.realClient
          this.topicArr.push(this.subTopic)
          client.subscribe(this.subTopic,this.QOS)
          this.$Message.success('订阅'+this.subTopic+'主题成功')
          client.on("message", (topic, payload)=> {
            if(Uint8ArrayToString(payload).includes('clientid"')){
              const outputArr = JSON.parse(Uint8ArrayToString(payload))
              this.saveBasicData(outputArr)
              
            console.log(1,this.showBasicData());
            }
        })
        }else{
          this.$Message.error('连接失败')
        }
      }
    },
    closeSubTopic(topic){
      const client=this.realClient
      client.unsubscribe(topic)
      deleteByArray(topic,this.topicArr)
      this.$Message.success('取消订阅成功')
    }
  }
}
</script>

<style lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
