<template>
  <div>
    <el-aside id="asideNav">
      <div class="hideAside">
        <p class="tt"><img class="logo" :src="logoimg" />联智科技</p>
        <span @click="collapse">
          <i class="fa fa-indent fa-lg"></i>
        </span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        @select="selectmenu"
        :collapse="$store.getters.isCollapse"
        background-color="#03152A"
        text-color="#fff"
        active-text-color="#ffffff"
        :router="$store.getters.uniquerouter"
        :unique-opened="$store.getters.uniquerouter"
        :collapse-transition="true"
      >
        <template v-for="(item,index) in $store.getters.routers" v-if="!item.hidden">
          <el-submenu v-if="!item.alone && item.children.length>0" :index="index+''">
            <template slot="title">
              <i :class="item.iconCls?item.iconCls:[fa,fa-server]"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <menu-tree :menuData="item.children"></menu-tree>
          </el-submenu>
          <el-menu-item :index="item.path" v-else>
            <i :class="item.iconCls?item.iconCls:[fa,fa-file]"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import menuTree from "./menuTree";

export default {
  name: "asideNav",
  data() {
    return {
      logoimg: "./static/images/logo.png",
    };
  },
  components: {
    menuTree
  },
  watch: {
    // 监听浏览器直接输入路由，将此路由添加到tabnavBox
    "$route.path": function(val) {
      this.selectmenu(val);
    }
  },
  methods: {
    collapse() {
      this.$store.dispatch("collapse");
    },
    selectmenu(key) {
      let router = this.$store.getters.routers;
      let name = "";
      let navTitle = function(path, routerARR) {
        for (let i = 0; i < routerARR.length; i++) {
          if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
            if (
              routerARR[i].path === path &&
              routerARR[i].children.length < 1
            ) {
              name = routerARR[i].name;
              break;
            }
            navTitle(path, routerARR[i].children);
          }
        }
        return name;
      };
      this.$store.dispatch("addTab", {
        title: navTitle(key, router),
        path: key
      });
    }
  }
};
</script>

<style lang="scss">
#asideNav {
  height: 100%;
  background-color: #141314;
  padding-top: 15px;
  width: auto !important;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .hideAside {
    padding: 0 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tt{
      color: #fff;font-size: 16px;
      font-weight: bold;
      height: 24px;
      line-height: 24px;
      img{
        height: 24px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    span {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      .fa-lg {
        color: #fff;
        font-size: 24px;
      }
    }
  }
  .el-menu .el-menu-item i {
    min-width: 0 !important;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 240px;
    height: 100%;
    overflow-y: scroll;
  }
  .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
    background-color: #141314 !important;
    &::-webkit-scrollbar {
      display: none;
    }
    .fa {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 16px;
    }
    .el-menu-item {
      border-bottom: 1px solid #454648;
      background-color: #141314 !important;
      &:hover {
        color: #ffffff !important;
        background-color: #f36306 !important;
      }
      i {
        display: inline-block;
        min-width: 10px;
        color: #fff;
      }
    }
    .el-menu-item.is-active {
      background-color: #f36306 !important;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      color: #ffffff;
      font-weight: 500;
      font-size: 18px;
    }
    .is-opened > .el-submenu__title > .el-icon-arrow-down {
      font-size: 14px;
    }
    .el-submenu__title {
      background-color: #141314 !important;
      i {
        color: #fff;
      }
    }
  }
}
</style>
