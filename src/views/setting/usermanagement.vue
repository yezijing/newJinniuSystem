<template>
  <div class="mainbox">
    <p class="navtitle"><span>用户管理</span></p>
    <div class="toolbar">
      <el-form :inline="true" :model="filters" ref="filters" size="small">
        <el-form-item label="登录名：" prop="logname">
          <el-input v-model="filters.logname" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织机构：" prop="orgid">
          <el-select
            v-model="filters.orgid"
            filterable
            clearable
            placeholder="全部"
            @focus="getOrganDatas"
            @change="selectChange"
          >
            <el-option
              v-for="item in orangizes"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门：" prop="deptId" class="ww2">
          <el-select
            v-model="filters.deptId"
            filterable
            clearable
            placeholder="全部"
            @focus="getAllDepts"
            @change="selectChange"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门领导：" prop="leaderName" class="ww2">
          <el-input v-model="filters.leaderName" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户状态：" prop="status" class="ww1">
          <el-select
            v-model="filters.status"
            filterable
            clearable
            placeholder="全部"
            @change="selectChange"
          >
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="getDatas" type="primary">搜索</el-button>
          <el-button @click="resetForm('filters')">重置</el-button>
        </el-form-item>
        <div class="toolbtns">
          <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
        </div>
      </el-form>
    </div>
    <div class="listcontent">
      <!--列表-->
      <el-table border size="small" :data="usersData" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="logname" label="登录名"></el-table-column>
        <el-table-column prop="orgname" label="组织机构"></el-table-column>
        <el-table-column prop="deptName" label="部门"></el-table-column>
        <el-table-column prop="leaderName" label="部门领导"></el-table-column>
        <el-table-column prop="job" label="职位"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="duty" label="岗位职责"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" @click="handleStatus(scope.row)" v-if="scope.row.status==1">停用</el-button>
            <el-button class="btn-red" size="small" @click="handleStatus(scope.row)" v-else>启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        :hide-on-single-page="isHide"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
      ></el-pagination> -->
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dtitle" :visible.sync="dataFormVisible" width="640px" v-dialogDrag>
      <el-form size="small" :model="userForm" ref="userForm" label-width="110px">
        <div class="flexbox">
          <el-form-item
            label="姓名："
            prop="name"
            class="flexitem"
            :rules="[{ required: true, message: '请输入姓名', trigger: 'change' }]"
          >
            <el-input v-model="userForm.name" @change="wordTopy"></el-input>
          </el-form-item>
          <el-form-item
            label="登录名："
            prop="logname"
            class="flexitem"
            :rules="[{ required: true, message: '请输入登录名', trigger: 'change' }]"
          >
            <el-input v-model="userForm.logname"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          label="组织机构："
          prop="orgid"
          :rules="[{ required: true, message: '请选择所属组织机构', trigger: 'change' }]"
          class="select-block"
        >
          <el-select
            v-model="userForm.orgid"
            filterable
            clearable
            placeholder="请选择"
            @change="selectGetOrgan"
          >
            <el-option v-for="item in orangizes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属部门："
          prop="deptId"
          :rules="[{ required: true, message: '请选择所属部门', trigger: 'change' }]"
          class="select-block"
        >
          <el-select
            v-model="userForm.deptId"
            filterable
            clearable
            placeholder="请选择"
            @change="selectGetDept"
          >
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="电话号码："
          prop="phone"
          :rules="[{ required: true, message: '请输入电话号码', trigger: 'change' }]"
        >
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="职位："
          prop="job"
          class="select-block"
          :rules="[{ required: true, message: '请输入职位', trigger: 'change' }]"
        >
          <el-select
            v-model="userForm.job"
            filterable
            allow-create
            placeholder="请选择或输入职位信息"
            @change="addUserJob"
          >
            <el-option v-for="item in jobs" :key="item.jobName" :label="item.jobName" :value="item.jobName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位职责：" prop="duty">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="userForm.duty"></el-input>
        </el-form-item>
        <div class="tsbox" v-if="isEdit">
          <el-checkbox v-model="isLeader" :disabled="hasleader">是否为部门领导</el-checkbox>
        </div>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dataFormVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('userForm')">{{savaWord}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vPinyin from "../../assets/vue-py";
import md5 from "md5";
import {
  addUser,
  allOrglist,
  allDeptlist,
  editUser,
  allUserlist,
  userDetailByid,
  updateUserState,
  ishasLeader,
  getJobListData,
  getDeptByOrgData,
  addJobData
} from "../../api/settingApi";
export default {
  name: "usermanagement",
  components: {},
  data() {
    return {
      dataFormVisible: false,
      filters: {},
      // 用户数据
      usersData: [],
      // 部门列表
      departments: [],
      // 组织机构列表
      orangizes: [],
      savaWord: "",
      dtitle: "",
      userForm: {},
      isType: "",
      // 职位列表
      jobs: [],
      // 是否为部门领导,默认0， 1是部门领导
      isLeader: 0,
      // 部门领导
      leaders: [],
      // 用户状态
      states: [{ value: 1, name: "正常" }, { value: 2, name: "停用" }],
      deptName: "",
      orgname: "",
      userid: 0,
      hasleader: false,
      isEdit: true,
      totals: 0,
      currentPage: 1,
      pageSize: 10 //一页显示多少条
    };
  },
  created() {
    this.getAlluser();
  },
  methods: {
    // 获取职位列表
    getJobList() {
      getJobListData("", data => {
        this.jobs = data.data.obj;
      });
    },
    selectChange() {
      this.$forceUpdate();
    },
    addUserJob(){
      this.$forceUpdate();
      let para = {jobName:this.userForm.job}
      addJobData(para,res=>{
        
      })
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getAlluser();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getAlluser();
    },
    // 获取用户列表
    getAlluser() {
      let para = this.filters;
      // para.pageSize = this.pageSize;
      // para.currentPage = this.currentPage;
      allUserlist(para, data => {
        this.usersData = data.data.obj;
        // this.totals = data.data.obj.total;
        // this.currentPage = data.data.obj.totalPages;
      });
    },
    // 汉字转拼音
    wordTopy: function() {
      var logname = vPinyin.chineseToPinYin(this.userForm.name);
      this.userForm.logname = logname;
    },
    // 新增
    handleAdd() {
      this.getOrganDatas();
      this.getAllDepts();
      this.savaWord = "新增";
      this.dtitle = "新增用户";
      this.userForm = { orgid: 1 };
       this.orgname = '四川联智科技责任有限公司';
      this.isType = "add";
      this.dataFormVisible = true;
      this.isEdit = true;
      this.isLeader = 0;
      this.hasleader = false;
      this.getJobList();
    },
    // 编辑
    handleEdit(row) {
      this.getJobList();
      this.getOrganDatas();
      this.getAllDepts();
      this.isEdit = false;
      this.isType = "edit";
      this.savaWord = "保存";
      this.dtitle = "编辑用户";
      this.dataFormVisible = true;
      this.deptName = row.deptName;
      this.orgname = row.orgname;
      this.userid = row.id;
      let para = { id: row.id };
      userDetailByid(para, data => {
        this.userForm = data.data.obj;
      });
    },
    // 停用启用
    handleStatus(row) {
      let para = { id: row.id, status: row.status };
      updateUserState(para, data => {
        this.getAlluser();
      });
    },
    // 搜索
    getDatas() {
      this.getAlluser();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.filters = {};
      this.getAlluser();
    },
    submitForm() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          if (this.isType == "add") {
            this.addSubmit();
          } else if (this.isType == "edit") {
            this.editSubmit();
          }
        }
      });
    },
    // 获取部门名字
    selectGetDept(deptid) {
      let obj = {};
      obj = this.departments.find(item => {
        return item.id === deptid; //筛选出匹配数据
      });
      this.deptName = obj.name;
      // 判断部门下是否有部门领导
      ishasLeader({ deptId: deptid }, data => {
        this.hasleader = data.data.obj;
      });
    },
    // 获取组织机构名字
    selectGetOrgan(oid) {
      let obj = {};
      obj = this.orangizes.find(item => {
        return item.id === oid; //筛选出匹配数据
      });
      this.orgname = obj.name;
      // 选择机构后获取对应部门列表
      let para = {orgId:oid}
      getDeptByOrgData(para,res=>{
        this.departments = res.data.obj;
      })
    },
    // 新增提交
    addSubmit() {
      let para = Object.assign({}, this.userForm);
      para.deptName = this.deptName;
      para.orgname = this.orgname;
      if (this.isLeader == true) {
        para.isLeader = 1;
      } else {
        para.isLeader = 0;
      }
      para.password = md5("123456");
      addUser(para, data => {
        this.dataFormVisible = false;
        this.getAlluser();
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.$refs["userForm"].resetFields();
      });
    },
    // 编辑提交
    editSubmit() {
      let para = Object.assign({}, this.userForm);
      para.deptName = this.deptName;
      para.orgname = this.orgname;
      // if(this.isLeader==true){
      //   para.isLeader = 1
      // }else{
      //   para.isLeader = 0
      // }
      para.id = this.userid;
      let { createtime, updatetime, ...others } = para;
      para = others;
      editUser(para, data => {
        this.dataFormVisible = false;
        this.getAlluser();
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.$refs["userForm"].resetFields();
      });
    },
    // 部门列表
    getAllDepts() {
      let para = {orgId:1}
      getDeptByOrgData(para,res=>{
        this.departments = res.data.obj;
      })
      // allDeptlist("", data => {
      //   this.departments = data.data.obj.datas;
      // });
    },
    // 组织机构列表
    getOrganDatas() {
      allOrglist("", data => {
        this.orangizes = data.data.obj;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tsbox {
  text-align: right;
}
</style>
