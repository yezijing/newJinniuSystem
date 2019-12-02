<template>
  <div class="content-wrap target">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="本公司项目" name="first">
        <own-project></own-project>
      </el-tab-pane>
      <el-tab-pane label="项目合作" name="second">
        <joint-project></joint-project>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ownProject from "./ownProjectItem";
import jointProject from "./jointProjectItem";
export default {
  name: "target",
  components: {
    ownProject,
    jointProject
  },
  data() {
    return {
      activeName: "first",
      userid: JSON.parse(this.$store.getters.userdata).id,
    };
  },
  mounted() {
  },
  created() {
  },
  methods: {
    handleTabClick(tab, event) {
    },
    switchTabs(name) {
      this.activeName = "second";
    },
  }
};
</script>

<style lang="scss">

</style>
