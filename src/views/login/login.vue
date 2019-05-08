<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <button @click="a1">11111</button>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
    name: 'login',
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit ({ userName, password }) {
      console.log(1);
      this.handleLogin({ userName, password }).then(res => {
          this.$router.push({
            name: 'home'
          })
      })
    },
    a1(){
      console.log(this.handleLogin);
    }
  }
}
</script>

<style lang="less">
  @import './login.less';
</style>
