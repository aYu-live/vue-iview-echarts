<template>
  <check-connected>
    <Card class="margin-10" slot>
      <Tabs>
          <TabPane label="AHU1_实测风量-需求风量分析" icon="logo-apple">
            <first-needs :seriesName='seriesName1' :titleText='titleText1'></first-needs>
          </TabPane>
          <TabPane label="AHU2_实测风量-需求风量分析" icon="logo-windows">
            <second-needs :seriesName='seriesName2' :titleText='titleText2'></second-needs>
          </TabPane>
      </Tabs>
    </Card>
  </check-connected>
</template>

<script>
import checkConnected from '_c/checkConnected'
import {firstNeeds} from '_c/AHUchart/AHU1'
import {secondNeeds} from '_c/AHUchart/AHU2'
export default {
  components:{
    checkConnected,
    firstNeeds,
    secondNeeds
  },
  data(){
    return{
      dataId:[],
      dataName:[],
      dataTime:[],
      dataValue:[],
      seriesName1: ['实测风量','需求风量'],
      titleText1: 'AHU1_实测风量-需求风量实时监控',
      seriesName2: ['实测风量','需求风量'],
      titleText2: 'AHU2_实测风量-需求风量实时监控',
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