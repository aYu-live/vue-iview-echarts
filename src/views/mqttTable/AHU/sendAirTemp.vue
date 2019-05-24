<template>
  <check-connected>
    <Card class="margin-10" slot>
      <Tabs>
          <TabPane label="AHU1_送风温度分析" icon="ios-home">
            <first-send :seriesName='seriesName1' :titleText='titleText1'></first-send>
          </TabPane>
          <TabPane label="AHU2_送风温度分析" icon="ios-home-outline">
            <second-send :seriesName='seriesName2' :titleText='titleText2'></second-send>
          </TabPane>
      </Tabs>
    </Card>
  </check-connected>
</template>

<script>
import checkConnected from '_c/checkConnected'
import {firstSend} from '_c/AHUchart/AHU1'
import {secondSend} from '_c/AHUchart/AHU2'
export default {
  components:{
    checkConnected,
    firstSend,
    secondSend
  },
  data(){
    return{
      dataId:[],
      dataName:[],
      dataTime:[],
      dataValue:[],
      seriesName1: ['送风温度'],
      titleText1: 'AHU1_送风温度实时监控',
      seriesName2: ['送风温度'],
      titleText2: 'AHU2_送风温度实时监控',
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