<template>
  <div class="list-wrap">
    <p class="title">
      招标代理公司
      <a class="morebtn" v-if="openShow" href="javascript:;" @click="openDown()">···</a>
      <a
        class="el-icon-arrow-down morebtn"
        v-if="closeShow"
        href="javascript:;"
        @click="closeDown()"
      ></a>
    </p>
    <div v-if="closeUp">
      <el-form size="small" :model="agencyForm" label-width="130px" ref="agencyForm">
        <div class="flexbox">
          <el-form-item label="公司名称：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写公司名称"></el-input>
          </el-form-item>
          <el-form-item label="招标编号：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写招标编号"></el-input>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="开户行：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写开户行"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写账号"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="地址：" prop="companyname">
          <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写地址"></el-input>
        </el-form-item>
        <el-form-item label="项目咨询地址：" prop="companyname" class="flexitem">
          <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写项目咨询地址"></el-input>
        </el-form-item>
        <div class="flexbox">
          <el-form-item label="报名咨询联系人：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写报名咨询联系人"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写电话"></el-input>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="财务咨询联系人：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写财务咨询联系人"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写电话"></el-input>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="项目咨询联系人：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写项目咨询联系人"></el-input>
          </el-form-item>
          <el-form-item label="电话：" prop="companyname" class="flexitem">
            <el-input v-model="agencyForm.companyname" auto-complete="off" placeholder="请填写电话"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addclue",
  components: {},
  props: ["agencyForm"],
  data() {
    return {
      openShow: false,
      closeShow: true,
      closeUp: true
    };
  },
  created() {},
  watch: {
    // agencyForm: function(newValue, oldValue) {
    //   this.$emit("update:agencyForm", newValue);
    // }
  },
  methods: {
    //   展开
    openDown() {
      this.closeUp = true;
      this.openShow = false;
      this.closeShow = true;
    },
    // 收回
    closeDown() {
      this.closeUp = false;
      this.openShow = true;
      this.closeShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  .title {
    color: #0099ff;
    font-size: 14px;
    line-height: 20px;
    border-left: 3px solid #0099ff;
    padding-left: 6px;
    position: relative;
    margin-bottom: 15px;
    .morebtn {
      position: absolute;
      right: 0;
      top: 0;
      line-height: 20px;
      color: #0099ff;
      font-size: 24px;
      width: 30px;
      text-align: right;
    }
  }
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{margin-bottom: 12px;}
</style>
