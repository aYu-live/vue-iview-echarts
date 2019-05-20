export default option={
  title: {
    text: this.titleText
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: [{
    type: 'inside'
  }, {
    type: 'slider'
  }],
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + '/' + date.getSeconds() + ' : ' + params.value[1];
    },
    axisPointer: {
      animation: true
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    },
    min:function(value) {
      return value.min - 50;
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [{
    name: this.seriesName,
    itemStyle: {   
      //通常情况下：
      normal:{  
　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
        color: function (params){
          var colorList = ['rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)'];
          return colorList[params.dataIndex>3?params.dataIndex%4:params.dataIndex];
        }
      }
    },
    type: this.line_bar_type,
    showSymbol: false,
    hoverAnimation: false,
    data: this.realData
  }]
}