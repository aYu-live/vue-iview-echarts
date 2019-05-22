<template>
  <water :rt='rt' :pv='pv' :seriesName='seriesName' :titleText='titleText'></water>
</template>

<script>
import {water} from '../index'
export default {
  data(){
    return{
      rt:'x36a1RT',
      pv:'x36a1PV'
    }
  },
  components:{
    water
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
