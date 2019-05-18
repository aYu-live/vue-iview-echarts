<template>
  <main>
    <section>
      <figure>
        <chart
          :options="option"
          :init-options="initOptions"
          ref="line"
          theme="ovilia-green"
          autoresize
        />
        </figure>
    </section>
  </main>
</template>

<script>
import qs from 'qs'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import EChart from '_c/common-echarts/echarts.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import { setInterval } from 'timers';
import { close } from 'fs';
export default {
  components: {
    chart: EChart
  },
  data () {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      initOptions: {
        renderer: options.renderer
      },
      line_bar_type:'line',
      seconds: -1,
    }
  },
  props:{
    realData:{
      type:Array,
      default:()=>[]
    },
    option:{
      type:Object,
      default:()=>({})
    }
  }
}
</script>

<style lang="stylus" scoped>

button

  border  1px solid #4fc08d
  border-radius 2em
  background-color #fff
  color #42b983
  cursor pointer
  font inherit
  transition opacity .3s

  &:focus
    outline none
    box-shadow 0 0 1px #4fc08d

  &:active
    background rgba(79, 192, 141, .2)

  &[disabled]
    opacity .5
    cursor not-allowed

  &.round
    width 1.6em
    height 1.6em
    position relative

    &::before,
    &::after
      content ""
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 9px
      height 1px
      background-color #42b983

    &::after
      width 1px
      height 9px

    &.expand::after
      display none

figure
  display inline-block
  position relative
  margin 0 auto
  border 1px solid rgba(0, 0, 0, .1)
  border-radius 8px
  box-shadow 0 0 45px rgba(0, 0, 0, .2)
  padding 1.5em 2em
  width 100%
  height 100%

  .echarts
    width 100%
    min-height 800px
    height 300px

@media (min-width 980px)
  figure.half
    padding 1em 1.5em
    min-width calc(240px + 3em)

    .echarts
      width 28vw
      min-width 240px
      height 180px

    &:not(:last-child)
      margin-right 15px

@media (max-width 980px)
  p
    display flex
    justify-content center

    select
      text-indent calc(50% - 1em)

    select,
    label
      border 1px solid #4fc08d
      border-radius 2em
      background-color #fff
      color #42b983
      cursor pointer
      transition opacity .3s

    button,
    input,
    select,
    label
      flex 1 0
      margin 0 .5em
      padding 0
      line-height 2.4em
      max-width 40vw
      border-radius 2px
      font-size .8em

    select
      -webkit-appearance none

    input[type="checkbox"]
      display none

      &:checked + label
        background #42b983
        color #fff

  figure
    margin 1em auto
    padding 0 1em
    border none
    border-radius 0
    box-shadow none

    .echarts
      width 100%
      min-width 0
      height 75vw

.renderer
  position fixed
  top 10px
  left 10px
  font-size 12px
  text-align center

  button
    float left
    position relative
    width 48px
    border-radius 4px

    &.active
      z-index 1
      background-color #4fc08d
      color #fff

    &:first-child
      border-top-right-radius 0
      border-bottom-right-radius 0

    &:last-child
      left -1px
      border-top-left-radius 0
      border-bottom-left-radius 0
.margin-10
  margin 10px
</style>
