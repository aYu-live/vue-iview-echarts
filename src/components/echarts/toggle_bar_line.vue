<template>
      <figure>
      <i-button @click="toggleLine" class="margin-10">切换折线图</i-button>
      <i-button @click="toggleBar">切换柱形图</i-button>
        <chart
          :options="option"
          :init-options="initOptions"
          ref="line"
          theme="ovilia-green"
          autoresize
        />
        </figure>
</template>

<script>
import qs from 'qs'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import ECharts from '_c/common-echarts/echarts.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import { setInterval } from 'timers';
export default {
  components: {
    chart: ECharts
  },
  data () {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      initOptions: {
        renderer: options.renderer
      },
      line_bar_type:'line',
      option: {
        title: {
          text: this.echartTitle
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
          type: 'cross'
          },
          textStyle: {
            fontSize: 20
          }
        },
        xAxis: {
          data: this.xData,
          axisLine: {
            lineStyle: {
              color: '#033D6B',
              width:'1'//坐标线的宽度
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: this.seriesName,
          itemStyle: {   
            //通常情况下：
            normal:{  
　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function (params){
                var colorList = ['rgb(244,115,120)','rgb(42,170,227)','rgb(25,46,94)','rgb(107,208,137)'];
                return colorList[params.dataIndex>3?params.dataIndex%4:params.dataIndex];
              }
            }
          },
          type: this.line_bar_type,
          showSymbol: false,
          data: this.realData
        }]
      }
    }
  },
  props:{
    realData:{
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
    },
  },
  methods: {
    toggleLine(){
      this.line_bar_type='line'
     this.option.series[0].type=this.line_bar_type
    },
    toggleBar(){
      this.line_bar_type='bar'
     this.option.series[0].type=this.line_bar_type
    }
  },
  watch: {
   realData:function(val){
     this.realData=val
     this.option.series[0].data=this.realData
   }
  },
  mounted () {
    
  },
  created(){
     this.option.series[0].type=this.line_bar_type
  }
}
</script>

<style lang="less">
@import './common.less';
</style>