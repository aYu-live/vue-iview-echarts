<template>
  <div class="home-wrapper">
    <info-card></info-card>   
    <row class="chart-row-wrapper code-row-bg" >
        <i-col span="12"><echart-pie></echart-pie></i-col>
        <i-col span="12"> <echart-pie></echart-pie> </i-col>
    </row>
  </div>
</template>

<script>
import InfoCard from '_c/info-card'
import {echartBar, echartPie} from '_c/echarts'
export default {
  name:'firstHome',
  components:{
    InfoCard,
    echartBar,
    echartPie
  },

}
</script>

<style lang="less" scoped>
.home-wrapper{
  margin: 0px 20px;
}
</style>
