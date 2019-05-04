<template>
    <Header class="header-wrapper">
      <slot></slot>
      <div class="demo-avatar">
         <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
      </div>
    </Header>
</template>

<script>
export default {
  name:'Headers'
}
</script>

<style lang="less">
.demo-avatar{
  float: right;
}
</style>
