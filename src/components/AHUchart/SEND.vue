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
      dataId:[],
      dataName:[],
      dataTime:[],
      dataValue:[],
      realsData:[],
      needsData:[]
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
    aone:{
      type:String,
      default:()=>''
    }
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
      const real=AHU[this.aone]/10
      if(this.realsData.length<100){
        this.realsData.push(createObject(xTime,real))
      }else{
        this.realsData.shift()
        this.realsData.push(createObject(xTime,real))
      }
      this.datas[0]=this.realsData
      this.datas=clonedeep(this.datas)
    }
  }
}
</script>

<style lang="less">
</style>
