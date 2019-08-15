<template>
  <div class="login">
    <div class="form_wrapper">
      <h3 class="title">用户登陆</h3>
      <Form
        ref="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
        label-position="right"
        :label-width="80"
      >
        <Form-item label="用户名" prop="name">
          <Input
            style="width:270px"
            v-model="loginForm.name"
            placeholder="请输入用户名，任意填写"
          />
        </Form-item>
        <Form-item label="密码" prop="password">
          <Input
            style="width:270px"
            v-model="loginForm.password"
            placeholder="请输入用户密码，任意填"
          />
        </Form-item>
        <Form-item>
          <Button type="primary" long style="width:270px" @click="login"
            >登陆</Button
          >
        </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
import localStore from "api/localStore";
export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },
      loginFormRules: {
        name: {
          type: "string",
          required: true,
          trigger: "blur",
          message: "用户名必须填写"
        },
        password: {
          type: "string",
          required: true,
          trigger: "blur",
          message: "用户密码必须填写"
        }
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          localStore.setToken(JSON.stringify(this.loginForm));
          this.$router.push({ name: "home" });
        } else {
          this.$Message.error("表单验证失败！");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  overflow: hidden;
  background-image: url("../assets/login_bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .form_wrapper {
    position: absolute;
    right: 10px;
    top: 30%;
    width: 400px;
    height: 260px;
    background-color: #fff;
    border-radius: 3px;

    .title {
      text-align: center;
      height: 40px;
      line-height: 40px;
      background: linear-gradient(#fff, rgba(0, 0, 0, 0.2), #fff);
      border-bottom: solid 1px #eee;
      margin-bottom: 30px;
    }
  }
}
</style>
