<template>
  <div class="list-wrap">
    <p class="title">
      投标小组（**人）
      <a class="addbtn" href="javascript:;" @click="addInfoList">
        <span>+</span> 添加
      </a>
      <a class="morebtn" v-if="openShow" href="javascript:;" @click="openDown()">···</a>
      <a
        class="el-icon-arrow-down morebtn"
        v-if="closeShow"
        href="javascript:;"
        @click="closeDown()"
      ></a>
    </p>
    <div v-if="closeUp">
      <ul class="list">
        <li v-for="(aitem,index) in tenderTeamList" :key="index">
          <div class="txts">
            <p class="t1">小组成员：{{aitem.name}}</p>
            <p class="t2">{{aitem.duty}}</p>
            <p class="t3">{{aitem.remark}}</p>
          </div>
          <div class="btns">
            <el-button size="small" @click="infoDetail(index)">详情</el-button>
            <el-button size="small" @click="infoEdit(index)">编辑</el-button>
            <el-button size="small" @click="infoDelete(index)">删除</el-button>
          </div>
        </li>
      </ul>
    </div>

    <!-- 添加、编辑 -->
    <el-dialog
      :title="infoTitle"
      :visible.sync="infoFormVisible"
      width="640px"
      v-dialogDrag
      append-to-body
    >
      <el-form size="small" :model="infoForm" label-width="110px" ref="infoForm">
        <el-form-item
          label="小组成员："
          prop="name"
          :rules="[{ required: true, message: '请填写单位全称', trigger: 'change' }]"
        >
          <el-input
            :readonly="isRead"
            v-model="infoForm.name"
            auto-complete="off"
            placeholder="请填写单位全称"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作职责：" prop="duty">
          <el-input
            :readonly="isRead"
            v-model="infoForm.duty"
            auto-complete="off"
            placeholder="请填写工作职责"
          ></el-input>
        </el-form-item>
        <el-form-item label="说明：" prop="remark">
          <el-input
            type="textarea"
            :readonly="isRead"
            :autosize="{ minRows: 3}"
            v-model="infoForm.remark"
            placeholder="说明"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="infoFormVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitInfoForm()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tenderTeam",
  components: {},
  props: ["tenderTeamList"],
  data() {
    return {
      openShow: false,
      closeShow: true,
      closeUp: true,
      infoTitle: "",
      infoFormVisible: false,
      infoForm: {},
      isType: "",
      isRead: false
    };
  },
  created() {},
  watch: {
    // partAlist: function(newValue, oldValue) {
    //   this.$emit("update:partAlist", newValue);
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
    },
    //   新增列表数据
    addInfoList() {
      this.infoTitle = "添加招标小组";
      this.infoFormVisible = true;
      this.isType = "add";
      this.isRead = false;
      this.infoForm = {};
    },
    // 详情
    infoDetail(index) {
      this.infoTitle = "招标小组详情";
      this.isRead = true;
      this.infoForm = Object.assign({}, this.tenderTeamList[index]);
      this.infoFormVisible = true;
      this.isType = "detail";
    },
    // 编辑
    infoEdit(index) {
      this.infoTitle = "编辑招标小组";
      this.infoFormVisible = true;
      this.isType = "edit";
      this.isRead = false;
      this.infoForm = Object.assign({}, this.tenderTeamList[index]);
    },
    // 删除
    infoDelete(index) {
      this.tenderTeamList.splice(index, 1);
    },
    // 表单提交
    submitInfoForm() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if (this.isType == "add") {
            this.addInfoSubmit();
          } else if (this.isType == "edit") {
            this.editInfoSubmit();
          } else {
            this.infoFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    // 添加提交
    addInfoSubmit() {
      let obj = Object.assign({}, this.infoForm);
      this.tenderTeamList.push(obj);
      this.infoFormVisible = false;
    },
    // 编辑提交
    editInfoSubmit(index) {
      let obj = Object.assign({}, this.infoForm);
      this.tenderTeamList.splice(this.index, 1, obj);
      this.infoFormVisible = false;
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
    .addbtn {
      position: absolute;
      right: 35px;
      top: 0;
      line-height: 20px;
      color: #0099ff;
      font-size: 14px;
      span {
        font-weight: bold;
        display: inline-block;
        margin-right: 3px;
      }
    }
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
  .list {
    // padding-right: 60px;
    li {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      cursor: pointer;
      padding: 5px 10px;
      .txts {
        display: flex;
        width: 78%;
        p {
          color: #333;
          font-size: 12px;
          margin-right: 15px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p + p {
          border-left: 1px solid #ccc;
          padding-left: 15px;
        }
        .t1 {
          width: 150px;
          flex-shrink: 0;
        }
        .t2 {
          width: 260px;
          flex-shrink: 0;
        }
        .t3 {
          flex: 1;
        }
      }
      .btns {
        opacity: 0;
        visibility: hidden;
        width: 110px;
        flex-shrink: 0;
        .el-button {
          border: 0;
          background: transparent;
          color: #0099ff;
          padding: 0;
        }
      }
      &:hover {
        background: #eee;
        .btns {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}
</style>
