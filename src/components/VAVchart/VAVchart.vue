<template>
  <div class="VAV-wrapper">
    <h1 v-if="!connected">{{errorMes}}
      </h1>
    <Card :title="cardTitle">
      <h3 v-if="!connected">WebSocket未连接
        <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h3>
      <h2 v-else-if="connected&&topicConnected">未订阅主题...
        <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h2>
      <Card v-else-if="!(Object.keys(chartData).length)">
        <h2>正在等待WebSocket传输数据，请等待...</h2>
      </Card>
      <echart-toggle 
        v-else 
        :realData='chartData' 
        :xData='xData' 
        :echartTitle='echartTitle' 
        :seriesName='seriesName'
      ></echart-toggle>
    </Card>
  </div>
</template>

<script>
import {toggle_bar_line} from '_c/echarts'
import { mapGetters } from 'vuex';
import {createhArr} from '@/lib/tools'
export default {
  components:{
    echartToggle:toggle_bar_line
  },
  data(){
    return{
      errorMes:'WebSocket未连接！请先连接！',
      connected:null,
      topicConnected:null,
      checkConnected:this.showStateClient().connected&&(this.showStateClient().connected===true),
      checkTopicConnected:localStorage.getItem('topicArr'),
    }
  },
  props:{
    cardTitle:{
      type:String,
      default:()=>''
    },
    chartData:{
      type:Array,
      default:()=>[]
    },
    xData:{
      type:Array,
      default:()=>[]
    },
    echartTitle:{
      type:String,
      default:()=>''
    },
    seriesName:{
      type:String,
      default:()=>''
    }
  },
  mounted(){
    this.gainClientConnected()
  },
  methods:{
    ...mapGetters([
      'showStateClient'
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
  }
}
</script>

<style lang="less">
@import './common.less';
</style>
