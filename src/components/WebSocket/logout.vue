<template>
  <Card title="Log日志输出">
    <div class="log-content">
      <div v-for="(item, index) in outPutLog" :key="`log_${index}`">
        {{item}}
      </div>
    </div>
    <i-button type="warning" class="margin-top-10" @click="clearData">Clear</i-button>
  </Card>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name:'logout',
  data(){
    return{
      outPutLog:['【日志为空】']
    }
  },
  computed:{
    basicData(){
      return this.$store.state.mqttData.basicData
    }
  },
  watch:{
    basicData:function(nval){
      if(this.outPutLog.length<10){ 
        this.outPutLog.unshift(nval)
      }else{
        this.outPutLog.pop()
        this.outPutLog.unshift(nval)
      }
    }
  },
  methods:{
    ...mapGetters([
      'showBasicData'
    ]),
    clearData(){
      console.log(this.outPutLog);
      if(this.outPutLog.length==0){
        this.$Message.warning('日志输出为空！')
      }else{
        this.outPutLog=['【日志为空】']
        this.$Message.success('Clear Success！')
      }
    }
  }
}
</script>