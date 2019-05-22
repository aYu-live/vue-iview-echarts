<template>
  <div>
    <vavcharts 
      :cardTitle='cardTitle' 
      :chartData='chartData' 
      :xData='xData' 
      :echartTitle='echartTitle'
      :seriesName='seriesName'
    ></vavcharts>
  </div>
</template>

<script>
import vavcharts from '_c/VAVchart'
import { mapGetters } from 'vuex';
import {createhArr} from '@/lib/tools'
export default {
  name:'airMax',
  components:{
    vavcharts
  },
  data(){
    return{
      cardTitle:'最大风量分析图',
      echartTitle:'最大风量分析',
      seriesName:'最大风量',
      chartData:[],
      xData:[],
    }
  },
  computed:{
    gainStateAirMax(){
      return this.showAirMax()
    }
  },
  watch:{
    gainStateAirMax:function(nval){
      this.xData=createhArr(1,Object.keys(nval).length)
      this.chartData=Object.values(nval).map(item=>item)
    }
  },
  mounted(){
    this.chartData=Object.values(this.showAirMax())
    this.xData=createhArr(1,Object.keys(this.showAirMax()).length)
  },
  methods:{
    ...mapGetters([
      'showAirMax',
    ])
  }
}
</script>
