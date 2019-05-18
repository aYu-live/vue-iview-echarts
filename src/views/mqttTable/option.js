import echarts from 'echarts/lib/echarts'

export const option={

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    textStyle: {
      fontSize: 20
    }
  },
  dataZoom: [{
    type: 'inside'
  }, {
    type: 'slider'
  }],
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['最大风量', '最小风量','实测风量','风阀开度'],
    textStyle: {
      color: '#032B49',
      fontSize:20
    }
  },
  xAxis: {
    data: [],
    axisLine: {
      lineStyle: {
        color: '#033D6B',
        width:'1'//坐标线的宽度
      }
    }
  },
  grid: {
    top: '10%',
    left: '1%',
    right: '10%',
    containLabel: true
  },
  yAxis: {
    splitLine: {show: false},
    axisLine: {
      lineStyle: {
        color: '#033D6B',
      },
      textStyle: {
        fontSize: 20
      }
    }
  },
  series: [
    {
      name: '最大风量',
      type: 'line',
      smooth: true,
      showAllSymbol: true,
      symbol: 'emptyCircle',
      symbolSize: 8,
      data: [],
    },
    {
      name: '最小风量',
      type: 'line',
      smooth: true,
      showAllSymbol: true,
      symbol: 'emptyCircle',
      symbolSize: 8,
      data: []
    },
    {
      name: '风阀开度',
      type: 'bar',
      barGap: '-100%',
      barWidth: 15  ,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: 'rgba(4,43,81,0.7)'},
              {offset: 0.7, color: 'rgba(4,43,81,0.3)'},
              {offset: 1, color: 'rgba(4,43,81,0.1)'}
            ]
          )
        }
    },
      z: 99,
      data: []
    },
    {
      name: '实测风量',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        normal: {
          barBorderRadius: 5,
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: '#14c8d4'},
              {offset: 1, color: '#43eec6'}
            ]
          )
        }
      },
      data: []
    }
  ]
};