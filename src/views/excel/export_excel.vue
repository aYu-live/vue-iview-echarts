<template>
  <div>
    <Card title='导出EXCEL'>
      <Row>
        <Button 
          size="large"
          icon='md-download' 
          :loading='exportLoading'
          @click="exportExcel"
        >导出EXCEL文件
        </Button>
        <Button 
          class="margin-left-10"
          size="large"
          @click="exportData(1)"
        >
        <Icon type="ios-download-outline"></Icon>
        导出CSV原始数据
        </Button>
    <Button 
      class="margin-left-10" 
      size="large" 
      @click="exportData(2)"
    >
    <Icon type="ios-download-outline"></Icon>
    导出CSV排序后的数据
    </Button>
    <Button 
      class="margin-left-10" 
      size="large"
      icon="ios-close"
      :loading='exportLoading'
      @click="deletData"
    >清空数据
    </Button>
      </Row>
    </Card>
    <Row class="margin-top-10">
      <Card :title="`${fileName}`">
        <Table :columns='tableTitle' :data='tableData' ref="tables"></Table>
      </Card>
    </Row>
  </div>
</template>

<script>
import excel from '@/lib/excel'
export default {
  data(){
    return{
      exportLoading:false,
      fileName:'分类列表',
      tableTitle:[
        {
          title: '一级列表',
          key: 'arr1',
          // fixed:'left',
          sortable: true
        },
        {
          title: '二级列表',
          key: 'arr2',
          sortable: true
        },
        {
          title: '三级列表',
          key: 'arr3',
          sortable: true
        },
      ],
      tableData:[
        {
          arr1:1,
          arr2:2,
          arr3:3
        },
        {
          arr1:4,
          arr2:5,
          arr3:6
        },
        {
          arr1:7,
          arr2:8,
          arr3:9
        }
      ]
    }
  },
  methods:{
    deletData(){
      this.exportLoading=true
      this.tableTitle=[]
      this.tableData=[]
      this.exportLoading=false
    },
    exportExcel(){
      if(this.tableData.length){
        this.exportLoading=true
        let key=[]
        let title=[]
        for(let item of this.tableTitle){
          key.push(item.key)
          title.push(item.title)
        }
        const params = {
          title: title,
          key: key,
          data: this.tableData,
          autoWidth:true,
          fileName: this.fileName
        }
        excel.export_array_to_excel(params)
        this.exportLoading=false
      }else{
        this.$Message.info('表格数据不能为空')
      }
    },
    exportData(type){
      if(type===1){
        this.$refs.tables.exportCsv({
          fileName:this.fileName
        })
      }else if(type===2){
        this.$refs.tables.exportCsv({
          fileName:this.fileName,
          original:false
        })
      }
    }
  }
}
</script>

<style lang="less">
@import './common.less';
</style>
