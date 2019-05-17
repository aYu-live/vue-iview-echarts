<template>
  <div>
    <button @click="getdata">11</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:'allDataTable',
  data(){
    return{
      basicData:''
    }
  },
  computed:{
    
  },
  watch:{
    showBasicData:function(nval){
      console.log(nval);
    }
  },
  methods:{
    ...mapGetters([
      'showBasicData'
    ]),
  getdata(){
    console.log(this.showBasicData());
  }
  }
}
</script>

<style lang="less">
@import url('./dataTable.less');
</style>
