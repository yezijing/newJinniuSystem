<template>
  <div class="list-wrap">
    <p class="title">
      {{listTitle}}
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
        <li v-for="(aitem,index) in infoList" :key="index">
          <div class="txts">
            <p class="t1">{{aitem.companyname}}</p>
            <p class="t2">{{aitem.name}}</p>
            <p class="t3">{{aitem.phone}}</p>
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
          label="单位全称："
          prop="companyname"
          :rules="[{ required: true, message: '请填写单位全称', trigger: 'change' }]"
        >
          <el-input
            :readonly="isRead"
            v-model="infoForm.companyname"
            auto-complete="off"
            placeholder="请填写单位全称"
          ></el-input>
        </el-form-item>
        <div class="flexbox">
          <el-form-item
            label="单位联系人："
            prop="name"
            class="flexitem"
            :rules="[{ required: true, message: '请填写单位联系人', trigger: 'change' }]"
          >
            <el-input
              :readonly="isRead"
              v-model="infoForm.name"
              auto-complete="off"
              placeholder="请填写单位联系人"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="联系人电话："
            prop="phone"
            class="flexitem"
            :rules="[{ required: true, message: '请填写联系人电话', trigger: 'change' }]"
          >
            <el-input
              :readonly="isRead"
              v-model="infoForm.phone"
              auto-complete="off"
              placeholder="请填写联系人电话"
            ></el-input>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="单位负责人：" prop="name" class="flexitem">
            <el-input
              :readonly="isRead"
              v-model="infoForm.name"
              auto-complete="off"
              placeholder="请填写单位负责人"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人电话：" prop="phone" class="flexitem">
            <el-input
              :readonly="isRead"
              v-model="infoForm.phone"
              auto-complete="off"
              placeholder="请填写负责人电话"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="详细情况描述：" prop="remark">
          <el-input
            type="textarea"
            :readonly="isRead"
            :autosize="{ minRows: 3}"
            v-model="infoForm.remark"
            placeholder="详细情况描述"
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
  name: "addclue",
  components: {},
  props: ["infoList", "listTitle"],
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
      if (this.listTitle == "设计单位") {
        this.infoTitle = "添加设计单位";
      } else if (this.listTitle == "监理单位") {
        this.infoTitle = "添加监理单位";
      } else if (this.listTitle == "总包单位") {
        this.infoTitle = "添加总包单位";
      } else if (this.listTitle == "合作单位") {
        this.infoTitle = "添加合作单位";
      } 
      this.infoFormVisible = true;
      this.isType = "add";
      this.isRead = false;
      this.infoForm = {};
    },
    // 详情
    infoDetail(index) {
      if (this.listTitle == "设计单位") {
        this.infoTitle = "设计单位详情";
      } else if (this.listTitle == "监理单位") {
        this.infoTitle = "监理单位详情";
      } else if (this.listTitle == "总包单位") {
        this.infoTitle = "总包单位详情";
      } else if (this.listTitle == "合作单位") {
        this.infoTitle = "合作单位详情";
      }
      this.isRead = true;
      this.infoForm = Object.assign({}, this.infoList[index]);
      this.infoFormVisible = true;
      this.isType = "detail";
    },
    // 编辑
    infoEdit(index) {
      if (this.listTitle == "设计单位") {
        this.infoTitle = "编辑设计单位";
      } else if (this.listTitle == "监理单位") {
        this.infoTitle = "编辑监理单位";
      } else if (this.listTitle == "总包单位") {
        this.infoTitle = "编辑总包单位";
      } else if (this.listTitle == "合作单位") {
        this.infoTitle = "编辑合作单位";
      }
      this.infoFormVisible = true;
      this.isType = "edit";
      this.isRead = false;
      this.infoForm = Object.assign({}, this.infoList[index]);
    },
    // 删除
    infoDelete(index) {
      this.infoList.splice(index, 1);
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
      this.infoList.push(obj);
      this.infoFormVisible = false;
    },
    // 编辑提交
    editInfoSubmit(index) {
      let obj = Object.assign({}, this.infoForm);
      this.infoList.splice(this.index, 1, obj);
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
    padding-right: 60px;
    li {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      cursor: pointer;
      padding: 5px 10px;
      .txts {
        display: flex;
        width: 70%;
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
          flex: 1;
        }
        .t2 {
          width: 20%;
          flex-shrink: 0;
        }
        .t3 {
          width: 25%;
          flex-shrink: 0;
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
