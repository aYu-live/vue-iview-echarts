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
    <span class="margin-5">默认：qos:{{QOS}}</span>
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
import {getValuesByKeys} from '@/lib/tools'
import {deleteByArray,checkArrayhas,Uint8ArrayToString,formatDate} from '@/lib/tools'
import {mapActions, mapGetters,mapState} from 'vuex'
export default {
  name:'subscribe',
  data(){
    return{
      subTopic:'lm/gw/status/gw1',
      disabled:'',
      topicArr:[],
      QOS:0,
      ok:true
    }
  },
  computed:{
    realClientConnected(){
      return this.showStateClient().connected
    },
    realClient(){
      return this.showStateClient()
    }
  },
  watch:{
    realClientConnected:function(nval){
      if(nval===false&&!nval){
        this.disabled=false
        this.realClient.unsubscribe(this.topicArr)
        window.sessionStorage.setItem('topicArr','')
        console.log('订阅主题清空',this.topicArr);
        this.topicArr=this.getLocal()
      }
    }
  },
  mounted(){
    this.topicArr = this.getLocal()
  },
  methods:{
    ...mapGetters([
      'showStateClient',
    ]),
    ...mapActions([
      'saveBasicData',
      'saveAirMaxData',
      'saveAirMinData',
      'saveAirRealData',
      'saveAirOpenData',
      'saveTempRealData',
      'saveAllData'
    ]),
    ...mapGetters([
      'showBasicData'
    ]),
    getLocal(){
      if(this.$store.state.mqttData.client.connected){
        return JSON.parse(sessionStorage.getItem('topicArr')!=='')&&sessionStorage.getItem('topicArr')?JSON.parse(sessionStorage.getItem('topicArr')):[]
      }else{
        return []
      }
    },
    getQos(name){
      this.QOS=Number.parseInt(name)
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
            sessionStorage.setItem('topicArr',JSON.stringify(this.topicArr))
            client.subscribe(this.subTopic,this.QOS)
            console.log('订阅成功',client);
            this.$Message.success(`订阅'${this.subTopic}'主题成功!`)
            client.on("message", (topic, payload)=> {
              const outputArr = (Uint8ArrayToString(payload))
              if(outputArr.includes('client')){
                this.saveBasicData(outputArr)
                const allValue=JSON.parse(outputArr)
                console.log(allValue);
                this.saveAllData(allValue)
                const VAVObject=allValue.VAV
                const TEMP=getValuesByKeys(VAVObject,'T')
                const MAX=getValuesByKeys(VAVObject,'M')
                const MIN=getValuesByKeys(VAVObject,'N')
                const REAL=getValuesByKeys(VAVObject,'F')
                const OPEN=getValuesByKeys(VAVObject,'P')
                this.saveAirMaxData(MAX)
                this.saveAirMinData(MIN)
                this.saveAirRealData(REAL)
                this.saveAirOpenData(OPEN)
                this.saveTempRealData(TEMP)
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
      client.unsubscribe(topic.subTopic)
      this.topicArr=deleteByArray(topic.subTopic,this.topicArr)
      window.sessionStorage.setItem('topicArr',JSON.stringify(this.topicArr))
      this.$Message.error('取消订阅成功',client)
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
