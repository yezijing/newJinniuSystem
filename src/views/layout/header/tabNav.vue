<template>
  <div>
    <div class="tabnavBox">
      <div class="tabswiper">
        <ul class="swiper-wrapper">
          <li
            v-for="(item, index) in $store.getters.tabnavBox"
            @contextmenu.prevent="openMenu(item,$event,index)"
            :key="item.title"
            class="tabnav swiper-slide"
            :class="{ active: $route.path === item.path }"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
            <i @click="removeTab(item)" class="el-icon-close" v-if="index !== 0"></i>
          </li>
        </ul>
      </div>
      <div class="tab-prev">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="tab-next">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="btnsbox">
        <a href="javascript:;" @click="removeAllTab">关闭</a>
        <!-- <ul
          v-show="this.rightMenuShow"
          :style="{left:this.left+'px',top:this.top+'px'}"
          class="menuBox"
        >
          <li @click="removeTab($store.getters.rightNav)">
            <i class="fa fa-remove"></i>
            {{ $t('rightMenu.close') }}
          </li>
          <li @click="removeOtherTab($store.getters.rightNav)">{{ $t('rightMenu.closeOther') }}</li>
          <li @click="removeAllTab">{{ $t('rightMenu.closeAll') }}</li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import Swiper from "swiper";
export default {
  name: "tabNav",
  data() {
    return {
      rightMenuShow: true,
      left: 0,
      top: 0
    };
  },
  methods: {
    openMenu(item, e, index) {
      if (index === 0) {
        return false;
      }
      this.$store.dispatch("openMenu", item);
    },
    removeTab(tabItem) {
      this.$store.dispatch("removeTab", {
        tabItem,
        fullPath: this.$route.fullPath,
        router: this.$router
      });
    },
    removeOtherTab(tabItem) {
      this.$store.dispatch("removeOtherTab", { tabItem, router: this.$router });
    },
    removeAllTab() {
      this.$store.dispatch("removeOtherTab", {
        all: true,
        router: this.$router
      });
    }
  },
  mounted() {
    let tabswiper = new Swiper(".tabswiper", {
      navigation: {
        nextEl: ".tab-next",
        prevEl: ".tab-prev"
      },
      slidesPerView: "auto",
      observer: true,
      observeParents: true,
      slidesPerGroup: 2
    });
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
  position: relative;
  padding: 0 70px 0 32px;
  overflow: hidden;
  border-top: 1px solid #f6f6f6;
  border-bottom: 1px solid #d8dce5;
  background: #fff;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tabswiper {
    overflow: hidden;
    height: 36px;
    width: 100%;
    position: relative;
    z-index: 9;
  }
  .btnsbox{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9;
    a{
      display: block;
      height: 36px;
      line-height: 36px;
      color: #999;font-size: 14px;
      width: 40px;
      text-align: center;
    }
  }
  .tab-next {
    position: absolute;
    right: 40px;
    top: 0;
    line-height: 36px;
    height: 36px;
    width: 30px;
    z-index: 12;
    cursor: pointer;
    text-align: center;
    i {
      color: #666;
      font-size: 18px;
    }
    &:focus {
      border: none;
      outline: none;
    }
  }
  .tab-prev {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 12;
    cursor: pointer;
    line-height: 36px;
    height: 36px;
    width: 30px;
    text-align: center;
    i {
      color: #666;
      font-size: 18px;
    }
    &:focus {
      border: none;
      outline: none;
    }
  }
  ul {
    height: 36px;
    li {
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      border-right: 1px solid #f6f6f6;
      overflow: hidden;
      position: relative;
      display: inline-block;
      width: auto;
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
