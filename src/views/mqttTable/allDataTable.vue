<template>
  <div class="dataTable-wrapper">
    <h1 v-if="connected">{{errorMes}}</h1>
     <!-- <real-data :realData='JSON.parse(JSON.stringify(this.realData))' ></real-data>
     <div v-for="(item,index) of VAVArray" :key="index">
       {{item}}------{{index}}
     </div>
     <div v-for="(item,index) of AHUArray" :key="index">
       {{item}}------{{index}}
     </div> -->
     <Card class="table1-card-wrapper" title="AHU数据显示">
      <Table :columns="AHUcolums" :data='AHUArray' :stripe='false' :border='true' :loading='AHUArray&&AHUArray!==[]?false:true' :highlight-row='true' size='large'>
      </Table>
     </Card>
     <Card class="table2-card-wrapper" title="VAV数据显示">
      <Table :columns="VAVcolums" :data='VAVArray' :stripe='false' :border='true' :loading='VAVArray&&VAVArray!==[]?false:true' :highlight-row='true' size='large'>
      </Table>
     </Card>
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
      VAVArray:[],
      AHUArray:[],
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
        const allValue=JSON.parse(nval)
        const VAVObject=allValue.VAV
        const AHUObject=allValue.AHU
        const AHUstrArray =filterAHUArrSame(AHUObject) 
        const VAVstrArray =filterVAVArrSame(VAVObject) 
        this.AHUArray=returnAHUArray(AHUstrArray,AHUObject)
        this.VAVArray=returnVAVArray(VAVstrArray,VAVObject)
        console.log(1,this.AHUArray,this.VAVArray,1);
        
        // console.log(map);
        // const a1=Object.keys(AHUObject).filter(item=>item.includes('x36a1'))
        
        // for(let index of Object.keys(AHUObject)){
        //   console.log(index);
        // }
        // console.log(arr 1);
      }
    }
  },
  mounted(){
    this.gainClientConnected()
  },
  methods:{
    ...mapGetters([
      'showBasicData'
    ]),
    gainClientConnected(){
      if(this.checkConnected){
        this.connected=false
      }else{
        this.connected=true
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
