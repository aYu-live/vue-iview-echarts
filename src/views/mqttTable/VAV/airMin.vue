<template>
    <vavcharts 
      slot
      :cardTitle='cardTitle' 
      :chartData='chartData' 
      :xData='xData' 
      :echartTitle='echartTitle'
      :seriesName='seriesName'
    >
    </vavcharts>
</template>

<script>
import vavcharts from '_c/VAVchart'
import { mapGetters } from 'vuex';
import {createhArr} from '@/lib/tools'
export default {
  name:'airMin',
  components:{
    vavcharts
  },
  data(){
    return{
      cardTitle:'最小风量分析图',
      echartTitle:'最小风量分析',
      seriesName:'最小风量',
      chartData:[],
      xData:[],
    }
  },
  computed:{
    gainStateAirMin(){
      return this.showAirMin()
    }
  },
  watch:{
    gainStateAirMin:function(nval){
      this.xData=createhArr(1,Object.keys(nval).length)
      this.chartData=Object.values(nval).map(item=>item)
      console.log(this.xData);
    }
  },
  mounted(){
    this.xData=createhArr(1,Object.keys(this.showAirMin()).length)
    this.chartData=Object.values(this.showAirMin()).map(item=>item)
  },
  methods:{
    ...mapGetters([
      'showAirMin',
    ])
  }
}
</script>
