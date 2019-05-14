<template>
  <Card title="发布主题">
    <p><span class="bold">Topic：</span><i-input class="input-content" v-model="pubTopic" placeholder='发布主题Topic'></i-input></p>
    <p class=" margin-top-10">
      <span class="bold">Payload：</span>
      <i-input v-model="payload" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="输入发送指令" />
      <Dropdown trigger="click" placement='bottom-start' class="margin-top-10">
          <span class="bold">QOS：</span>
          <i-button type='default'>
              <span class="bold">QOS</span>
              <Icon type="ios-arrow-down"></Icon>
          </i-button>
          <DropdownMenu slot="list">
              <DropdownItem>0</DropdownItem>
              <DropdownItem>1</DropdownItem>
              <DropdownItem>2</DropdownItem>
          </DropdownMenu>
      </Dropdown>
    </p>
    <p class="margin-top-10">
      <span class="bold">Retained：</span>
        <i-switch  :value='Retained'  class="margin-5" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
        <i-button class="pub-button-content" type="error">发布</i-button>
    </p>
  </Card>
</template>

<script>
export default {
  name:'publish',
  data(){
    return{
      pubTopic:'',
      payload:'',
      Retained:''
    }
  }
}
</script>
