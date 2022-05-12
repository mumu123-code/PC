<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="loginForm"
    >
      <!-- <el-form-item> -->
      <span class="loginTitle">连微哨兵产品分布图</span>
      <!-- </el-form-item> -->
      <el-form-item label="账号" label-width="50px" prop="userName">
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="50px" prop="passWord">
        <el-input v-model="loginForm.passWord"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { loginGet } from "../../assets/js/Login";

export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        userName: "杭州天宏焊接材料有限公司",
        passWord: "123456",
        systemId: 3,
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号！", trigger: "blur" },
        ],
        passWord: [
          { required: true, message: "请输入密码！", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    async login() {
      const res = await loginGet(this.loginForm);
      if (res.code == "1") {
        // 存储页面数据到本地
        sessionStorage.setItem("userInfo", JSON.stringify(res.data));
        // 登录成功跳转到首页
        this.$router.push({
          path: "/home",
        });
      }else{
        this.$message.error('账号或密码错误');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  // background: rgba(255, 255, 255, 0.7);
  // background-image: linear-gradient(
  //   to bottom right,
  //   #f3ece6,
  //   #e5e7eb,
  //   #e4f0e4,
  //   #f5f3e2
  // );
   background-size: 100%;
  background-image: url('https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1652084150833-bg.jpg');
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  .loginForm {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2vw 5vw;
    width: 480px;
    height: 380px;
    background: rgba(241, 242, 240, .1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background-image: linear-gradient(
    //   to bottom right,
    //   #f3ece6,
    //   #e5e7eb,
    //   #e4f0e4,
    //   #f5f3e2
    // );
    box-shadow: 1px 1px 3px 1px #f1f2f0;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    .loginTitle {
      margin-bottom: 14px;
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #a7a8bd;
    }
  }
}
</style>
