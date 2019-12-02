<template>
  <div class="headwrap">
    <el-header id="header">
      <p class="htitle">
        <!-- <img class="logo" :src="logoimg" />  -->
        企业战略管理平台
      </p>
      <ul class="personal">
        <li class="fullScreen" @click="fullScreen">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
            <i class="fa fa-arrows-alt fa-lg"></i>
          </el-tooltip>
        </li>
        <li>
          <el-badge :is-dot="isDot" class="item">
            <el-button>消息</el-button>
          </el-badge>
        </li>
        <li>
          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              欢迎回来！
              admin
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{ $t('userDropdownMenu.basicInfor') }}</el-dropdown-item>
              <el-dropdown-item command="b">{{ $t('userDropdownMenu.changePassword') }}</el-dropdown-item>
              <el-dropdown-item command="logout" divided>{{ $t('userDropdownMenu.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </el-header>
    <tabNav></tabNav>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import tabNav from "./tabNav";
import { userLogout } from "../../../api/settingApi";
export default {
  name: "Header",
  components: { tabNav },
  data() {
    return {
      logoimg: "./static/images/logo.png",
      isfullScreen: true,
      isDot: true
    };
  },
  created() {},
  methods: {
    fullScreen() {
      if (this.isfullScreen) {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        this.isfullScreen = false;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isfullScreen = true;
      }
    },
    handleCommand(command) {
      if (command === "logout") {
        userLogout("", data => {
          sessionStorage.removeItem("token");
          location.reload();
        });
        // sessionStorage.removeItem("token");
        // location.reload();
      }
      if (command === "a") {
      }
      if (command === "b") {
      }
    }
  }
};
</script>

<style lang="scss">
.headwrap {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 9;
  .el-badge {
    .el-badge__content.is-fixed {
      top: 23px;
    }
    .el-button {
      background: #fff;
      padding: 0;
      border: 0;
    }
  }
  #header {
    height: 60px;
    line-height: 60px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #f0f2f5;
    .htitle {
      color: #333;
      font-size: 20px;
      .logo {
        height: 36px;
        vertical-align: middle;
        margin-right: 5px;
        width: auto;
      }
    }
    .personal {
      display: flex;
      flex-direction: row;
      li {
        margin: 0 13px;
        font-size: 14px;
      }
      .fullScreen {
        cursor: pointer;
        .fa-lg {
          color: #333;
        }
      }
      .el-dropdown-link {
        cursor: pointer;
      }
    }
  }
}
</style>
