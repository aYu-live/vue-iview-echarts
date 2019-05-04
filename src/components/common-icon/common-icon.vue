<template>
<row>
    <Card class="common-icon-wrapper">
      <i-col span="8" class="pic-left" :style="styles">
        <icon-svg :icon="icon" :size="60" color="white" class="icon-svg-sty"></icon-svg>
      </i-col>
      <i-col span="10" class="pic-right">
        <div class="number-top">
          <count-to ref="countTo" :end-val="endVal"></count-to>
        </div>
        <div class="name-down">{{this.title}}</div>
      </i-col>
    </Card>
    </row>
</template>


<script>
import CountTo from "@/components/count-to";

export default {
  name: "CommonIcon",
  components: {
    CountTo
  },
  data() {
    return {
      styles:{
        'backgroundColor':this.color
      }
    }
  },
  props: {
    color: {
      type: String,
      default: ""
    },
    endVal:{
      type:Number,
      default:0
    },
    icon:{
      type:String
    },
    title:{
      type:String,
      default:''
    }
  }
};
</script>

<style lang="less" scoped>
.common-icon-wrapper {
  width: 100%;
  height: 100%;
  .pic-left {
    padding-top: 15px;
    float: left;
    height: 106px;
    width: 30%;
    display: table;
    text-align: center;
    .icon-svg-sty {
      padding: 10px 0px;
    }
  }
  .pic-right {
    float: left;
    width: 60%;
    height: 100%;
    display: table;
    text-align: center;
    .number-top {
      text-align: center;
      font-size: 50px;
      padding-top: 10px;
    }
    .name-down {
    }
  }
}
</style>
