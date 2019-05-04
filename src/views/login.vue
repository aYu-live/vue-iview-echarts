<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <input v-model="userName" />
        <input type="password" v-model="password"/>
        <button @click="handleSubmit">登录</button>
        </Card>
    </div>
  </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login_page',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit () {
      this.login({
        userName: this.userName,
        password: this.password
      }).then(() => {
        console.log('success!!')
        this.$router.push({
          name: 'home'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}

</style>
