<template>
  <need :bf='bf' :nf='nf' :seriesName='seriesName' :titleText='titleText'></need>
</template>

<script>
import {need} from '../index'
export default {
  data(){
    return{
      bf:'x36a1BF',
      nf:'x36a1NF'
    }
  },
  components:{
    need
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
