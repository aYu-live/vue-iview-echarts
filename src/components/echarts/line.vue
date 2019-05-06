<template>
  <main>
    <chart
      :init-options="initOptions"
      autoresize
    />

    <section v-if="expand.line">
      <figure>
        <chart
          :options="line"
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
import ECharts from '_c/common-echarts/echarts.vue'
import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/bar'

// import logo from './data/logo'
// import getBar from './data/bar'
import line from './data/line'
// import pie from './data/pie'
// import polar from './data/polar'
// import scatter from './data/scatter'
// import map from './data/map'
// import { c1, c2 } from './data/connect'
// import store from './store'

// built-in theme
// import 'echarts/theme/dark'

// custom theme
// import theme from './theme.json'

// Map of China
// import chinaMap from './china.json'

// registering map data
// ECharts.registerMap('china', chinaMap)

// registering custom theme
// ECharts.registerTheme('ovilia-green', theme)

export default {
  components: {
    chart: ECharts
  },
  // store,
  data () {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      options,
      // logo,
      // bar: getBar(),
      // pie,
      line,
      // polar,
      // scatter,
      // map,
      // c1,
      // c2,
      expand: {
        line:true,
        // bar: true,
        // pie: true,
        // polar: true,
        // scatter: true,
        // map: true,
        // radar: true,
        // connect: true,
        // flight: true
      },
      initOptions: {
        renderer: options.renderer
      },
      // polarTheme: 'dark',
      seconds: -1,
      asyncCount: false,
      connected: true,
      metricIndex: 0,
      open: false,
      img: {},
      flightLoaded: false,
      flightOptions: null
    }
  },
  computed: {
    scoreRadar () {
      return this.$store.getters.scoreRadar
    },
    metrics () {
      return this.$store.state.scores.map(({ name }) => name)
    },
    isMax () {
      let { value, max } = this.$store.state.scores[this.metricIndex]
      return value === max
    },
    isMin () {
      return this.$store.state.scores[this.metricIndex].value === 0
    }
  },
  methods: {
    // refresh () {
    //   // simulating async data from server
    //   this.seconds = 1
    //   let bar = this.$refs.bar
    //   bar.showLoading({
    //     text: 'Loading…',
    //     color: '#4ea397',
    //     maskColor: 'rgba(255, 255, 255, 0.4)'
    //   })
    //   let timer = setInterval(() => {
    //     this.seconds--
    //     if (this.seconds === 0) {
    //       clearTimeout(timer)
    //       bar.hideLoading()
    //       this.bar = getBar()
    //     }
    //   }, 100)
    // },
    // increase (amount) {
    //   if (!this.asyncCount) {
    //     this.$store.commit('increment', { amount, index: this.metricIndex })
    //   } else {
    //     this.$store.dispatch('asyncIncrement', { amount, index: this.metricIndex, delay: 500 })
    //   }
    // },
    // loadFlights () {
      // this.flightLoaded = true

      // let { flight } = this.$refs
      // flight.showLoading({
      //   text: '',
      //   color: '#c23531',
      //   textColor: 'rgba(255, 255, 255, 0.5)',
      //   maskColor: '#003',
      //   zlevel: 0
      // })
      // import('./data/flight.json').then(({ default: data }) => {
      //   flight.hideLoading()

      //   function getAirportCoord (idx) {
      //     return [data.airports[idx][3], data.airports[idx][4]]
      //   }
      //   let routes = data.routes.map(function (airline) {
      //     return [
      //       getAirportCoord(airline[1]),
      //       getAirportCoord(airline[2])
      //     ]
      //   })

      //   this.flightOptions = ({
      //     title: {
      //       text: 'World Flights',
      //       left: 'center',
      //       textStyle: {
      //         color: '#eee'
      //       }
      //     },
      //     backgroundColor: '#003',
      //     tooltip: {
      //       formatter (param) {
      //         let route = data.routes[param.dataIndex]
      //         return data.airports[route[1]][1] + ' > ' + data.airports[route[2]][1]
      //       }
      //     },
      //     geo: {
      //       map: 'world',
      //       left: 0,
      //       right: 0,
      //       silent: true,
      //       itemStyle: {
      //         normal: {
      //           borderColor: '#003',
      //           color: '#005'
      //         }
      //       }
      //     },
      //     series: [
      //       {
      //         type: 'lines',
      //         coordinateSystem: 'geo',
      //         data: routes,
      //         large: true,
      //         largeThreshold: 100,
      //         lineStyle: {
      //           normal: {
      //             opacity: 0.05,
      //             width: 0.5,
      //             curveness: 0.3
      //           }
      //         },
      //         // 设置混合模式为叠加
      //         blendMode: 'lighter'
      //       }
      //     ]
      //   })
      // })
    // }
  },
  watch: {
    // connected: {
    //   handler (value) {
    //     ECharts[value ? 'connect' : 'disconnect']('radiance')
    //   },
    //   immediate: true
    // },
    // 'initOptions.renderer' (value) {
    //   this.options.renderer = value === 'svg' ? value : undefined
    //   let query = qs.stringify(this.options)
    //   query = query ? ('?' + query) : ''
    //   history.pushState({}, document.title, `${location.origin}${location.pathname}${query}${location.hash}`)
    // }
  },
  mounted () {
    // let dataIndex = -1
    // let pie = this.$refs.pie
    // let dataLen = pie.options.series[0].data.length

    // setInterval(() => {
    //   pie.dispatchAction({
    //     type: 'downplay',
    //     seriesIndex: 0,
    //     dataIndex
    //   })
    //   dataIndex = (dataIndex + 1) % dataLen
    //   pie.dispatchAction({
    //     type: 'highlight',
    //     seriesIndex: 0,
    //     dataIndex
    //   })
    //   // 显示 tooltip
    //   pie.dispatchAction({
    //     type: 'showTip',
    //     seriesIndex: 0,
    //     dataIndex
    //   })
    // }, 1000)
  }
}
</script>

<style lang="stylus" scoped>

button
  border 1px solid #4fc08d
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
    min-height 500px
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
</style>
