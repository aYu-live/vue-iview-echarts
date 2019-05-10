<template>
  <div>
    <Card title="导入EXCEL">
      <Row>
        <Upload
          type="drag"
          action=""
          accept=".xls, .xlsx"
          :before-upload='handleBeforeUpload'
          :disabled='disabled'
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" :style="styles"></Icon>
            <p>可以把文件拖拽到此区域</p>
          </div>
        </Upload>
      </Row>
      <Row>
        <div class="ivue-upload-list-file" v-if="file!==null">
          <Icon type='iso-stats'></Icon>
          {{file.name}}
          <Icon v-show="showRemoveFile" type='iso-close' class="ivu-upload-list-remove" @click.native="handleRemove()"></Icon>
        </div>
      </Row>
      <Row>
        <transition name='fade'>
          <Progress v-if="showProgress" :percent="progressPercent" :stroke-width='2' :success-percent='progressPercent'>
            <div v-if="progressPercent == 100">
              <Icon type="ios-checkmark-circle"></Icon>
              <span>成功</span>
            </div>
          </Progress>
        </transition>
      </Row>
    </Card>
    <Row class="margin-top-10">
      <Table :columns='tableTitle' :data="tableData" :loading="tableLoading"></Table>
    </Row>
  </div>
</template>

<script>
import excel from '@/lib/excel'
export default {
  name:'upload_excel',
  data(){
    return{
      disabled:false,
      file:null,
      showRemoveFile:false,
      showProgress:false,
      progressPercent:0,
      tableTitle:[],
      tableData:[],
      tableLoading:false,
      styles:{
        'color': '#3399ff'
      }
    }
  },
  methods:{
    initUpload(){
      this.file=null,
      this.showRemoveFile=false,
      this.progressPercent=0,
      this.tableTitle=[],
      this.tableData=[],
      this.tableLoading=false
    },
    handleRemove(){
      this.initUpload()
      this.$Message.info('上传文件成功删除！')
    },
    handleBeforeUpload(file){
      this.initUpload()
      //提取文件的后缀文件名
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if(fileExt === 'xlsx'|| fileExt === 'xls'){
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件' + file.name + '不是EXCEL文件，请选择后缀名为xlsx或者xls的EXCEL文件！'
        })
        return false
      }
    },
    //读取文件
    readFile(file){
      //引用读取文件的API
      const reader =new FileReader()
      //读取文件方法
      reader.readAsArrayBuffer(file)
      reader.onloadstart= e => {
        this.tableLoading=true
        this.disabled=true
        this.showProgress=true
      }
      reader.onprogress = e =>{
        this.progressPercent = Math.round(e.loaded/e.total *100)
      }
      reader.onerror = e => {
        this.$Message.error('读取失败')
      }
      reader.onload = e => {
        this.$Message.info('文件读取成功')
        const data=e.target.result
        const {header, results} = excel.read(data,'array')
        this.tableTitle
      }
    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="less">
@import './common.less';
</style>
