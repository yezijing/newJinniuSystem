<template>
  <div class="mainbox">
    <p class="navtitle"><span>部门管理</span></p>
    <div class="toolbar">
      <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
    </div>
    <div class="listcontent">
      <!--列表-->
      <el-table border size="small" :data="departData" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="orgname" label="组织机构"></el-table-column>
        <el-table-column prop="duty" label="部门职责"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" @click="handleDelete(scope.row, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :hide-on-single-page="isHide"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
      ></el-pagination>
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dtitle" :visible.sync="dataFormVisible" width="500px" v-dialogDrag>
      <el-form size="small" :model="departForm" label-width="100px" ref="departForm">
        <el-form-item
          label="部门名称："
          prop="name"
          :rules="[{ required: true, message: '请输入部门名称', trigger: 'change' }]"
        >
          <el-input v-model="departForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="组织机构："
          prop="orgid"
          :rules="[{ required: true, message: '请选择所属组织机构', trigger: 'change' }]"
          class="select-block"
        >
          <el-select
            v-model="departForm.orgid"
            filterable
            clearable
            placeholder="请选择"
            @change="selectGetOrgan"
          >
            <el-option v-for="item in orangizes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门职责：" prop="duty">
          <el-input type="textarea" :autosize="{ minRows: 5}" v-model="departForm.duty"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dataFormVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('departForm')">{{savaWord}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  allOrglist,
  allDeptlist,
  addDepartment,
  editDepartment,
  deleteDepartment
} from "../../api/settingApi";
export default {
  name: "department",
  components: {},
  data() {
    return {
      departData: [],
      // 弹窗标题
      dtitle: "",
      // 弹窗是否显示
      dataFormVisible: false,
      // 表单
      departForm: {},
      // 保存、确定
      savaWord: "",
      isType: "",
      // 组织机构
      orangizes: [],
      totals: 0,
      currentPage: 1,
      isHide: true,
      pageSize: 10, //一页显示多少条
      // 当前部门id
      pid: 0,
      orgname: ""
    };
  },
  created() {
    this.getAllDepts();
  },
  methods: {
    // 获取组织机构名字
    selectGetOrgan(oid) {
      let obj = {};
      obj = this.orangizes.find(item => {
        return item.id === oid; //筛选出匹配数据
      });
      this.orgname = obj.name;
    },
    // 新增
    handleAdd() {
      this.savaWord = "新增";
      this.dtitle = "新增部门";
      this.dataFormVisible = true;
      this.departForm = { orgid: 1 };
      this.isType = "add";
      this.getAllOrgan();
      this.orgname = "四川联智科技责任有限公司";
    },
    // 编辑
    handleEdit(row) {
      this.getAllOrgan();
      this.savaWord = "保存";
      this.dtitle = "编辑部门";
      this.dataFormVisible = true;
      this.departForm = Object.assign({}, row);
      this.isType = "edit";
      this.pid = row.id;
      this.orgname = row.orgname;
    },
    // 表单保存
    submitForm() {
      this.$refs.departForm.validate(valid => {
        if (valid) {
          if (this.isType == "add") {
            this.addSubmit();
          } else if (this.isType == "edit") {
            this.editSubmit();
          } else {
            this.dataFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    // 新增提交
    addSubmit() {
      let para = Object.assign({}, this.departForm);
      para.orgname = this.orgname;
      addDepartment(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllDepts();
      });
    },
    // 编辑提交
    editSubmit() {
      let para = Object.assign({}, this.departForm);
      para.id = this.pid;
      para.orgname = this.orgname;
      let { createtime, updatetime, ...others } = para;
      para = others;
      editDepartment(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.getAllDepts();
      });
    },
    // 删除
    handleDelete(row, id) {
      this.$confirm(
        '<span style="color:#f00;">该操作将删除此部门信息</span>，确定删除吗?',
        "提示",
        { type: "warning", dangerouslyUseHTMLString: true }
      )
        .then(() => {
          let para = { lid: id };
          deleteDepartment(para, data => {
            if (data.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getAllDepts();
            } else {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "取消删除",
            type: "info"
          });
        });
    },
    // 查询所有
    getAllDepts() {
      allDeptlist("", data => {
        this.departData = data.data.obj.datas;
        this.totals = data.data.obj.total;
        this.currentPage = data.data.obj.totalPages;
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getAllDepts();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getAllDepts();
    },
    // 获取组织机构列表
    getAllOrgan() {
      allOrglist("", data => {
        this.orangizes = data.data.obj;
        if (this.orangizes == null) {
          this.orangizes = [];
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>
