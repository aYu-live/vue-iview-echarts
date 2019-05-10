<template>
    <Header class="header-wrapper">
      <slot></slot>
      <div class="demo-avatar">
         <Dropdown style="margin-left: 20px" trigger='hover'>
        <a href="javascript:void(0)">
          <Avatar src='http://gwjyhs.com/t6/702/1557395366x2890185996.jpg'>U</Avatar>
            <Icon type="ios-arrow-dropdown-circle" size='16' class="icon-style"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem>
              <a href=""  @click="handleLogout">退出登录</a></DropdownItem>
        </DropdownMenu>
    </Dropdown>
         
      </div>
    </Header>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name:'Headers',
  methods:{
    ...mapActions([
      'logout'
    ]),
    handleLogout(){
      this.logout().then(()=>{
        this.$router.push({
          name:'login'
        })
      })
    }
  }
}
</script>

<style lang="less">
.header-wrapper{
  .demo-avatar{
    float: right;
    .icon-style{
      padding:15px 10px 10px 5px;
    }
  }
}
</style>
