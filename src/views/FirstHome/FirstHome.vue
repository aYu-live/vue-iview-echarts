<template>
  <div class="home-wrapper">
    <info-card></info-card>
  </div>
</template>

<script>
import InfoCard from '_c/info-card'
export default {
  name:'firstHome',
  components:{
    InfoCard
  },

}
</script>

<style lang="less" scoped>
.home-wrapper{
  margin: 0px 20px;
}
</style>
