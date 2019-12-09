<template>
  <div>
    <el-table border :data="warnlist" style="width: 100%" height="215px" size="small">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="deptname" label="牵头单位"></el-table-column>
      <el-table-column prop="type" label="报送类别"></el-table-column>
      <el-table-column prop="endtime" label="截止时间" width="90"></el-table-column>
      <el-table-column prop="formstatus" label="材料报送" width="80">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.formstatus==1">
              <el-tag type="warning" size="small">
                <i class="fa mark" style="background:#eaa28b;"></i>
                <span>预警</span>
              </el-tag>
            </div>
            <div v-else-if="scope.row.formstatus==-1">
              <el-tag type="info" size="small">
                <i class="fa mark" style="background:#999;"></i>
                <span>完结</span>
              </el-tag>
            </div>
            <div v-else-if="scope.row.formstatus==0">
              <el-tag size="small">
                <i class="fa mark" style="background:#409EFF;"></i>
                <span>正常</span>
              </el-tag>
            </div>
            <div v-else-if="scope.row.formstatus==2">
              <el-tag type="danger" size="small">
                <i class="fa mark" style="background:#f56c6c;"></i>
                <span>逾期</span>
              </el-tag>
            </div>
            <div v-else>
              <span>/</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="totalstatus" label="总体进度" width="100">
        <template slot-scope="scope">
          <div>
            <div v-if="scope.row.totalstatus==3">
              <el-tag type="warning" size="small">
                <i class="fa mark" style="background:#eaa28b;"></i>
                <span>滞后</span>
              </el-tag>
            </div>
            <div v-else-if="scope.row.totalstatus==-1">
              <el-tag type="info" size="small">
                <i class="fa mark" style="background:#999;"></i>
                <span>完结</span>
              </el-tag>
            </div>
            <div v-else-if="scope.row.totalstatus==0">
              <el-tag size="small">
                <i class="fa mark" style="background:#409EFF;"></i>
                <span>正常</span>
              </el-tag>
            </div>
            <div v-else-if="scope.row.totalstatus==4">
              <el-tag type="danger" size="small">
                <i class="fa mark" style="background:#f56c6c;"></i>
                <span>严重滞后</span>
              </el-tag>
            </div>
            <div v-else>
              <span>/</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="edit" label="操作">
        <template slot-scope="scope">
          <!-- 牵头单位显示 -->
          <div v-if="isQiantou">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            <el-button type="text" size="small">报送</el-button>
          </div>
          <!-- 区委办角色显示 -->
          <el-button v-if="isQuweiban" type="text" size="small">催办</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "warnlist",
  components: {},
  props: ["warnlist"],
  data() {
    return {
      // 牵头单位角色
      isQiantou: true,
      // 区委办角色
      isQuweiban: false
    };
  },
  created() {},
  watch: {
    warnlist: function(newValue, oldValue) {
      this.$emit("update:warnlist", newValue);
    }
  },
  methods: {
    // 详情
    handleClick(row) {},
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
