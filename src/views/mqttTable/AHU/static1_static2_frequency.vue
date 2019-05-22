<template>
  <check-connected>
    <Card class="margin-10" slot>
      <Tabs>
          <TabPane label="AHU1_静压1-静压2-风机频率分析" icon="logo-apple">
            <first-stc :seriesName='seriesName1' :titleText='titleText1'></first-stc>
          </TabPane>
          <TabPane label="AHU2_静压1-静压2-风机频率分析" icon="logo-windows">
            <second-stc :seriesName='seriesName1' :titleText='titleText1'></second-stc>
          </TabPane>
      </Tabs>
    </Card>
  </check-connected>
</template>

<script>
import checkConnected from '_c/checkConnected'
import {firstStc} from '_c/AHUchart/AHU1'
import {secondStc} from '_c/AHUchart/AHU2'
export default {
  components:{
    checkConnected,
    firstStc,
    secondStc
  },
  data(){
    return{
      dataId:[],
      dataName:[],
      dataTime:[],
      dataValue:[],
      seriesName1: ['静压1','静压2','风机频率'],
      titleText1: 'AHU1_静压1-静压2-风机频率实时监控',
      seriesName2: ['静压1','静压2','风机频率'],
      titleText2: 'AHU2_静压1-静压2-风机频率实时监控',
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