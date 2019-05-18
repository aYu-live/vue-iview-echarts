<template>
  <div class="dataTable-wrapper">
    <h3 v-if="!connected">WebSocket未连接！
       <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h3>
      <h2 v-else-if="connected&&topicConnected">未订阅主题！
       <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h2>
      <div v-else>
        <Card class="table1-card-wrapper" title="AHU数据显示">
          <Table :columns="AHUcolums" :data='AHUArray' :stripe='false' :border='true' :loading='Object.keys(allValue).length==0' :highlight-row='true' size='large' :no-data-text='errorData'>
          </Table>
        </Card>
        <Card class="table2-card-wrapper" title="VAV数据显示">
          <Table :columns="VAVcolums" :data='VAVArray' :stripe='false' :border='true' :loading='Object.keys(allValue).length==0' :highlight-row='true' size='large' :no-data-text='errorData'>
          </Table>
        </Card>
     </div>
     <BackTop :height="100" :bottom="200">
        <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {returnAHUArray, returnVAVArray, filterVAVArrSame, filterAHUArrSame} from '@/lib/tools'
import {AHUcolums, VAVcolums} from './columns'
export default {
  name:'allDataTable',
  data(){
    return{
      basicData:'',
      errorMes:'WebSocket未连接!',
      connected:null,
      checkConnected:this.$store.state.mqttData.client.connected&&(this.$store.state.mqttData.client.connected===true),
      topicConnected:null,
      checkTopicConnected:localStorage.getItem('topicArr'),
      errorData:'正在等待WebSocket传输数据，请等待...',
      VAVArray:[],
      AHUArray:[],
      allValue:{},
      AHUcolums,
      VAVcolums
    }
  },
  computed:{
    gainStateBasicData(){
      return this.$store.state.mqttData.basicData
    }
  },
  watch:{
    gainStateBasicData:function(nval){
      if(nval.includes('clientid')){
        this.allValue=JSON.parse(nval)
        const VAVObject=this.allValue.VAV
        const AHUObject=this.allValue.AHU
        const AHUstrArray =filterAHUArrSame(AHUObject) 
        const VAVstrArray =filterVAVArrSame(VAVObject) 
        this.AHUArray=returnAHUArray(AHUstrArray,AHUObject)
        this.VAVArray=returnVAVArray(VAVstrArray,VAVObject)
        console.log(this.AHUArray,this.VAVArray);
      }
    }
  },
  mounted(){
    this.gainClientConnected()
    if(this.gainStateBasicData.includes('clientid')){
      this.allValue=this.gainStateBasicData
    }
  },
  methods:{
    ...mapGetters([
      'showBasicData'
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
@import url('./dataTable.less');
.dataTable-wrapper{
  h1{text-align: center;color: #ED4014}
  .table1-card-wrapper{
    margin: 10px;
    border-radius:10px;
    .ivu-card-head{
      background-color: #DFF0D8;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .table-title{
      padding: 10px;
      color: #262626
    }
  }
  .table2-card-wrapper{
    margin: 10px;
    border-radius:10px;
    .ivu-card-head{
      background-color: #FCF8E3;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .table-title{
      padding: 10px;
      color: #262626
    }
  }
}
.top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
</style>
