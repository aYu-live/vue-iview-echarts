<template>
  <Card title="发布主题">
    <p><span class="bold">Topic：</span><i-input class="input-content" v-model="pubTopic" placeholder='请输入主题'></i-input></p>
    <div class=" margin-top-10">
      <span class="bold">Payload：</span>
      <i-input v-model="payload" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="输入发送指令，请输入格式为：Strings/ JSON/ XML/ Characters" />
      <p class="margin-top-10">
        <Dropdown trigger="click" placement='bottom-start' @on-click="getQos">
          <i-button type='default'>
              <span class="bold">QOS</span>
              <Icon type="ios-arrow-down"></Icon>
          </i-button>
          <DropdownMenu slot="list">
              <DropdownItem name='0'>0 - Almost Once</DropdownItem>
              <DropdownItem name='1'>1 - Atleast Once</DropdownItem>
              <DropdownItem name='2'>2 - Exactly Once</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </p>
    <span class="margin-5">默认：qos:{{pubQOS}}</span>
    </div>
    <p class="margin-top-10">
      <span class="bold">Retained：</span>
        <i-switch  :value='Retained'  class="margin-5" size="large" @on-change='getRetained'>
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
        <span class="bold">Retain：{{Retained}}</span>
        <i-button class="pub-button-content" type="error" @click="publishTopic" :disabled='getStatus'>发布</i-button>
    </p>
  </Card>
</template>

<script>
import {mapActions, mapGetters,mapState} from 'vuex'

export default {
  name:'publish',
  data(){
    return{
      pubTopic:'/World',
      payload:
      `你明白，我宠你嘛
 N M B , W C M N`,
      Retained:true,
      pubQOS:0
    }
  },
  computed: {
      getStatus:function(){
        if(this.$store.state.mqttData.client.connected===true){
          return false
        }else{
          return true
        }
      }
    },
  methods:{
    
    getQos(name){
      this.pubQOS=Number.parseInt(name)
    },
    publishTopic(){
      const client = this.$store.state.mqttData.client
      const options=Object.assign({qos:this.pubQOS},{retain:this.Retained})
      console.log(options);
      if(this.getStatus){
        this.$Message.error('尚未连接')
      }else{
        if(this.pubTopic.trim()!==''&& this.payload.trim()!==''){
          console.log(client.publish(this.pubTopic,this.payload,options));
          this.$Message.success('发送主题成功')
          console.log(client);
        }else{
          this.$Message.warning('发布主题或内容不可为空')
        }
      }
    },
    getRetained(events){
      this.Retained=events
    }
  }
}

</script>

<style lang="less" scoped>
.pub-button-content{
  float: right;
}
</style>
