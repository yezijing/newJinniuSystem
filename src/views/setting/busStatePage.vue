<template>
  <div class="mainbox">
    <p class="navtitle"><span>商机状态</span></p>
    <div class="toolbar">
      <div class="toolbtns">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      </div>
    </div>
    <div class="listcontent">
      <!--列表-->
      <el-table border size="small" :data="busStateData" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="stateName" label="状态名称"></el-table-column>
        <el-table-column prop="frequence" label="拜访频率">
          <template scope="scope">
            <p>每{{scope.row.frequence}}天</p>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" @click="handleDelete(scope.row, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dtitle" :visible.sync="dataFormVisible" width="500px" v-dialogDrag>
      <el-form size="small" :model="stateForm" label-width="100px" ref="stateForm">
        <el-form-item
          label="状态名称："
          prop="stateName"
          :rules="[{ required: true, message: '请输入状态名称', trigger: 'change' }]"
        >
          <el-input
            v-model="stateForm.stateName"
            :readonly="isRead"
            auto-complete="off"
            placeholder="请输入状态名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="拜访频率："
          prop="frequence"
          :rules="[{ required: true, message: '请输入拜访频率', trigger: 'change' }]"
          class="input-remark"
        >
          <el-input
            v-model="stateForm.frequence"
            :readonly="isRead"
            auto-complete="off"
            placeholder="请输入天数"
            @keyup.native="onlyNumber"
          >
            <template slot="prepend">间隔</template>
            <template slot="append">天拜访</template>
          </el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input
            type="textarea"
            :readonly="isRead"
            :autosize="{ minRows: 5}"
            v-model="stateForm.remark"
            placeholder="说明"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dataFormVisible=false" v-if="isType!=='detail'">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm">{{savaWord}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBusStateData,
  editBusStateData,
  getAllBusStateData,
  deleteBusStateData
} from "../../api/settingApi";
export default {
  name: "busstate",
  components: {},
  data() {
    return {
      busStateData: [],
      // 弹窗标题
      dtitle: "",
      // 弹窗是否显示
      dataFormVisible: false,
      // 表单
      stateForm: {},
      // 保存、确定
      savaWord: "",
      isType: "",
      // 当前id
      stateid: 0,
      isRead: false
    };
  },
  created() {
    this.getAllStateList();
  },
  methods: {
    // 验证只能输入正整数
    onlyNumber(){　　
　　　 this.stateForm.frequence=this.stateForm.frequence.replace(/[^\.\d]/g,'');
      this.stateForm.frequence=this.stateForm.frequence.replace('.','');
　　},
    // 查询所有
    getAllStateList() {
      getAllBusStateData("", data => {
        this.busStateData = data.data.obj;
      });
    },
    // 新增
    handleAdd() {
      this.savaWord = "新增";
      this.dtitle = "新增商机状态";
      this.dataFormVisible = true;
      this.stateForm = {};
      this.isType = "add";
      this.isRead = false;
    },
    // 编辑
    handleEdit(row) {
      this.stateid = row.id;
      this.savaWord = "保存";
      this.dtitle = "编辑商机状态";
      this.dataFormVisible = true;
      this.stateForm = Object.assign({}, row);
      this.isType = "edit";
      this.isRead = false;
    },
    // 详情
    handleDetail(row) {
      this.stateid = row.id;
      this.savaWord = "确定";
      this.dtitle = "详情";
      this.stateForm = Object.assign({}, row);
      this.dataFormVisible = true;
      this.isRead = true;
      this.isType = "detail";
    },
    // 删除
    handleDelete(row, id) {
      this.$confirm(
        '<span style="color:#f00;">该操作将删除此状态信息</span>，确定删除吗?',
        "提示",
        { type: "warning", dangerouslyUseHTMLString: true }
      )
        .then(() => {
          let para = { id: id };
          deleteBusStateData(para, data => {
            if (data.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getAllStateList();
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
      this.$refs.stateForm.validate(valid => {
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
      let para = Object.assign({}, this.stateForm);
      addBusStateData(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllStateList();
      });
    },
    // 编辑提交
    editSubmit() {
      let para = Object.assign({}, this.stateForm);
      para.id = this.stateid;
      let { createtime, updatetime, ...others } = para;
      para = others;
      editBusStateData(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.getAllStateList();
      });
    }
  }
};
</script>

<style lang="scss">
</style>
