<template>
  <Submenu :name="parent.name">
    <template slot="title">
      <Icon :type="parent.meta.icon" size="20"/>
       <span class="sider-font-size">{{ parent.meta.title }}</span>
    </template>
    <template v-for="item in parent.children">
      <re-submenu v-if="item.children" :key="`menu_${item.name}`" :name="item.name" :parent="item"></re-submenu>
      <menu-item v-else :key="`menu_${item.name}`" :name="item.name">
        <Icon :type="item.meta.icon" size="20"/>
         <span class="sider-font-size">{{ item.meta.title }}</span>
      </menu-item>
    </template>
  </Submenu>
</template>

<script>
export default {
  name: "ReSubmenu",
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style>
.ivu-dropdown .ivu-select-dropdown{
  z-index: 1000;
}
</style>
