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
import { createSeries } from "@/lib/util";
import qs from "qs";
import clonedeep from "clonedeep";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/dataZoom";
import ECharts from "_c/common-echarts/echarts.vue";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import { setInterval } from "timers";
export default {
  components: {
    chart: ECharts
  },
  data() {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true });
    return {
      initOptions: {
        renderer: options.renderer
      },
      line_bar_type: "line",
      seriesArr: [],
      option: {
        title: {
          text: this.titleText
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: "inside"
          },
          {
            type: "slider"
          }
        ],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            animation: true
          }
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          },
          min: function(value) {
            return value.min - 50;
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        },
        series: null
      }
    };
  },
  props: {
    datas: {
      type: Array,
      default: () => []
    },
    seriesName: {
      type: Array,
      default: () => []
    },
    titleText: {
      type: String,
      default: () => ""
    }
  },
  methods: {
    toggleLine() {
      for (let i = 0; i < this.option.series.length; i++) {
        this.line_bar_type = "line";
        this.option.series[i].type = this.line_bar_type;
      }
    },
    toggleBar() {
      for (let i = 0; i < this.option.series.length; i++) {
        this.line_bar_type = "bar";
        this.option.series[i].type = this.line_bar_type;
      }
    }
  },
  watch: {
    datas: function(nval) {
      for (let i = 0; i < nval.length; i++) {
        this.seriesArr[i] = createSeries(i, nval, this.seriesName,this.line_bar_type);
      }
      this.option.series = clonedeep(this.seriesArr);
      console.log("watchOption", this.option);
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      if (this.datas.length !== 0) {
        for (let i = 0; i < this.datas.length; i++) {
          this.seriesArr[i] = createSeries(i, this.datas, this.seriesName);
        }
        const title={text:''}
        title.text=this.titleText
        this.option.title=clonedeep(title)
        this.option.series = clonedeep(this.seriesArr)
        console.log(this.option);
      }
    });
  }
};
</script>

<style lang="less">
@import "./common.less";
</style>
