<template>
  <div>
    <real-data :realData='JSON.parse(JSON.stringify(this.realData))'></real-data>
  </div>
</template>

<script>
import clonedeep from 'clonedeep'
import {realData} from '_c/echarts'
import {getRealData} from '@/api/data'
import { setInterval, setTimeout, clearInterval } from 'timers';
export default {
  name:'dataWatch',
  components:{
    realData
  },
  data(){
    return{
      realData:[],
      dataId:[],
      dataName:[],
      dataTime:[],
      dataValue:[]
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
      const dataobj=new Object({
        name:val.dataTime[val.dataTime.length-1],
        value:[
          val.dataTime[val.dataTime.length-1],
          val.dataValue[val.dataValue.length-1]
        ]
      })
      if(this.realData.length<200){
        this.realData.push(dataobj)
      }else{
        this.realData.shift()
        this.realData.push(dataobj)
      }
        // this.realData.push(dataobj)
      
      // console.log(JSON.parse(JSON.stringify(this.realData)))
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

<style lang="less" scoped>

</style>
