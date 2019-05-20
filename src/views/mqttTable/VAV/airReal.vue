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
  name:'airReal',
  components:{
    vavcharts
  },
  data(){
    return{
      cardTitle:'实测风量分析图',
      echartTitle:'实测风量分析',
      seriesName:'实测风量',
      chartData:[],
      xData:[],
    }
  },
  computed:{
    gainStateAirReal(){
      return this.showAirReal()
    }
  },
  watch:{
    gainStateAirReal:function(nval){
      this.xData=createhArr(1,Object.keys(nval).length)
      this.chartData=Object.values(nval).map(item=>item)
      console.log(this.xData);
    }
  },
  methods:{
    ...mapGetters([
      'showAirReal',
    ])
  }
}
</script>
