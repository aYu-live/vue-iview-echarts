<template>
  <div>
    <ahu-chart :realData='this.realData' :seriesName='seriesName' :titleText='titleText'></ahu-chart>
  </div>
</template>

<script>
import clonedeep from 'clonedeep'
import ahuChart from '_c/AHUchart'
import {getRealData} from '@/api/data'
import { setInterval, setTimeout, clearInterval } from 'timers';
export default {
  name:'dataWatch',
  components:{
    ahuChart
  },
  data(){
    return{
      realData1:[],
      realData:[],
      dataId:[],
      dataName:[],
      dataTime:[],
      dataValue:[],
      seriesName:'模拟数据',
      titleText:'实时数据监控',
    }
  },
  methods:{
    getInterval(){
      getRealData().then(res=>{
       this.dataId.push(res[res.length-1].id)
       this.dataName.push(res[res.length-1].name)
       this.dataTime.push(new Date(res[res.length-1].time))
       this.dataValue.push(res[res.length-1].value)
      })
    },
    
  },
  computed:{
    changeData(){
      const {dataTime,dataValue}=this
      return {dataTime,dataValue}
    }
  },
  watch: {
    changeData(val){
      const dataobj={
        name:val.dataTime[val.dataTime.length-1],
        value:[
          val.dataTime[val.dataTime.length-1],
          val.dataValue[val.dataValue.length-1]
        ]
      }
      if(this.realData1.length<200){
        this.realData1.push(dataobj)
      }else{
        this.realData1.shift()
        this.realData1.push(dataobj) 
      }
      this.realData[0]=this.realData1
      this.realData=JSON.parse(JSON.stringify(this.realData))
    }
  },
  mounted(){
    this.timer=setInterval(()=>{
      this.getInterval()
    },1000)
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
</style>
