<template>
      <figure>
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
import EChart from '_c/common-echarts/echarts.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import { setInterval } from 'timers';
import { close } from 'fs';
export default {
  components: {
    chart: EChart
  },
  data () {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      initOptions: {
        renderer: options.renderer
      },
      line_bar_type:'line',
      seconds: -1,
    }
  },
  props:{
    realData:{
      type:Array,
      default:()=>[]
    },
    option:{
      type:Object,
      default:()=>({})
    }
  }
}
</script>

<style lang="less">
@import './common.less';
</style>
