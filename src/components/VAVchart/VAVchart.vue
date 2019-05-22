<template>
    <check-connected :cardTitle='cardTitle'>
      <Card :title="cardTitle">
      <echart-toggle 
        slot 
        :realData='chartData' 
        :xData='xData' 
        :echartTitle='echartTitle' 
        :seriesName='seriesName'
      ></echart-toggle>
      </Card>
    </check-connected>
</template>

<script>
import {toggle_bar_line} from '_c/echarts'
import { mapGetters } from 'vuex';
import {createhArr} from '@/lib/tools'
import checkConnected from '_c/checkConnected'
export default {
  components:{
    echartToggle:toggle_bar_line,
    checkConnected
  },
  data(){
    return{
    }
  },
  props:{
    cardTitle:{
      type:String,
      default:()=>''
    },
    chartData:{
      type:Array,
      default:()=>[]
    },
    xData:{
      type:Array,
      default:()=>[]
    },
    echartTitle:{
      type:String,
      default:()=>''
    },
    seriesName:{
      type:String,
      default:()=>''
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style lang="less">
@import './common.less';
</style>
