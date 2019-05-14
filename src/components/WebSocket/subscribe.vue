<template>
  <Card title="订阅主题">
    <p><span class="bold">Topic：</span><i-input class="input-content" v-model="subTopic" placeholder='订阅主题Topic'></i-input></p>
    <p class=" margin-top-10 ">
      <Dropdown trigger="click" placement='bottom-start'>
        <i-button type='default'>
            <span class="bold">QOS</span>
            <Icon type="ios-arrow-down"></Icon>
        </i-button>
        <DropdownMenu slot="list">
            <DropdownItem>0</DropdownItem>
            <DropdownItem>1</DropdownItem>
            <DropdownItem>2</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <i-button class="sub-button-content"  type='info' @click="subscribe" :disabled='realClient.connected?false:true'>
      订阅
    </i-button>
    </p>
    <Card title="订阅列表" class="margin-top-10">
      //
    </Card>
  </Card>
</template>

<script>
import bus from '@/lib/bus'
import {mapActions, mapGetters,mapState} from 'vuex'
export default {
  name:'subscribe',
  data(){
    return{
      subTopic:'lm/gw/status/gw1',
      disabled:'',
      topicArr:[]
    }
  },
  computed:{
    realClient(){
      return this.$store.state.mqttData.client
    }
  },
  watch:{
    'realClient.connected':function(nval){
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
    subscribe(){
      const client=this.realClient
      this.topicArr.push(this.subTopic)
      client.subscribe('lm/gw/status/gw1',{qos:0})
      client.on("message", function (topic, payload) {
        console.log(JSON.parse(payload));
      })
    }
  }
}
</script>
