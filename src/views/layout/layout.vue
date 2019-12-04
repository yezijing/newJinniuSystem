<template>
  <div id="loyout">
    <el-container>
      <layoutAside></layoutAside>
      <el-container class="rightcon">
        <layoutHeader></layoutHeader>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer style="height:40px;">
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from "./aside/aside";
import layoutHeader from "./header/header";
import Bottom from "./Footer/bottom";
import langSelect from "../../components/lang/langSelect";

export default {
  name: "dc-home",
  components: {
    layoutHeader,
    Bottom,
    langSelect,
    layoutAside
  },
  data() {
    return {
      // systemname: JSON.parse(this.$store.getters.systemInfo).setname
    };
  },
  created() {
    document.getElementsByTagName("title")[0].innerHTML = "金牛目督办平台";
    this.$router.push("/index");
  }
};
</script>

<style lang="scss">
.el-radio__inner {
  border: 1px solid #999;
}
.main-enter,
.main-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  position: absolute;
  transition: all 0.3s;
}
.import-ts {
  color: #333;
  font-size: 14px;
  margin-bottom: 20px;
  span {
    color: #f00;
  }
}
.rightcon {
  display: flex;
  flex-direction: column;
}
.el-container.loyoutwrap {
  flex-direction: column;
}

</style>
