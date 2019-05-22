<template>
  <statics :pone='pone' :ptwo='ptwo' :hz='hz' :seriesName='seriesName' :titleText='titleText'></statics>
</template>

<script>
import {statics} from '../index'
export default {
  data(){
    return{
      pone:'x36a1P1',
      ptwo:'x36a1P2',
      hz:'x36a1HZ'
    }
  },
  components:{
    statics
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
