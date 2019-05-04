<template>
  <div class="info-card-wrapper">
    <row class="row-wrapper code-row-bg" :gutter="20"  type="flex" justify="space-between">
        <i-col :xs="12" :md="8" :lg="4"  v-for="(item,index) in iconList"  :key="`infor-${index}`">
          <common-icon  shadow :color='item.color' :endVal='item.count' :icon='item.icon' :title="item.title">
           </common-icon>
        </i-col>
        
    </row>
    <row class="chart-row-wrapper code-row-bg" :gutter="16">
        <i-col :xs="12" :md="8" :lg="9"><common-icon></common-icon></i-col>
        <i-col  :xs="12" :md="16" :lg="15"><common-icon></common-icon></i-col>
    </row>
   <button @click="getHomeData">11</button>
  </div>
</template>

<script>
import {getHomeData} from '@/api/data'
import CommonIcon from '_c/common-icon'
export default {
  name:'InfoCard',
  components:{
    CommonIcon
  },
  data(){
    return{
      iconList:''
    }
  },
  methods:{
    getHomeData(){
      getHomeData().then(res=>{
        this.iconList=res;
        
        console.log(this.iconList);
      })
    }
  },
  mounted(){
    this.getHomeData()
  }
}
</script>

<style lang="less">
.info-card-wrapper{
  height: 100%;
  overflow: hidden;
  .ivu-card{
    border-radius:20px;
  }
  .ivu-card-body{
    padding: 0;
    overflow: hidden;
    height: 100%;
    border-radius:20px;
  }
  .row-wrapper{
    
    .col-wrapper{
      .ivu-card-body{
        height: 100%;
      }
    }
  }
  .chart-row-wrapper{
    margin-top:50px;
    i-col{
      padding: 0px;
    }
  }
}
</style>
