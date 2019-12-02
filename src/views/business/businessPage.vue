<template>
  <div class="mainbox">
    <p class="navtitle">商务管理</p>
    <div class="toolbar">
      <el-form :inline="true" :model="filters" ref="filters" size="small">
        <el-form-item label="项目名称：" prop="itemname">
          <el-input v-model="filters.itemname" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目对接人：" prop="name">
          <el-input v-model="filters.name" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合作方式：" prop="way">
          <el-select v-model="filters.way" filterable clearable placeholder="全部">
            <el-option
              v-for="item in ways"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="getDatas" type="primary">搜索</el-button>
          <el-button @click="resetForm('filters')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="toolbtns">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      </div>
    </div>
    <!-- 表格视图  -->
    <div class="listcontent">
      <!--列表-->
      <el-table border size="small" :data="businessData" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="areas" label="区域"></el-table-column>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="industry" label="行业"></el-table-column>
        <el-table-column prop="cooperation" label="合作方式"></el-table-column>
        <el-table-column prop="honor" label="项目资质"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="pickupName" label="项目对接人"></el-table-column>
        <el-table-column prop="receivables" label="应收款"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==1">中标</el-tag>
            <el-tag v-if="scope.row.status==2" type="danger">未中标</el-tag>
            <el-tag v-if="scope.row.status==3" type="success">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="192px">
          <template scope="scope">
            <el-button size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加、编辑 -->
    <el-dialog :title="dtitle" :visible.sync="dataFormVisible" width="1000px" v-dialogDrag>
      <business-add :dataFormVisible="dataFormVisible" :dataForm.sync="dataForm" ref="addBusChild"></business-add>
      <div slot="footer">
        <el-button size="small" @click="dataFormVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('dataForm')">{{savaWord}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import businessAdd from "./addBusItem"; //新增商务
export default {
  name: "salespage",
  components: { businessAdd },
  data() {
    return {
      // 列表数据
      businessData: [],
      // 弹窗标题
      dtitle: "",
      // 弹窗是否显示
      dataFormVisible: false,
      // 表单
      dataForm: {},
      // 保存、确定
      savaWord: "",
      isType: "",
      filters:{},
      ways:[],
    };
  },
  created() {},
  methods: {
    //   新增
    handleAdd() {
      this.savaWord = "新增";
      this.dtitle = "商务管理-新增";
      this.dataFormVisible = true;
      this.dataForm = {};
      this.isType = "add";
    },
    //   编辑
    handleEdit(row) {
      this.savaWord = "保存";
      this.dtitle = "商务管理-编辑";
      this.dataFormVisible = true;
      this.dataForm = Object.assign({}, row);
      this.isType = "edit";
    },
    // 提交表单
    submitForm() {
      var child = this.$refs.addBusChild;
      child.$refs.dataForm.validate(valid => {
        if (valid) {
          if (this.isType == "add") {
            this.addBusSubmit();
          } else if (this.isType == "edit") {
            this.editBusSubmit();
          } else {
            this.dataFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    // 新增提交
    addBusSubmit() {},
    // 编辑提交
    editBusSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
</style>
