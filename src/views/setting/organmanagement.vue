<template>
  <div class="mainbox">
    <p class="navtitle"><span>组织机构</span></p>
    <div class="toolbar">
      <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
    </div>
    <div class="listcontent">
      <!--列表-->
      <el-table border size="small" :data="organizeData" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="机构名称"></el-table-column>
        <el-table-column prop="remark" label="备注" width></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" @click="handleDelete(scope.row, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dtitle" :visible.sync="dataFormVisible" width="500px" v-dialogDrag>
      <el-form size="small" :model="organForm" label-width="100px" ref="organForm">
        <el-form-item
          label="机构名称："
          prop="name"
          :rules="[{ required: true, message: '请输入机构名称', trigger: 'change' }]"
        >
          <el-input v-model="organForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 5}" v-model="organForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dataFormVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('organForm')">{{savaWord}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  allOrglist,
  addOrgan,
  editOrgan,
  deleteOrgan
} from "../../api/settingApi";
export default {
  name: "organ",
  components: {},
  data() {
    return {
      organizeData: [],
      // 弹窗标题
      dtitle: "",
      // 弹窗是否显示
      dataFormVisible: false,
      // 表单
      organForm: {},
      // 保存、确定
      savaWord: "",
      isType: "",
      // 当前组织id
      orgid: 0
    };
  },
  created() {
    this.getAllDatas();
  },
  methods: {
    // 新增
    handleAdd() {
      this.savaWord = "新增";
      this.dtitle = "新增组织机构";
      this.dataFormVisible = true;
      this.organForm = {};
      this.isType = "add";
    },
    // 编辑
    handleEdit(row) {
      this.savaWord = "保存";
      this.dtitle = "编辑组织机构";
      this.dataFormVisible = true;
      this.organForm = Object.assign({}, row);
      this.isType = "edit";
      this.orgid = row.id;
    },
    // 删除
    handleDelete(row, id) {
      this.$confirm(
        '<span style="color:#f00;">该操作将删除此条组织机构</span>，确定删除吗?',
        "提示",
        { type: "warning", dangerouslyUseHTMLString: true }
      )
        .then(() => {
          let para = { id: id };
          deleteOrgan(para, data => {
            if (data.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getAllDatas();
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
    // 表单保存
    submitForm() {
      this.$refs.organForm.validate(valid => {
        if (valid) {
          if (this.isType == "add") {
            this.addSubmit();
          } else {
            this.editSubmit();
          }
        } else {
          return false;
        }
      });
    },
    // 新增提交
    addSubmit() {
      let para = Object.assign({}, this.organForm);
      addOrgan(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllDatas();
      });
    },
    // 编辑提交
    editSubmit() {
      let para = Object.assign({}, this.organForm);
      para.id = this.orgid;
      let { createtime, updatetime, ...others } = para;
      para = others;
      editOrgan(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.getAllDatas();
      });
    },
    // 获取数据列表
    getAllDatas() {
      allOrglist("", data => {
        this.organizeData = data.data.obj;
      });
    }
  }
};
</script>

<style lang="scss">
</style>
