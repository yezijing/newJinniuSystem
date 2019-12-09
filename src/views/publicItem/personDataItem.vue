<template>
  <div>
    <div class="tabs">
      <a
        @click="tabsClick(item.value)"
        v-for="item in tabsdata"
        :key="item.value"
        href="javascript:;"
        :class="activeIndex==item.value?'active':''"
      >{{item.name}}</a>
    </div>
    <el-table border :data="persondata" style="width: 100%" height="215px" size="small">
      <el-table-column prop="name" label="报送单位"></el-table-column>
      <el-table-column prop="deptname" label="报送类别"></el-table-column>
      <el-table-column prop="type" label="报送关联事务"></el-table-column>
      <el-table-column prop="endtime" label="报送时间"></el-table-column>
      <el-table-column prop="endtime" label="截止时间"></el-table-column>
      <el-table-column prop="endtime" label="经办人"></el-table-column>
      <el-table-column prop="endtime" label="审核" v-if="isCheck"></el-table-column>
      <el-table-column prop="endtime" label="审核不通过原因" v-if="isnoPass"></el-table-column>
      <el-table-column prop="endtime" label="状态" v-if="isAll"></el-table-column>
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
      <el-table-column prop="totalstatus" label="工作推进" width="110">
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
      <el-table-column prop="edit" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "persondata",
  components: {},
  props: ["persondata"],
  data() {
    return {
      tabsdata: [
        { value: 0, name: "全部" },
        { value: 1, name: "待办事项" },
        { value: 2, name: "通过" },
        { value: 3, name: "未通过" }
      ],
      activeIndex: 1,
      isCheck:false,
      isAll:false,
      isnoPass:false,
    };
  },
  created() {},
  watch: {
    persondata: function(newValue, oldValue) {
      this.$emit("update:persondata", newValue);
    }
  },
  methods: {
    tabsClick(value) {
      this.activeIndex = value;
      if(value==1){
          this.isCheck = false;
          this.isAll = false;
          this.isnoPass = false;
      }else if(value==0){
          this.isAll = true;
          this.isCheck = true;
          this.isnoPass = false;
      }else if(value==2){
          this.isAll = false;
          this.isCheck = true;
          this.isnoPass = false;
      }else if(value==3){
          this.isAll = false;
          this.isCheck = true;
          this.isnoPass = true;
      }
    },
    // 详情
    handleClick(row) {},
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  a {
    display: inline-block;
    padding: 0 15px 10px;
    color: #666;
    font-size: 14px;
    margin-right: 30px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #37a2da;
      left: 0;
      bottom: 0;
      width: 0;
      transition: all 0.3s ease;
    }
    &.active {
      color: #37a2da;
      &::after {
        width: 100%;
      }
    }
    &:hover {
      color: #37a2da;
    }
  }
}
</style>
