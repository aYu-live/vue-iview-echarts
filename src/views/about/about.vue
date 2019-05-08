<template>
  <Row class="about-wrapper">
    <i-col>
      <Card>个人Play</Card>
      <Card class="card-wrapper">
        <Row type="flex" justify="space-around" class="code-row-bg">
          <i-col >
            <Card>
              <img src="@/assets/img/about.jpg" alt="" srcset="">
            </Card>
          </i-col>
          <i-col>
            <Card class="info-card">
              <icon-svg icon="qq" :size="20" color="white" class="icon-svg-sty"></icon-svg>
              QQ：1186619892
            </Card>
            <Card class="info-card">
              <icon-svg icon="weixin1" :size="20" color="white" class="icon-svg-sty"></icon-svg>
              WX:ca6814081
            </Card>
            <Card class="info-card">
              <icon-svg icon="zhifubao1" :size="20" color="white" class="icon-svg-sty"></icon-svg>
              支付宝:1186619892@qq.com <br>
              Id：拼命30狼
            </Card>
          </i-col>
      </Row>
      </Card>
    </i-col>
  </Row>
</template>

<script>
import {getV1Real} from '@/mqtt/data'
export default {
  name:'about',
  methods:{
   getData(){
     getV1Real().then(res=>{
       console.log(res);
     })
   }
  },
  mounted(){
    this.getData()
  }
}
</script>

<style lang="less">
.about-wrapper{
  .card-wrapper{
    display: flex;
    .code-row-bg{
      .ivu-col{
        .info-card{
          margin: 10px 0 0 10px;
          float: left;
          .ivu-card-body{
          padding: 8px;
          }
        }
      }
    }
    .card-content{

    }
  }
  img{
    width: 100%
  }
}
</style>
