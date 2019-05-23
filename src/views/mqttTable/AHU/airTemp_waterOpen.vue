<template>
  <check-connected>
    <Card class="margin-10" slot>
      <Tabs>
          <TabPane label="AHU1_回风温度-水阀开度分析" icon="logo-apple">
            <first-water :seriesName='seriesName1' :titleText='titleText1'></first-water>
          </TabPane>
          <TabPane label="AHU2_回风温度-水阀开度分析" icon="logo-windows">
            <second-water :seriesName='seriesName2' :titleText='titleText2'></second-water>
          </TabPane>
      </Tabs>
    </Card>
  </check-connected>
</template>

<script>
import checkConnected from '_c/checkConnected'
import {firstWater} from '_c/AHUchart/AHU1'
import {secondWater} from '_c/AHUchart/AHU2'
export default {
  components:{
    checkConnected,
    firstWater,
    secondWater
  },
  data(){
    return{
      dataId:[],
      dataName:[],
      dataTime:[],
      dataValue:[],
      seriesName1: ['回风温度','水阀开度'],
      titleText1: 'AHU1_回风温度-水阀开度实时监控',
      seriesName2: ['回风温度','水阀开度'],
      titleText2: 'AHU2_回风温度-水阀开度实时监控',
    }
  },
  methods:{
    
  },
  computed:{
      
  },
  watch: {
    
  },
  mounted(){
    
  }
}
</script>

<style lang="less">

</style>