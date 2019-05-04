<template>
  <svg class="iconfont-svg" aria-hidden="true" :style="style">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 20
    },
    color:{
      type:String,
      default:''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    },
    style () {
      return {
        fontSize: `${this.size}px`,
        color: this.color
      }
    }
  }
}
</script>

<style>

</style>
