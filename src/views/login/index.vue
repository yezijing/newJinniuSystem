<template>
  <div id="login" :style="backgroundDiv">
    <div class="loginbox">
      <p class="title" :style="btnbackgroundDiv">联智ESM管理系统</p>
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
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="yzm" class="codebox">
            <el-input
              type="text"
              v-model="loginForm.yzm"
              auto-complete="off"
              placeholder="请输入验证码"
              @keyup.enter.native="submitForm"
            ></el-input>
            <input type="button" @click="createCode" class="verification" v-model="checkCode" />
          </el-form-item>
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
      backgroundDiv: {
        backgroundImage: "url(" + require("../../assets/loginbg.png") + ")"
      },
      btnbackgroundDiv: {
        backgroundImage: "url(" + require("../../assets/btnbg.png") + ")"
      },
      loginForm: {
        username: "",
        password: "",
        yzm: ""
      },
      checkCode: "",
      code: "",
      picLyanzhengma: ""
    };
  },
  methods: {
    submitForm() {
      console.log(this.loginForm);
      let {
        loginForm: { logname, password, yzm }
      } = this;
      if (logname === "" || password === "" || yzm === "") {
        this.$message({
          showClose: true,
          message: "账号/密码/验证码不能为空",
          type: "error"
        });
        return false;
      } else {
        if (this.loginForm.yzm.toUpperCase() == this.checkCode) {
          let upara = { logname: logname, password: md5(password) };
          userLogin(upara, ({ data: { code, msg, obj } }) => {
            let { updatetime } = obj;
            this.$store.dispatch("setUserData", JSON.stringify(obj));
            this.$store.dispatch("setToken", logname).then(() => {
              this.$message({
                message: "登录成功！",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ path: "/" });
              }, 1000);
            });
          });
        } else {
          this.$message({
            showClose: true,
            message: "验证码错误",
            type: "error"
          });
          return false;
        }
      }
    },
    submitFormTest() {
      let that = this;
      if (
        this.loginForm.username === "" ||
        this.loginForm.password === "" ||
        this.loginForm.yzm === ""
      ) {
        this.$message({
          showClose: true,
          message: "账号/密码/验证码不能为空",
          type: "error"
        });
        return false;
      } else {
        if (this.loginForm.yzm.toUpperCase() == this.checkCode) {
          that.$store
            .dispatch("setToken", that.loginForm.username)
            .then(() => {
              that.$router.push({ path: "/" });
            })
            .catch(res => {
              that.$message({
                showClose: true,
                message: res,
                type: "error"
              });
            });
        } else {
          this.$message({
            showClose: true,
            message: "验证码错误",
            type: "error"
          });
          return false;
        }
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
      var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    }
    // message() {
    //   const h = this.$createElement;
    //   this.$notify({
    //     title: "账号密码",
    //     message: h(
    //       "i",
    //       { style: "color: teal" },
    //       "用于测试，账号密码可以随意填写"
    //     ),
    //     duration: 2000
    //   });
    // }
  },
  mounted() {
    // this.message();
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
    padding: 70px 50px 50px;
    .title {
      position: absolute;
      height: 68px;
      padding-left: 28px;
      padding-top: 18px;
      top: -28px;
      left: 0;
      width: 100%;
      text-align: center;
      color: #fff;
      background-repeat: no-repeat;
      background-position: center;
      font-size: 16px;
      letter-spacing: 1px;
    }
    .subBtn {
      width: 274px;
      background-color: #f36306;
      border-color: #f36306;
      transition: all 0.3s ease;
      color: #fff;
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
