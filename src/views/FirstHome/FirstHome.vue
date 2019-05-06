<template>
  <div class="home-wrapper">
    <info-card></info-card>   
    <row class="chart-row-wrapper code-row-bg" :gutter="24"  type="flex" justify="space-between">
        <i-col :xl="12" :lg="24" :md="24"><Card class="common-icon-wrapper"><echart-pie></echart-pie></Card></i-col>
        <i-col :xl="12" :lg="24" :md="24"><Card class="common-icon-wrapper"><echart-bar></echart-bar></Card></i-col>
    </row>
    <row class="chart-row-wrapper code-row-bg">
      <i-col><Card class="common-icon-wrapper" style="min-height:500px"><echart-line></echart-line></Card></i-col>
    </row>
  </div>
</template>

<script>
import InfoCard from '_c/info-card'
import {echartBar, echartPie, echartLine} from '_c/echarts'
export default {
  name:'firstHome',
  components:{
    InfoCard,
    echartBar,
    echartPie,
    echartLine
  },

}
</script>

<style lang="less">
.home-wrapper{
  margin: 0px 20px;
  .chart-row-wrapper{
    .common-icon-wrapper{
      height: 100%;
      .ivu-card-body{
        padding: 5px;
        height: 100%;
      }
    }
  }
}

</style>
