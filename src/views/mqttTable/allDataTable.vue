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
          <Table 
            :columns="AHUcolums" 
            :data='AHUArray' 
            :stripe='false' 
            :border='true' 
            :loading='Object.keys(allValue).length==0' 
            :highlight-row='true' 
            size='large' 
            :no-data-text='errorData' 
            ref="AHUtables"
          >
          </Table>
          <Row class="margin-top-20" v-show="Object.keys(AHUArray).length!==0">
            <Button 
              size="large"
              icon='md-download' 
              :loading='exportLoading'
              @click="exportAHUExcel"
            >导出EXCEL文件
            </Button>
            <Button 
              class="margin-left-10"
              size="large"
              @click="exportAHUData(1)"
            >
            <Icon type="ios-download-outline"></Icon>
            导出CSV原始数据
            </Button>
        <Button 
          class="margin-left-10" 
          size="large" 
          @click="exportAHUData(2)"
        >
        <Icon type="ios-download-outline"></Icon>
        导出CSV排序后的数据
        </Button>
        <Button 
          class="margin-left-10" 
          size="large"
          icon="ios-close"
          :loading='exportLoading'
          @click="deletAHUData"
        >清空数据
        </Button>
      </Row>
        </Card>
        <Card class="table2-card-wrapper" title="VAV数据显示">
          <Table 
            :columns="VAVcolums" 
            :data='VAVArray' 
            :stripe='false' 
            :border='true' 
            :loading='Object.keys(allValue).length==0' 
            :highlight-row='true' 
            size='large' 
            :no-data-text='errorData' 
            ref="VAVtables"
          >
          </Table>
          <Row class="margin-top-20" v-show="Object.keys(VAVArray).length!==0">
            <Button 
              size="large"
              icon='md-download' 
              :loading='exportLoading'
              @click="exportVAVExcel"
            >导出EXCEL文件
            </Button>
            <Button 
              class="margin-left-10"
              size="large"
              @click="exportVAVData(1)"
            >
            <Icon type="ios-download-outline"></Icon>
            导出CSV原始数据
            </Button>
            <Button 
              class="margin-left-10" 
              size="large" 
              @click="exportVAVData(2)"
            >
            <Icon type="ios-download-outline"></Icon>
            导出CSV排序后的数据
            </Button>
            <Button 
              class="margin-left-10" 
              size="large"
              icon="ios-close"
              :loading='exportLoading'
              @click="deletVAVData"
            >清空数据
            </Button>
          </Row>
        </Card>
        
     </div>
     <BackTop :height="100" :bottom="200">
        <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
import excel from '@/lib/excel'
import {mapGetters} from 'vuex'
import {returnAHUArray, returnVAVArray, filterVAVArrSame, filterAHUArrSame} from '@/lib/tools'
import {AHUcolums, VAVcolums} from './columns'
export default {
  name:'allDataTable',
  data(){
    return{
      exportLoading:false,
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
      return this.showBasicData()
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
      this.allValue=this.showAllData()
      const VAVObject=this.allValue.VAV
      const AHUObject=this.allValue.AHU
      const AHUstrArray =filterAHUArrSame(AHUObject) 
      const VAVstrArray =filterVAVArrSame(VAVObject) 
      
      this.$nextTick(()=>{this.VAVArray=returnVAVArray(VAVstrArray,VAVObject)})
      this.$nextTick(()=>{this.AHUArray=returnAHUArray(AHUstrArray,AHUObject)})
  },
  methods:{
    ...mapGetters([
      'showBasicData',
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
    },
    deletAHUData(){
      this.exportLoading=true
      this.AHUArray=[]
      this.exportLoading=false
    },
    exportAHUExcel(){
      if(this.AHUArray.length){
        this.exportLoading=true
        let key=[]
        let title=[]
        for(let item of this.AHUcolums){
          key.push(item.key)
          title.push(item.title)
        }
        const params = {
          title: title,
          key: key,
          data: this.AHUArray,
          autoWidth:true,
          fileName: 'AHU设备参数'
        }
        excel.export_array_to_excel(params)
        this.exportLoading=false
      }else{
        this.$Message.info('表格数据不能为空')
      }
    },
    exportAHUData(type){
      if(type===1){
        this.$refs.AHUtables.exportCsv({
          fileName:'AHU设备参数'
        })
      }else if(type===2){
        this.$refs.AHUtables.exportCsv({
          fileName:'AHU设备参数',
          original:false
        })
      }
    },
    deletVAVData(){
      this.exportLoading=true
      this.VAVArray=[]
      this.exportLoading=false
    },
    exportVAVExcel(){
      if(this.VAVArray.length){
        this.exportLoading=true
        let key=[]
        let title=[]
        for(let item of this.VAVcolums){
          key.push(item.key)
          title.push(item.title)
        }
        const params = {
          title: title,
          key: key,
          data: this.VAVArray,
          autoWidth:true,
          fileName: 'VAV设备参数'
        }
        excel.export_array_to_excel(params)
        this.exportLoading=false
      }else{
        this.$Message.info('表格数据不能为空')
      }
    },
    exportVAVData(type){
      if(type===1){
        this.$refs.VAVtables.exportCsv({
          fileName:'VAV设备参数'
        })
      }else if(type===2){
        this.$refs.VAVtables.exportCsv({
          fileName:'VAV设备参数',
          original:false
        })
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
.margin-top-20{
  margin-top:20px;
}
</style>
