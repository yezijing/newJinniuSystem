<template>
  <div class="visit-record">
    <el-form size="small" :model="visitForm" label-width="110px" ref="visitForm">
      <div class="addflexbox">
        <el-form-item
          label="客户姓名："
          prop="visitId"
          :rules="[{ required: true, message: '请填写客户姓名', trigger: 'change' }]"
        >
          <el-select
            v-model="visitForm.visitId"
            filterable
            clearable
            multiple
            collapse-tags
            placeholder="可多选"
            @change="selectChange"
            :rules="[{ required: true, message: '请填写客户姓名', trigger: 'change' }]"
          >
            <el-option
              v-for="item in cusNameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="jiabtn">
          <i class="icon el-icon-circle-plus" @click="addUserShow = true"></i>
          <div class="awrap" v-if="addUserShow">
            <p>新增客户</p>
            <el-input placeholder="请输入客户姓名" v-model="customerName"></el-input>
            <div class="buttons">
              <el-button @click="addUserShow = false">取消</el-button>
              <el-button @click="addCustomerName" type="primary">确定</el-button>
            </div>
          </div>
        </div>
      </div>
      <el-form-item label="申请协助：">
        <div class="peoples">
          <a class="item" href="javascript:;" v-for="(item,index) in helpList" :key="index">
            <span>{{item.name}}</span>
            <img :src="closeimg" @click="delPeople(index)" alt />
          </a>
          <a class="icon el-icon-circle-plus additem" href="javascript:;" @click="addHelper()"></a>
        </div>
      </el-form-item>
      <div class="flexbox">
        <el-form-item label="本次拜访时间：" prop="visitTime" class="flexitem">
          <el-date-picker
            v-model="visitForm.visitTime"
            type="date"
            placeholder="选择本次拜访时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            default-time="12:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="下次拜访时间：" prop="nextTime" class="flexitem">
          <el-date-picker
            v-model="visitForm.nextTime"
            type="date"
            placeholder="选择下次拜访时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            default-time="12:00:00"
          ></el-date-picker>
        </el-form-item>
      </div>
      <el-form-item label="拜访目的：" prop="visitAim">
        <el-input v-model="visitForm.visitAim" placeholder="请填写拜访目的"></el-input>
      </el-form-item>
      <el-form-item label="客户要求：" prop="customerRequire">
        <el-input v-model="visitForm.customerRequire" placeholder="请填写客户要求"></el-input>
      </el-form-item>
      <el-form-item label="下步工作计划：" prop="nextPlan">
        <el-input
          type="textarea"
          v-model="visitForm.nextPlan"
          :autosize="{ minRows: 2}"
          placeholder="请填写下步工作计划"
        ></el-input>
      </el-form-item>
      <el-form-item label="需我公司协调解决事宜：" prop="dealThing" class="set-lh">
        <el-input
          type="textarea"
          v-model="visitForm.dealThing"
          :autosize="{ minRows: 2}"
          placeholder="请填写需我公司协调解决事宜"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 添加协助 -->
    <el-dialog title="邀请协助成员" :visible.sync="helpVisible" width="600px" v-dialogDrag append-to-body>
      <div class="helpbox">
        <div class="box">
          <div class="list">
            <p
              class="item"
              v-for="(item,index) in departments"
              :key="index"
              :style="backgroundBg"
              :class="index==curIndex?'on':''"
              @click="searchUser(item.id,index)"
            >{{item.name}}</p>
          </div>
        </div>
        <div class="box box2">
          <!-- <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>-->
          <el-checkbox-group v-model="checkedHelper" @change="handleCheckedHelperChange">
            <el-checkbox v-for="item in helpers" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" @click="helpVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitHelpForm()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeptUserData, getAllRalateData } from "../../api/clueApi";
export default {
  name: "visitRecord",
  components: {},
  props: [
    "visitRecordVisible",
    "visitForm",
    "userid",
    "helpList",
    "cusNameList",
    "clueid"
  ],
  data() {
    return {
      addUserShow: false,
      // 客户姓名
      customerName: "",
      closeimg: "./static/images/close.png",
      helpVisible: false,
      departments: [],
      backgroundBg: {
        backgroundImage: "url(" + require("../../assets/rr.png") + ")"
      },
      checkAll: false,
      checkedHelper: [],
      helpers: [],
      isIndeterminate: false,
      curIndex: -1,
      alluser: []
    };
  },
  created() {},
  watch: {
    visitRecordVisible: function(newValue, oldValue) {
      this.$emit("update:visitRecordVisible", newValue);
    },
    visitForm: function(newValue, oldValue) {
      this.$emit("update:visitForm", newValue);
    }
  },
  methods: {
    // 获取相关人列表
    getAllRalateList() {
      getAllRalateData({ threadId: this.clueid }, data => {
        if (data.data.obj == null) {
          this.cusNameList = [];
        } else {
          this.cusNameList = data.data.obj;
        }
      });
    },
    // 新增客户姓名提交
    addCustomerName() {
      // this.customerName
      this.getAllRalateList();
    },
    // handleCheckAllChange(val) {
    //   let arr = [];
    //   for (var i = 0; i < this.helpers.length; i++) {
    //     arr.push(this.helpers[i].id);
    //   }
    //   this.checkedHelper = val ? arr : [];
    //   this.isIndeterminate = false;
    // },
    handleCheckedHelperChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.helpers.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.helpers.length;
    },
    // 删除协助人
    delPeople(index) {
      this.helpList.splice(index, 1);
    },
    // 添加协助人
    addHelper() {
      this.checkedHelper = [];
      this.helpVisible = true;
      this.curIndex = -1;
      this.helpers = [];
      this.alluser = [];
      getDeptUserData({ userId: this.userid }, data => {
        if (data.data.obj == null) {
          this.departments = [];
          this.alluser = [];
        } else {
          this.departments = data.data.obj;
          if (this.departments.length == 0) {
            this.alluser = [];
          } else {
            for (let i = 0; i < this.departments.length; i++) {
              if (this.departments[i].userList == null) {
              } else {
                var arr = this.departments[i].userList;
                for (var m = 0; m < arr.length; m++) {
                  this.alluser.push(arr[m]);
                }
              }
            }
            console.log(this.alluser);
          }
        }
      });
    },
    // 选择部门获取对应用户列表
    searchUser(id, index) {
      this.curIndex = index;
      for (var i = 0; i < this.departments.length; i++) {
        if (this.departments[i].id == id) {
          if (this.departments[i].userList == null) {
            this.helpers = [];
          } else {
            this.helpers = this.departments[i].userList;
          }
          break;
        }
      }
    },
    // 添加协助人提交
    submitHelpForm() {
      if (this.checkedHelper.length == 0) {
        this.helpList = [];
      } else {
        for (var i = 0; i < this.checkedHelper.length; i++) {
          for (var n = 0; n < this.alluser.length; n++) {
            if (this.checkedHelper[i] == this.alluser[n].id) {
              this.helpList.push(this.alluser[n]);
            }
          }
        }
      }
      this.helpVisible = false;
      console.log(this.helpList);
    },
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scope>
.el-form-item--small.set-lh .el-form-item__label {
  line-height: 1.5;
}
.peoples {
  display: flex;
  flex-wrap: wrap;
  .additem {
    display: inline-block;
    margin-right: 15px;
    line-height: 32px;
    height: 32px;
    color: #1890ff;
    font-size: 24px;
  }
  .item {
    display: inline-block;
    margin-right: 15px;
    padding: 0 18px 0 10px;
    background: #eee;
    line-height: 32px;
    height: 32px;
    color: #333;
    font-size: 12px;
    border-radius: 4px;
    position: relative;
    img {
      position: absolute;
      right: 3px;
      top: 3px;
      width: 12px;
      height: 12px;
      z-index: 9;
    }
  }
}
.helpbox {
  display: flex;
  align-items: stretch;
  .box {
    width: 48%;
    .list {
      .item {
        background-position: right center;
        background-repeat: no-repeat;
        line-height: 32px;
        cursor: pointer;
        padding: 0 8px;
      }
      .item.on {
        background-color: #ecf6ff;
      }
    }
  }
  .box2 {
    border-left: 1px solid #eee;
    margin-left: 30px;
    padding-left: 30px;
    padding-top: 4px;
    .el-checkbox {
      display: block;
      margin-bottom: 6px;
    }
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
  }
}
</style>
