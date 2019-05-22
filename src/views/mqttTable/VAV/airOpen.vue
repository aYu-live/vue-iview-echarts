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
  name:'airOpen',
  components:{
    vavcharts
  },
  data(){
    return{
      cardTitle:'风阀开度分析图',
      echartTitle:'风阀开度分析',
      seriesName:'风阀开度',
      chartData:[],
      xData:[],
    }
  },
  computed:{
    gainStateAirOpen(){
      return this.showAirOpen()
    }
  },
  watch:{
    gainStateAirOpen:function(nval){
      this.xData=createhArr(1,Object.keys(nval).length)
      this.chartData=Object.values(nval).map(item=>item)
    }
  },
  mounted(){
    this.xData=createhArr(1,Object.keys(this.showAirOpen()).length)
    this.chartData=Object.values(this.showAirOpen()).map(item=>item)
  },
  methods:{
    ...mapGetters([
      'showAirOpen',
    ])
  }
}
</script>
