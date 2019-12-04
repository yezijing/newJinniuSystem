<template>
  <div>
    <div class="tabnavBox">
      <!-- <transition-group name="list" tag="ul">
        <li
          v-for="(item, index) in $store.getters.tabnavBox"
          @contextmenu.prevent="openMenu(item,$event,index)"
          :key="item.title"
          class="tabnav"
          :class="{ active: $route.path === item.path }"
        >
          <router-link :to="item.path">{{ item.title }}</router-link>
          <i @click="removeTab(item)" class="el-icon-close" v-if="index !== 0"></i>
        </li>
      </transition-group> -->
      <el-tabs
        v-model="tabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
        @tab-click="tabclick"
      >
        <el-tab-pane
          v-for="(item, index) in $store.getters.tabnavBox"
          @contextmenu.prevent="openMenu(item,$event,index)"
          :key="item.title"
          :label="item.title"
          :name="item.title"
        >{{item.title}}</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabNav",
  data() {
    return {
      tabsValue:"",
      tabs:[],
    };
  },
  created(){
    this.tabs = $store.getters.tabnavBox;
    console.log(this.tabs)
  },
  methods: {
    tabclick(val) {
      console.log(val);
      this.$router.push(val.path);
    },
    openMenu(item, e, index) {
      if (index === 0) {
        return false;
      }
      this.$store.dispatch("openMenu", item);
    },
    removeTab(targetName) {
      console.log(targetName)
      let tabs =this.tabs;
      let activeName = this.tabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.title === targetName) {
            let nextTab = tab[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.title;
            }
          }
        });
      }
      this.tabsValue = activeName;
      this.tabs = tabs.filter(tab => tab.title !== targetName);
    },
    // removeTab(tabItem) {
    //   this.$store.dispatch("removeTab", {
    //     tabItem,
    //     fullPath: this.$route.fullPath,
    //     router: this.$router
    //   });
    // }
  },
  watch: {}
};
</script>
<style>
.tabnav {
  display: inline-block;
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-enter-active {
  transition: all 0.5s;
}
.list-leave-active {
  position: absolute;
  transition: all 1s;
}
</style>
<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}
.tabnavBox {
  width: 100%;
  overflow: hidden;
  border-top: 1px solid #f6f6f6;
  border-bottom: 1px solid #d8dce5;
  background: #fff;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  ul {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
    li {
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      border-right: 1px solid #f6f6f6;
      overflow: hidden;
      position: relative;
      &:not(:first-child) {
        padding-right: 10px;
        min-width: 80px;
      }
      a {
        @include set-value(padding, 13px);
        display: inline-block;
        height: 100%;
        font-size: 12px;
        color: #666;
      }
      &:nth-child(n + 2) {
        a {
          padding-right: 15px;
        }
      }
      i {
        cursor: pointer;
        color: #999;
        font-size: 12px;
        &:hover {
          color: #333;
        }
      }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        background-color: #333;
        height: 2px;
        transition: all 0.3s ease;
        transform: translateX(-50%);
      }
    }
    li.active {
      background: #f6f6f6;
      color: #333;
      a {
        color: #333;
      }
      &:after {
        width: 100%;
      }
    }
  }
}

.menuBox {
  margin: 0;
  background: #fff;
  z-index: 999;
  position: absolute;
  padding: 5px 0;
  border: 1px solid #cccccc;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 1px 6px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #e1e6ea;
    }
  }
}
</style>
