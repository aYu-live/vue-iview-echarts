<template>
    <ahu-chart :datas='datas' :seriesName='seriesName' :titleText='titleText'></ahu-chart>
</template>

<script>
import clonedeep from 'clonedeep'
import {createObject} from '@/lib/util'
import {mapGetters} from 'vuex'
import {ahuChart} from '_c/AHUchart'
export default {
  components:{
    ahuChart
  },
  data(){
    return{
      datas:[],
      data1:[],
      data2:[],
      data3:[],
    }
  },
  props:{
    seriesName:{
      type:Array,
      default:()=>''
    },
    titleText:{
      type:String,
      default:()=>''
    },
    pone:{
      type:String,
      default:()=>''
    },
    ptwo:{
      type:String,
      default:()=>''
    },
    hz:{
      type:String,
      default:()=>''
    },
  },
  computed:{
    gainAllData(){
      return this.showAllData()
    }
  },
  watch: {
    gainAllData:function(nval){
      this.handleAllData(nval)
      console.log('VueWatch',this.datas);
    }
  },
  mounted(){
    if(Object.keys(this.showAllData()).length!==0){
      this.handleAllData(this.showAllData())
      console.log('VueMounted',this.datas);
    }
  },
  methods:{
    ...mapGetters([
      'showAllData'
    ]),
    handleAllData(allData){
      const AHU=allData.AHU
      const xTime=new Date(allData.time)
      const data1=AHU[this.pone]/10
      const data2=AHU[this.ptwo]/10
      const data3=AHU[this.hz]
      if(this.data1.length<100&&this.data2.length<100&&this.data3.length<100){
        this.data1.push(createObject(xTime,data1))
        this.data2.push(createObject(xTime,data2))
        this.data3.push(createObject(xTime,data3))
      }else{
        this.data1.shift()
        this.data2.shift()
        this.data3.shift()
        this.data1.push(createObject(xTime,data1))
        this.data2.push(createObject(xTime,data2))
        this.data3.push(createObject(xTime,data3))
      }
      this.datas[0]=this.data1      
      this.datas[1]=this.data2
      this.datas[2]=this.data3
      this.datas=clonedeep(this.datas)
    }
  }
}
</script>

<style lang="less">
</style>
