<template>
   <div class="wrapper">
    <h1 v-if="!connected">{{errorMes}}
      </h1>
    
      <h3 v-if="!connected">WebSocket未连接
        <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h3>
      <h2 v-else-if="connected&&topicConnected">未订阅主题...
        <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h2>
      <Card v-else-if="!(Object.keys(allValue).length)">
        <h2>正在等待WebSocket传输数据，请等待...</h2>
      </Card>
      <slot v-else></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data(){
    return{
      cardTitle:'',
      allValue:[],
      errorMes:'WebSocket未连接！请先连接！',
      connected:null,
      topicConnected:null,
      checkConnected:this.showStateClient().connected&&(this.showStateClient().connected===true),
      checkTopicConnected:localStorage.getItem('topicArr'),
    }
  },
  computed:{
      gainStateAllData(){
        return this.showAllData()
      }
    },
    watch:{
      gainStateAllData:function(nval){
        this.allValue=nval
      }
    },
  methods:{
    ...mapGetters([
      'showStateClient',
      'showAllData'
    ]),
    gainClientConnected(){
      if(this.checkConnected){
        this.connected=true
        if(this.checkTopicConnected.includes('lm/gw/status/gw1')&&this.checkTopicConnected){
          this.topicConnected=false
        }
        else{
          this.topicConnected=true
        }
      }else{
        this.connected=false
        this.$Message.error(this.errorMes)
      }
    }
  },
  mounted(){
    this.gainClientConnected()
    this.allValue=this.showAllData()
  }
}
</script>

<style lang="less">
.wrapper{
  margin: 5px;
  .ivu-card-head{
    p{
      height: 100%;
      font-size: 20px;
    }
  }
}
</style>
