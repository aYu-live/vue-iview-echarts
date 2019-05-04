<template>
  <div class="info-card-wrapper">
    <row class="row-wrapper code-row-bg" :gutter="20"  type="flex" justify="space-between">
        <i-col :xs="12" :md="10" :lg="8" :xl="4"  v-for="(item,index) in iconList"  :key="`infor-${index}`" style="margin-top:10px">
          <common-icon  shadow :color='item.color' :endVal='item.count' :icon='item.icon' :title="item.title">
           </common-icon>
        </i-col>
        
    </row>
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
}
  .row-wrapper{
    .ivu-col{
      
    }
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

</style>
