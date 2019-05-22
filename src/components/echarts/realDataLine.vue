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
import clonedeep from 'clonedeep'
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
      seconds: -1,
      option: {
        title: {
          text: this.titleText
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
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + '/' + date.getSeconds() + ' : ' + params.value[1];
          },
          axisPointer: {
            animation: true
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          min:function(value) {
            return value.min - 50;
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
                var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)'];
                return colorList[params.dataIndex>3?params.dataIndex%4:params.dataIndex];
              }
            }
          },
          type:'line',
          showSymbol: false,
          hoverAnimation: false,
          data: clonedeep(this.realData[0])
        }]
      }
    }
  },
  props:{
    realData:{
      type:Array,
      default:()=>[]
    },
    seriesName:{
      type:String,
      default:()=>''
    },
    titleText:{
      type:String,
      default:()=>''
    },
  },
  methods: {
    toggleLine(){
      for(let i=0;i<this.option.series.length;i++){
        this.line_bar_type='line'
        this.option.series[i].type=this.line_bar_type
      }
    },
    toggleBar(){
      for(let i=0;i<this.option.series.length;i++){
        this.line_bar_type='bar'
        this.option.series[i].type=this.line_bar_type
      }
    }
  },
  watch: {
   realData:function(val){
     console.log(val,1);
     this.realData=val
     for(let i=0;i<val.length;i++){
       this.option.series[i].data=clonedeep(this.realData[i])
     }
     
   }
  },
  mounted () {;
    for(let i=0;i<this.option.length;i++){
      this.option.series[i][type]=this.line_bar_type
      this.option.series[i][data]=clonedeep(this.realData[i])
    }
  },
  
}
</script>

<style lang="less">
@import './common.less';
</style>