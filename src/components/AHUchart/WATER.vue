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
      data2:[]
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
    rt:{
      type:String,
      default:()=>''
    },
    pv:{
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
      const real=AHU[this.rt]/10
      const need=AHU[this.pv]/10
      if(this.data1.length<100&&this.data2.length<100){
        this.data1.push(createObject(xTime,real))
        this.data2.push(createObject(xTime,need))
      }else{
        this.data1.shift()
        this.data2.shift()
        this.data1.push(createObject(xTime,real))
        this.data2.push(createObject(xTime,need))
      }
      this.datas[0]=this.data1      
      this.datas[1]=this.data2
      this.datas=clonedeep(this.datas)
    }
  }
}
</script>

<style lang="less">
</style>
