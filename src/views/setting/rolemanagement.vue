<template>
  <div class="mainbox">
    <p class="navtitle"><span>权限管理</span></p>
    <div class="toolbar">
      <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
    </div>
    <div class="listcontent">
      <!--列表-->
      <el-table
        border
        size="small"
        :data="roleData"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="角色名"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
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
      <el-form size="small" :model="departForm" label-width="100px" ref="departForm">
        <el-form-item
          label="部门名称："
          prop="name"
          :rules="[{ required: true, message: '请输入部门名称', trigger: 'change' }]"
        >
          <el-input v-model="departForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织机构：" prop="orgid"  :rules="[{ required: true, message: '请选择所属组织机构', trigger: 'change' }]" class="select-block">
          <el-select v-model="departForm.orgid" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in orangizes"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门职责：">
          <el-input type="textarea" :autosize="{ minRows: 5}" v-model="departForm.remark"></el-input>
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
export default {
  name: "rolemanagement",
  components: {},
  data() {
    return {
      roleData:[],
      // 弹窗标题
      dtitle:"",
      // 弹窗是否显示
      dataFormVisible:false,
      // 表单 
      departForm:{},
      // 保存、确定
      savaWord:'',
      isType:'',
      // 组织机构
      orangizes:[],
    };
  },
  created() {},
  methods: {
    // 新增
    handleAdd() {
      this.savaWord = '新增';
      this.dtitle = '新增部门';
      this.dataFormVisible = true;
      this.departForm = {};
      this.isType = "add";
    },
    // 编辑
    handleEdit(row) {
      this.savaWord = '保存';
      this.dtitle = '编辑部门';
      this.dataFormVisible = true;
      this.departForm = Object.assign({}, row);
      this.isType = "edit";
    },
    // 删除
    handleDelete(row, id) {},
    // 表单保存
    submitForm(){
      if(this.isType=='add'){
        this.addSubmit()
      }else{
        this.editSubmit();
      }
    },
    // 新增提交
    addSubmit(){

    },
    // 编辑提交
    editSubmit(){

    }
  }
};
</script>

<style lang="scss">
</style>
