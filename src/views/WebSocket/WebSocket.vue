<template>
  <div class="websocket-wrapper">
    <Row class="connect-wrapper margin-top-20">
      <i-col>
        <connect :connected='connected'></connect>
      </i-col>
    </Row>
    <Row class="sub_pub-wrapper margin-top-20" type="flex" justify="space-between" :gutter='24'>
      <i-col :xs="24" :sm="24" :md="24" :lg="12">
        <Row class="sub-wrapper">
          <i-col>
            <subscribe :client='client'></subscribe>
          </i-col>
        </Row>
      </i-col>
      <i-col :xs="24" :sm="24" :md="24" :lg="12">
        <Row class="pub-wrapper">
          <i-col>
            <publish></publish>
          </i-col>
        </Row>
      </i-col>
    </Row>
    <Row class="outLog-wrapper margin-top-20">
      <i-col>
        <logout></logout>
      </i-col>
    </Row>
  </div>
</template>

<script>
import {connect, publish, subscribe, logout} from '_c/WebSocket'
export default {
  name:'WebSocket',
  components:{
    connect,
    publish,
    subscribe,
    logout
  },
  data(){
    return{
      client:{},
      connected:null
    }
  },
  computed:{
    getConnectState(){
      return this.$store.state.mqttData.client.connected
    }
  },
  watch:{
    getConnectState:function(nval){
      console.log('watch',nval);
      this.connected=nval
    }
  },
  beforeMount(){
    this.connected=this.$store.state.mqttData.client.connected&&this.$store.state.mqttData.client.connected===true?true:false
  },
  methods:{
    
  }
}
</script>

<style lang="less">
@import './WebSocket.less';
</style>
