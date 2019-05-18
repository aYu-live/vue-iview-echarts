<template>
  <Card title="订阅主题">
    <p><span class="bold">Topic：</span>
    <i-input class="input-content" v-model="subTopic" placeholder='订阅主题Topic'></i-input></p>
    <p class=" margin-top-10 ">
      <Dropdown trigger="click" placement='bottom-start' @on-click="getQos">
        <i-button type='default'>
            <span class="bold">QOS</span>
            <Icon type="ios-arrow-down"></Icon>
        </i-button>
        <DropdownMenu slot="list">
            <DropdownItem name='0'>0 - Almost Once</DropdownItem>
            <DropdownItem name='1'>1 - Atleast Once</DropdownItem>
            <DropdownItem name='2'>2 - Exactly Once</DropdownItem>
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
              {{item.subTopic}}
              <Icon type="md-backspace" size='18' @click="closeSubTopic(item)" style="cursor : pointer"/>
          </i-col>
       </transition-group>
        </Row>
    </Card>
  </Card>
</template>

<script>
import {deleteByArray,checkArrayhas,Uint8ArrayToString,formatDate} from '@/lib/tools'
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
      if(nval===false&&!nval){
        this.disabled=false
        console.log('订阅主题清空');
        this.realClient.unsubscribe(this.topicArr)
        window.localStorage.setItem('topicArr','')
        this.topicArr=this.getLocal()
      }
    }
  },
  mounted(){
    this.topicArr = this.getLocal()
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
    getLocal(){
      if(this.$store.state.mqttData.client.connected){
        return JSON.parse(localStorage.getItem('topicArr')!=='')&&localStorage.getItem('topicArr')?JSON.parse(localStorage.getItem('topicArr')):[]
      }else{
        return []
      }
    },
    getQos(name){
      this.QOS=Object({qos:Number.parseInt(name)})
    },
    subscribe(){
      if(this.subTopic.trim()===''){
        this.$Message.warning('订阅主题不可为空!')
      }else{
        if(checkArrayhas(this.subTopic,this.topicArr)){
          this.$Message.warning('已订阅过该主题，不可重复订阅!')
        }else{
          if(this.realClientConnected==true){
            const client=this.realClient
            const obj=new Object({'subTopic':this.subTopic})
            this.topicArr.push(obj)
            localStorage.setItem('topicArr',JSON.stringify(this.topicArr))
            client.subscribe(this.subTopic,this.QOS)
            console.log('订阅成功',Object.values(client.messageIdToTopic));
            this.$Message.success(`订阅'${this.subTopic}'主题成功!`)
            client.on("message", (topic, payload)=> {
              const outputArr = (Uint8ArrayToString(payload))
              if(outputArr.includes('client')){
                this.saveBasicData(outputArr)
              }else{
                this.saveBasicData(formatDate(new Date())+ outputArr)
              }
            })
          }else{
            this.$Message.error('连接失败')
          }
        }
      }
    },
    closeSubTopic(topic){
      const client=this.realClient
      console.log(topic.subTopic,this.topicArr);
      client.unsubscribe(topic.subTopic)
      this.topicArr=deleteByArray(topic.subTopic,this.topicArr)
      window.localStorage.setItem('topicArr',JSON.stringify(this.topicArr))
      this.$Message.error('取消订阅成功')
    }
  }
}
</script>

<style lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
