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
  name:'tempReal',
  components:{
    vavcharts
  },
  data(){
    return{
      cardTitle:'实测温度分析图',
      echartTitle:'实测温度分析',
      seriesName:'实测温度',
      chartData:[],
      xData:[],
    }
  },
  computed:{
    gainStateTempReal(){
      return this.showTempReal()
    }
  },
  watch:{
    gainStateTempReal:function(nval){
      this.xData=createhArr(1,Object.keys(nval).length)
      this.chartData=Object.values(nval).map(item=>item/10)
      console.log(this.xData);
    }
  },
  methods:{
    ...mapGetters([
      'showTempReal',
    ])
  }
}
</script>
