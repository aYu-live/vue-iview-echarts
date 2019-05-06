export default function getData () {
  return {
    title: {
      text: '每周用户活跃量',
      x: 'left',
      y: 'top',
    },
    tooltip: {
      trigger : 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
    },
    legend:{},
    grid: {
      left: '3%',     //图表距离左右上下之间的距离
      right: '4%',
      top: '20%',
      bottom: '0',
      containLabel: true
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
  },
    dataset: {
      // Provide data.
      source: [
        ['Day', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        ['Mon', ...randomize()],
        ['Tues', ...randomize()],
        ['Wed', ...randomize()],
        ['Thur', ...randomize()],
        ['Fri', ...randomize()],
        ['Sat', ...randomize()],
        ['Sun', ...randomize()],
      ]
    },
    // Declare X axis, which is a category axis, mapping
    // to the first column by default.
    xAxis: { type: 'category' },
    // Declare Y axis, which is a value axis.
    yAxis: {},
    // Declare several series, each of them mapped to a
    // column of the dataset by default.
    series: [{name:'用户活跃量', type: 'bar' },{name:'访客活跃量',type: 'line'}]
  }
}

function randomize () {
  return [0,0].map(v => {
    return Math.round(50 + Math.random() * 400) 
  })
}
