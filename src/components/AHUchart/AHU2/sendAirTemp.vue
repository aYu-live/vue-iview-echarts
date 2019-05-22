<template>
  <send :aone='A1'  :seriesName='seriesName' :titleText='titleText'></send>
</template>

<script>
import {send} from '../index'
export default {
  data(){
    return{
      A1:'x36a2A1',
    }
  },
  components:{
    send
  },
  props:{
    seriesName:{
      type:Array,
      default:()=>''
    },
    titleText:{
      type:String,
      default:()=>''
    }
  }
}
</script>
<style lang="less">
</style>
