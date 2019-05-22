<template>
  <Card title="WeSocket连接">
    <Row type="flex" justify="space-between" :gutter='24'>
      <i-col :xs="24" :sm="24" :md="24" :lg="12">
        <Row class="server-wrapper">
          <i-col>
            <div class="host-wrapper">
              <p><span class="bold">Post：</span><i-input class="input-content" v-model="host"></i-input></p>
            </div>
            <div class="port-wrapper">
              <p><span class="bold">Port：</span><i-input v-model="port"></i-input></p>
            </div>
            <div class="cleanSession-wrapper">
              <p>
                <span class="bold">CleanSession：</span>
                <i-switch  :value='cleanSession'  class="margin-5" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </p>
            </div>
            <div class="SSL-wrapper">
              <p>
                <span class="bold">断开后自动重连：</span>
                <i-switch  :value='resubscribe'  class="margin-5" size="large">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </p>
            </div>
            <div class="connect-button-content">
              <ButtonGroup class="margin-top-10">
                <i-button type="success" :disabled='connected' class="margin-5" @click="connect">连接</i-button>
                <i-button type="error" :disabled='!connected' class="margin-5" @click="unconnect">断开连接</i-button>
                  
              </ButtonGroup>
            </div>
          </i-col>
        </Row>
      </i-col>
      <i-col :xs="24" :sm="24" :md="24" :lg="12">
        <div class="info-wrapper">
          <i-input class="margin-10" v-model="client_id">
            <span slot="prepend" class="bold">Client Id</span>
          </i-input>
          <i-input class="margin-10" v-model="userName">
            <span slot="prepend" class="bold">userName</span>
          </i-input>
          <i-input class="margin-10" v-model="password">
            <span slot="prepend" class="bold">password</span>
          </i-input>
          <i-input class="margin-10" v-model="keepalive">
            <span slot="prepend" class="bold">keepalive</span>
          </i-input>
        </div>
      </i-col>
    </Row>
  </Card>
</template>

<script>
import mqtt from 'mqtt'
import { mapActions } from 'vuex'
export default {
  name:'connect',
  data(){
    return{
      client:this.$store.state.mqttData.client.connected?this.$store.state.mqttData.client:{},
      host:'192.168.21.46',
      port:'8083',
      client_id:'client_' + Math.random().toString(16).substr(2, 8),
      userName:'',
      password:'',
      cleanSession:true,
      keepalive:60,
      resubscribe:false,
      options:{
        keepalive:this.keepalive,
        clientId:this.client_id,
        username:this.userName,
        password:this.password,
        clean:this.cleanSession,
        resubscribe:this.resubscribe
      }
    }
  },
  props:{
    connected:{
      type:Boolean
    }
  },
  computed:{
    realClientConnected(){
      return this.$store.state.mqttData.client.connected
    }
  },
  mounted(){
  },
  watch:{
    realClientConnected:function(nval){
      if(nval===true){
        this.$Message.success('连接成功')
        if(this.client.disconnected==true){
          this.$Message.error('连接过程中出现错误')
        }
      }else if(nval===false){
        this.client.end()
        this.$Message.error('断开连接')
      }
    }
  },
  methods:{
    ...mapActions([
      'saveClient'
    ]),
    connect(){
     this.client = mqtt.connect('mqtt:\/\/'+this.host+':'+this.port+'\/mqtt', this.options)
     if(this.client.connected=true){
      this.saveClient(this.client)
      sessionStorage.setItem('topicArr','')
      console.log('連接了');
     }
    },
    unconnect(){
      this.client.end()
      if(this.client.disconnected=true){
          this.saveClient(this.client)
          console.log('斷開了');
          
        }
    }
  }
}
</script>