import CountTo from "@/components/count-to"
export const AHUcolums=
[
  {
    title: '序号',
    key: 'id',
    sortable:true
  },
  {
    title: '分区',
    key: 'partition'
  },
  {
    title: '设备',
    key: 'device',
    sortable:true
  },
  {
    title: '静压1',
    key: 'P1',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '静压2',
    key: 'P2',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '实测风量',
    key: 'BF',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '需求风量',
    key: 'NF',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '风机频率',
    key: 'HZ',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '回风温度',
    key: 'RT',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '水阀开度',
    key: 'PV',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '送风温度',
    key: 'A1',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '最小风量',
    key: 'A2',
    sortable:true
  },
  {
    title: '最大风量',
    key: 'A3',
    sortable:true
  }
]

export const VAVcolums=
[
  {
    title: '序号',
    key: 'id',
    sortable:true,
  },
  {
    title: '分区',
    key: 'partition',
    sortable:true
  },
  {
    title: '设备',
    key: 'device',
    sortable:true
  },
  {
    title: '实测温度',
    key: 'T',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '实测风量',
    key: 'F',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '最小风量',
    key: 'N',
    sortable:true
  },
  {
    title: '最大风量',
    key: 'M',
    sortable:true
  },
  {
    title: '风阀开度',
    key: 'P',
    sortable:true
  },
  {
    title: '面板温度设定值',
    key: 'A',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  },
  {
    title: '占用模式',
    key: 'B',
    sortable:true,
    render: (h, params) => {
      return h(CountTo, {
        props: {
          startVal:params.row[params.column.key],
          decimals:2,
          duration:0,
          endVal: params.row[params.column.key]
        }
      })
    }
  }
]