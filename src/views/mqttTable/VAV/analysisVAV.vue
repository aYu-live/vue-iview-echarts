<template>
  <check-connected>
    <Card title="VAV运行分析图">
      <real-data slot :option="option"></real-data>
    </Card>
  </check-connected>

  <!-- <h1 v-if="!connected">{{errorMes}}
      </h1>
    <Card title="VAV运行分析图">
      <h3 v-if="!connected">WebSocket未连接
        <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h3>
      <h2 v-else-if="connected&&topicConnected">未订阅主题...
        <i-button to="/mqtt/websocket/" type='error'>点此跳转到WebSocket页面</i-button>
      </h2>
      <Card v-else-if="!(Object.keys(allValue).length)">
        <h2>正在等待WebSocket传输数据，请等待...</h2>
      </Card>
      <real-data v-else :option='option'></real-data>
  </Card>-->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getValuesByKeys } from "@/lib/tools";
import { bar_line_realData } from "_c/echarts";
import { VAVoption } from "./option";
import checkConnected from "_c/checkConnected";
export default {
  name: "analysisVAV",
  components: {
    realData: bar_line_realData,
    checkConnected
  },
  data() {
    return {
      basicData: "",
      connected: null,
      topicConnected: null,
      checkConnected:
        this.showStateClient().connected &&
        this.showStateClient().connected === true,
      checkTopicConnected: localStorage.getItem("topicArr"),
      allValue: {},
      option: null
    };
  },
  computed: {
    gainStateBasicData() {
      return this.showAllData();
    }
  },
  watch: {
    gainStateBasicData: function(nval) {
      this.allValue = nval;
      console.log(this.allValue);
      const VAVObject = this.allValue.VAV;
      const AHUObject = this.allValue.AHU;
      const TEMP = this.showTempReal();
      const MAX = this.showAirMax();
      const MIN = this.showAirMin();
      const REAL = this.showAirReal();
      const OPEN = this.showAirOpen();
      const xAxisData = Object.keys(TEMP).map(item => item.substr(4, 2));
      this.option.xAxis.data = xAxisData;
      this.option.series[0].data = Object.values(MAX)
      this.option.series[1].data = Object.values(MIN)
      this.option.series[2].data = Object.values(OPEN)
      this.option.series[3].data = Object.values(REAL)
    }
  },
  mounted() {
    this.option = VAVoption;
    this.allValue = this.showAllData();
    const VAVObject = this.allValue.VAV;
    const AHUObject = this.allValue.AHU;
    const TEMP = this.showTempReal();
    const MAX = this.showAirMax();
    const MIN = this.showAirMin();
    const REAL = this.showAirReal();
    const OPEN = this.showAirOpen();
    const xAxisData = Object.keys(TEMP).map(item => item.substr(4, 2));
    this.option.xAxis.data = xAxisData;
    this.option.series[0].data = Object.values(MAX);
    this.option.series[1].data = Object.values(MIN);
    this.option.series[2].data = Object.values(OPEN);
    this.option.series[3].data = Object.values(REAL);
  },
  methods: {
    ...mapGetters([
      "showStateClient",
      "showAllData",
      "showAirMax",
      "showAirMin",
      "showAirReal",
      "showAirOpen",
      "showTempReal"
    ]),
    ...mapActions([
      "saveAirMaxData",
      "saveAirMinData",
      "saveAirRealData",
      "saveAirOpenData",
      "saveTempRealData"
    ])
  }
};
</script>
