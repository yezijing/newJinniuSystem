<template>
  <div id="login" :style="loginBg">
    <div class="loginbox">
      <p class="title">金牛目督办平台</p>
      <div class="content">
        <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名：" prop="logname">
            <el-input
              type="text"
              v-model="loginForm.logname"
              auto-complete="off"
              placeholder="请输入登录账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="请输入登录密码"
              @keyup.enter.native="submitForm"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="验证码：" prop="yzm" class="codebox">
            <el-input
              type="text"
              v-model="loginForm.yzm"
              auto-complete="off"
              placeholder="请输入验证码"
              @keyup.enter.native="submitForm"
            ></el-input>
            <input type="button" @click="createCode" class="verification" v-model="checkCode" />
          </el-form-item>-->
          <el-form-item>
            <el-button class="subBtn" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { userLogin } from "../../api/settingApi";
import md5 from "md5";
export default {
  data() {
    return {
      loginBg: {
        backgroundImage: "url(" + require("../../assets/loginbg.png") + ")"
      },
      btnBg: {
        backgroundImage: "url(" + require("../../assets/btnbg.png") + ")"
      },
      loginForm: {
        username: "",
        password: ""
      },
      checkCode: "",
      code: "",
      picLyanzhengma: ""
    };
  },
  methods: {
    submitForm() {
      let {
        loginForm: { logname, password, yzm }
      } = this;
      if (logname === "" || password === "") {
        this.$message({
          showClose: true,
          message: "账号/密码不能为空",
          type: "error"
        });
        return false;
      } else {
        let upara = { logname: logname, password: md5(password) };
        this.$store.dispatch("setToken", logname).then(() => {
          this.$message({
            message: "登录成功！",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 1000);
        });
      }
    },
    // 生成验证码
    createCode() {
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      this.picLyanzhengma = "";
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    }
  },
  mounted() {
    this.createCode();
  }
};
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  .loginbox {
    position: absolute;
    width: 600px;
    top: 50%;
    transform: translateY(-50%);
    background: #eee;
    left: 50%;
    margin-left: -300px;
    border-radius: 10px;
    padding: 50px;
    .title {
      text-align: center;
      color: #3eaf7c;
      font-size: 24px;
      letter-spacing: 1px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .subBtn {
      width: 100%;
      background-color: #f36306;
      border-color: #f36306;
      transition: all 0.3s ease;
      color: #fff;
      margin-top: 30px;
    }
    .subBtn:hover {
      background-color: #ec6610;
    }
    .el-input__inner {
      border: 1px solid #ccc;
    }
    .codebox {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .verification {
          background-color: #fff;
          margin-left: 20px;
          border: 1px solid #ccc;
          width: 150px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 7px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
