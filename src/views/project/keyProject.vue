<template>
  <div class="mainbox">
    <div v-if="isShowMain">
      <p class="navtitle">
        <span>重点项目</span>
      </p>
      <div class="projectwrap">
        <el-row id="toolbar">
          <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="filters" ref="filters" size="mini">
              <el-form-item label="项目名称：" prop="pname" class="ww2">
                <el-input v-model="filters.pname" placeholder="请输入" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="牵头单位：" prop="leaderid" class="ww2">
                <el-select
                  v-model="filters.leaderid"
                  clearable
                  filterable
                  placeholder="全部"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in leadunits"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="牵头区领导：" prop="arealeadid" class="ww2" v-if="toolShow">
                <el-select
                  v-model="filters.arealeadid"
                  clearable
                  filterable
                  placeholder="全部"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in leaderlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目类别：" prop="category" class="ww1" v-if="toolShow">
                <el-select
                  v-model="filters.category"
                  clearable
                  placeholder="全部"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in projectType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="材料报送：" prop="formstatus" class="ww1" v-if="toolShow">
                <el-select
                  v-model="filters.formstatus"
                  clearable
                  placeholder="全部"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in formStatus"
                    :key="item.value"
                    :label="item.status"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="总体进度：" prop="status" class="ww1" v-if="toolShow">
                <el-select
                  v-model="filters.status"
                  clearable
                  placeholder="全部"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in totalStatus"
                    :key="item.value"
                    :label="item.status"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="rebtns">
                <el-button @click="getDatas('filters')" type="primary">搜 索</el-button>
                <el-button @click="resetForm('filters')">重 置</el-button>
                <el-button @click="moreSearch">{{moreText}}</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="toolbtns">
          <div>
            <el-button type="primary" size="mini" @click="handleAdd" v-if="isAddBtnShow">新 增</el-button>
            <el-button type="primary" size="mini" @click="downLoadData" v-if="isDownBtnShow">导出</el-button>
            <el-button type="primary" size="mini" @click="importData" v-if="isImportBtnShow">导入</el-button>
            <el-button type="primary" size="mini" @click="batchRule" v-if="isEditBtnShow">报送规则</el-button>
          </div>
          <div class="btns">
            <a href="javascript:;">
              <img :src="iconUrl" alt />
            </a>
            <a href="javascript:;">
              <img :src="printUrl" alt />
            </a>
          </div>
        </div>
        <div class="tablebox">
          <el-table border :data="projectdata" style="width: 100%" size="small">
            <el-table-column label="序号" width="50" :formatter="numberFormatter"></el-table-column>
            <el-table-column prop="name" label="项目名称"></el-table-column>
            <el-table-column prop="name" label="目标任务"></el-table-column>
            <el-table-column prop="name" label="项目地址"></el-table-column>
            <el-table-column prop="name" label="牵头单位"></el-table-column>
            <el-table-column prop="name" label="责任单位"></el-table-column>
            <el-table-column prop="name" label="项目业主"></el-table-column>
            <el-table-column prop="name" label="牵头区领导"></el-table-column>
            <el-table-column prop="name" label="所属街道"></el-table-column>
            <el-table-column prop="name" label="项目类别"></el-table-column>
            <el-table-column prop="formstatus" label="材料报送" width="80">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.formstatus==1">
                    <el-tag type="warning" size="small">
                      <i class="fa mark" style="background:#eaa28b;"></i>
                      <span>预警</span>
                    </el-tag>
                  </div>
                  <div v-else-if="scope.row.formstatus==-1">
                    <el-tag type="info" size="small">
                      <i class="fa mark" style="background:#999;"></i>
                      <span>完结</span>
                    </el-tag>
                  </div>
                  <div v-else-if="scope.row.formstatus==0">
                    <el-tag size="small">
                      <i class="fa mark" style="background:#409EFF;"></i>
                      <span>正常</span>
                    </el-tag>
                  </div>
                  <div v-else-if="scope.row.formstatus==2">
                    <el-tag type="danger" size="small">
                      <i class="fa mark" style="background:#f56c6c;"></i>
                      <span>逾期</span>
                    </el-tag>
                  </div>
                  <div v-else>
                    <span>/</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="totalstatus" label="工作推进" width="110">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.totalstatus==3">
                    <el-tag type="warning" size="small">
                      <i class="fa mark" style="background:#eaa28b;"></i>
                      <span>滞后</span>
                    </el-tag>
                  </div>
                  <div v-else-if="scope.row.totalstatus==-1">
                    <el-tag type="info" size="small">
                      <i class="fa mark" style="background:#999;"></i>
                      <span>完结</span>
                    </el-tag>
                  </div>
                  <div v-else-if="scope.row.totalstatus==0">
                    <el-tag size="small">
                      <i class="fa mark" style="background:#409EFF;"></i>
                      <span>正常</span>
                    </el-tag>
                  </div>
                  <div v-else-if="scope.row.totalstatus==4">
                    <el-tag type="danger" size="small">
                      <i class="fa mark" style="background:#f56c6c;"></i>
                      <span>严重滞后</span>
                    </el-tag>
                  </div>
                  <div v-else>
                    <span>/</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="edit" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleLookDetail(scope.row)" type="text" size="mini">详情</el-button>
                <el-button @click="handleEditData(scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="handleDeleteData(scope.row)" type="text" size="mini">删除</el-button>
                <el-button @click="handleFeedBack(scope.row)" type="text" size="mini">反馈</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 40]"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, sizes, jumper"
            :total="totalsData"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 导入文件 -->
    <div class="import-data-box">
      <import-file
        :importdataVisible.sync="importdataVisible"
        :upbtnDisabled.sync="upbtnDisabled"
        :showYearbox="showYearbox"
        :itemShow="itemShow"
        :importFileList="importProjectList"
        @getAllList-event="getProjectAll"
      ></import-file>
    </div>
    <!-- 导出 -->
    <div class="export-data-box">
      <!-- 选择下载格式 -->
      <el-dialog title="选择下载格式" :visible.sync="downTypeVisible" width="400px">
        <div style="text-align:center;">
          <el-radio-group v-model="downType">
            <el-radio :label="1">Excel</el-radio>
            <el-radio style="margin-left: 56px;" :label="2">Word</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="downDatalist" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 报送规则 -->
    <div class="batchrule-box" v-if="batchVisible">
      <batch-rule
        @my-back="batchBack"
        :allitems="allitems"
        :itemShow="itemShow"
      ></batch-rule>
    </div>
    <!-- 新增 -->
    <div class="addwrap" v-if="isShowAdd">
      <add-project @goback-event="handleBack" :leaderlist="leaderlist"></add-project>
    </div>
  </div>
</template>

<script>
import { upfile, imgIp, importProjectList } from "../../api/imgUrl";
import addProject from "./addProjectItem"; //新增
import importFile from "../publicItem/importFileItem"; //导入文件
import batchRule from "../publicItem/batchruleItem"; //报送规则
import { defaturl } from "../../api/apiUrl";
export default {
  name: "systemlog",
  components: { addProject, importFile, batchRule },
  data() {
    return {
      itemShow: 1,
      isShowMain: true,
      isShowAdd: false,
      iconUrl: require("../../assets/icon1.png"),
      printUrl: require("../../assets/print.png"),
      filters: {},
      toolShow: false,
      moreText: "更多搜索条件",
      isAddBtnShow: true,
      isDownBtnShow: true,
      isImportBtnShow: true,
      isEditBtnShow: true,
      // 牵头单位
      leadunits: [],
      // 牵头区领导
      leaderlist: [],
      // 项目类别
      projectType: [
        { value: 0, name: "一般项目" },
        { value: 1, name: "重点项目" }
      ],
      // 总体进度
      totalStatus: [
        { value: 0, status: "正常" },
        { value: 3, status: "滞后" },
        { value: 4, status: "严重滞后" },
        { value: -1, status: "完结" }
      ],
      // 材料报送
      formStatus: [
        { value: 0, status: "正常" },
        { value: 1, status: "预警" },
        { value: 2, status: "逾期" },
        { value: -1, status: "完结" }
      ],
      // 项目列表数据
      projectdata: [],
      // 当前页
      currentPage: 1,
      // 一页显示多少条
      pageSize: 10,
      // 总条数
      totalsData: 10,
      importdataVisible: { visible: false }, //导入数据弹窗
      downTypeVisible: false, //导出数据弹窗
      downType: 0, //选择导出类型，1 excel, 2 word
      upbtnDisabled: false,
      showYearbox: false,
      importProjectList: "",
      upfile: "",
      imgIp: "",
      defaturl: "",
      batchVisible: false, //报送规则是否显示
      allitems: [], //所有项目数据
    };
  },
  created() {
    this.upfile = upfile;
    this.imgIp = imgIp;
    this.defaturl = defaturl;
    this.importProjectList = importProjectList;
  },
  methods: {
    //   详情
    handleLookDetail(row) {},
    // 编辑
    handleEditData(row) {},
    // 删除
    handleDeleteData(row) {},
    // 反馈
    handleFeedBack(row) {},
    // 获取项目列表数据
    getProjectAll() {
      let para = this.filters;
      para.pageSize = this.pageSize;
      para.currentPage = this.currentPage;
    },
    //   新增
    handleAdd() {
      this.isShowMain = false;
      this.isShowAdd = true;
    },
    // 新增返回
    handleBack() {
      this.isShowMain = true;
      this.isShowAdd = false;
    },
    // 导出
    downLoadData() {
      this.downTypeVisible = true;
    },
    downDatalist() {
      if (this.downType == 1) {
        // window.open(
        //   this.defaturl + "/ProjectExport2Word/export?userid=" + this.loginid
        // );
        this.downTypeVisible = false;
      } else if (this.downType == 2) {
        // window.open(
        //   this.defaturl + "/ProjectExport2Word/export?userid=" + this.loginid
        // );
        this.downTypeVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: "请选择下载格式!"
        });
      }
    },
    // 导入数据
    importData() {
      this.importdataVisible.visible = true;
      this.showYearbox = false;
      this.upbtnDisabled = false;
    },
    // 获取所有项目数据
    getAllDatas() {
    //   getAllProject("", data => {
    //     if (data.data.obj == null) {
    //       this.allitems = [];
    //     } else {
    //       this.allitems = data.data.obj;
    //     }
    //   });
    },
    // 批量报送规则
    batchRule() {
      this.isShowMain = false;
      this.batchVisible = true;
      this.getAllDatas();
    },
    // 规则页面返回
    batchBack() {
      this.isShowMain = true;
      this.batchVisible = false;
      this.getProjectAll();
    },
    // 展开更多搜索条件
    moreSearch() {
      if (this.toolShow) {
        this.toolShow = false;
        this.moreText = "更多搜索条件";
      } else {
        this.toolShow = true;
        this.moreText = "收回";
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 序号
    numberFormatter(row, column, cellValue, index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize;
    },
    // 分页 一页多少条更改
    handleSizeChange: function(size) {
      this.pageSize = size;
      this.getProjectAll();
    },
    // 跳转到某一页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getProjectAll();
    },
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.projectwrap {
}
</style>
