<template>
  <div class="headwrap">
    <el-header id="header">
      <p class="htitle">
        <span @click="collapse" class="openbtn">
          <i v-if="$store.getters.logoShow" class="fa fa-indent"></i>
          <i v-else class="fa fa-outdent"></i>
        </span>
        <a class="refresh" @click="reloadPage" href="javascript:;">
          <i class="el-icon-refresh-right"></i>
        </a>
        <a class="tips" href="javascript:;">
          <i class="el-icon-bell"></i>
          <b>5</b>
        </a>
        <a class="notice" href="javascript:;">
          <i class="el-icon-date"></i>
        </a>
      </p>
      <ul class="personal">
        <li class="fullScreen" @click="fullScreen">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
            <i class="fa fa-arrows-alt fa-lg"></i>
          </el-tooltip>
        </li>
        <li>
          <span class="el-dropdown-link">
            欢迎回来！
            admin
          </span>
          <a class="signout" @click="signOut" href="javascript:;">[退出]</a>
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
      isfullScreen: true
    };
  },
  created() {},
  methods: {
    // 刷新页面
    reloadPage() {
      location.reload();
    },
    // 收缩菜单栏
    collapse() {
      this.$store.dispatch("collapse");
    },
    // 全屏
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
    // 退出
    signOut() {
      // userLogout("", data => {
      //   sessionStorage.removeItem("token");
      //   location.reload();
      // });
      sessionStorage.removeItem("token");
      location.reload();
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
      .openbtn {
        display: inline-block;
        cursor: pointer;
        font-size: 16px;
        i {
          font-weight: 100;
        }
      }
      .refresh {
        color: #333;
        font-size: 16px;
        display: inline-block;
        margin-left: 20px;
        i {
          font-weight: normal;
        }
      }
      .tips {
        color: #666;
        font-size: 16px;
        display: inline-block;
        margin-left: 20px;
        position: relative;
        b {
          color: #fff;
          font-size: 12px;
          background-color: #f10404;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          font-weight: normal;
          border-radius: 50%;
          position: absolute;
          right: -7px;
          top: 13px;
        }
      }
      .notice {
        display: inline-block;
        color: #666;
        font-size: 16px;
        margin-left: 20px;
      }
    }
    .personal {
      display: flex;
      flex-direction: row;
      li {
        margin: 0 13px;
        font-size: 14px;
        .signout {
          color: #666;
          font-size: 14px;
          display: inline-block;
          margin-left: 10px;
        }
      }
      .fullScreen {
        cursor: pointer;
        .fa-lg {
          color: #333;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
