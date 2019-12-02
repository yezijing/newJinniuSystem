<template>
  <div class="mainbox">
    <p class="navtitle">
      <span>线索管理</span>
    </p>
    <div class="toolbar">
      <el-form :inline="true" :model="filters" ref="filters" size="small">
        <el-form-item label="商机名称：" prop="businessName">
          <el-input v-model="filters.businessName" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售人员：" prop="sellManName" class="ww2">
          <el-input v-model="filters.sellManName" placeholder="请输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商机状态：" prop="status">
          <el-select
            v-model="filters.status"
            filterable
            clearable
            placeholder="全部"
            @change="selectChange"
          >
            <el-option
              v-for="item in states"
              :key="item.id"
              :label="item.stateName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="getDatas" type="primary">搜索</el-button>
          <el-button @click="resetForm('filters')">重置</el-button>
        </el-form-item>
        <div class="toolbtns">
          <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
          <el-select class="viewbox" v-model="viewway" placeholder="请选择" @change="changeView">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
              <template>
                <p>
                  <img style="height:20px;vertical-align: middle;" :src="item.src" alt />
                  {{item.name}}
                </p>
              </template>
            </el-option>
          </el-select>
        </div>
      </el-form>
    </div>
    <!-- 表格视图  -->
    <div class="listcontent" v-if="clueTableShow">
      <!--列表-->
      <el-table border size="small" :data="clueData" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="businessName" label="商机名称"></el-table-column>
        <el-table-column prop="clientUserList" label="客户姓名" width="100px">
          <template slot-scope="scope">
            <p v-if="scope.row.clientUserList==null"></p>
            <div v-else>
              <p v-for="item in scope.row.clientUserList" :key="item.id">{{item.name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sellManName" label="销售人员" width="100px"></el-table-column>
        <el-table-column prop="adress" label="地址"></el-table-column>
        <el-table-column prop="telephone" label="电话号码" width="106px"></el-table-column>
        <el-table-column prop="visitTime" label="最新活动拜访时间" width="148px">
          <template slot-scope="scope">
            <p v-if="scope.row.visitTime==null"></p>
            <p v-else>{{scope.row.visitTime | dateformat('YYYY-MM-DD')}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="nextTime" label="下次拜访时间" width="148px">
          <template slot-scope="scope">
            <p v-if="scope.row.nextTime==null"></p>
            <p v-else>{{scope.row.nextTime | dateformat('YYYY-MM-DD')}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="nextPlan" label="下步工作计划"></el-table-column>
        <el-table-column prop="sourceName" label="商机来源" width="100px">
          <template slot-scope="scope">
            <p class="source">{{scope.row.sourceName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="stateId" label="商机状态" width="100px">
          <template slot-scope="scope">
            <div class="select-table">
              <el-select
                v-model="scope.row.stateId"
                class="stateSelect"
                size="mini"
                @change="updateStatus(scope.row)"
              >
                <el-option
                  v-for="item in states"
                  :key="item.id"
                  :label="item.stateName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="192px">
          <template scope="scope">
            <el-button size="small" @click="handleVisitRecord(scope.row, scope.row.id)">新增拜访记录</el-button>
            <el-button size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 任务视图  -->
    <div class="taskview" v-if="clueViewShow">
      <clue-view
        :chanceData.sync="chanceData"
        :followData.sync="followData"
        :winOrderData.sync="winOrderData"
        :overData.sync="overData"
        :states="states"
        @addclue-event="handleAdd"
        @detailclue-event="handleViewDetail"
        :clueid.sync="clueid"
      ></clue-view>
    </div>
    <!-- 添加、编辑 -->
    <el-dialog :title="dtitle" :visible.sync="dataFormVisible" width="800px" v-dialogDrag>
      <clue-add
        :dataFormVisible="dataFormVisible"
        :dataForm.sync="dataForm"
        :relatelist.sync="relatelist"
        :states="states"
        :sourceList.sync="sourceList"
        :sorts="sorts"
        :isType="isType"
        ref="addClueChild"
      ></clue-add>
      <div slot="footer">
        <el-button size="small" @click="dataFormVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('dataForm')">{{savaWord}}</el-button>
      </div>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog title="商机详情" :visible.sync="detailClueVisible" width="1200px" v-dialogDrag>
      <clue-detail
        :detailClueVisible="detailClueVisible"
        :clueDetailForm="clueDetailForm"
        :relatelistDetail="relatelistDetail"
        :visitList="visitList"
        ref="detailClueChild"
      ></clue-detail>
      <div slot="footer">
        <el-button size="small" @click="detailClueVisible=false" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增拜访记录 -->
    <el-dialog title="添加拜访记录" :visible.sync="visitRecordVisible" width="800px" v-dialogDrag>
      <visit-record
        :visitRecordVisible.sync="visitRecordVisible"
        :visitForm.sync="visitForm"
        :helpList.sync="helpList"
        :userid="userid"
        :clueid="clueid"
        :cusNameList.sync="cusNameList"
        ref="visitRecordChild"
      ></visit-record>
      <div slot="footer">
        <el-button size="small" @click="visitRecordVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitVisitRecord()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clueAdd from "./addClueItem"; //新增商机
import clueDetail from "./detailClueItem"; //商机详情
import visitRecord from "./visitRecordItem"; //拜访记录
import clueView from "./clueViewItem"; //任务视图
import { getAllBusSortData, getAllBusStateData } from "../../api/settingApi";
import {
  getClueListData,
  addClueData,
  editClueData,
  detailSourceData,
  getSourceListData,
  addVisitRecordData,
  getAllRalateData,
  updateClueStatusData
} from "../../api/clueApi";
export default {
  name: "cluepage",
  components: {
    clueAdd,
    clueDetail,
    visitRecord,
    clueView
  },
  data() {
    return {
      userid: JSON.parse(this.$store.getters.userdata).id,
      clueViewShow: false,
      clueTableShow: true,
      // 拜访记录表单
      visitForm: {},
      // 拜访记录弹窗
      visitRecordVisible: false,
      // 商机详情弹窗
      detailClueVisible: false,
      //详情表单
      clueDetailForm: {},
      visitList: [], //拜访记录详情列表
      // 详情的相关人列表
      relatelistDetail: [],
      // 商机分类
      sorts: [],
      // 弹窗标题
      dtitle: "",
      // 弹窗是否显示
      dataFormVisible: false,
      // 表单
      dataForm: {},
      // 保存、确定
      savaWord: "",
      isType: "",
      // 表格视图 or 任务看板
      options: [
        { value: 0, name: "表格视图", src: "../../../static/images/table.png" },
        { value: 1, name: "任务看板", src: "../../../static/images/view.png" }
      ],
      viewway: 0, //默认表格视图
      filters: {},
      // 列表数据
      clueData: [],
      chanceData: [],
      followData: [], //待跟进
      winOrderData: [], //赢单
      overData: [], //完结
      // 商机状态
      states: [],
      //   商机来源
      sourceList: [],
      relatelist: [],
      clueid: 0,
      // 协助人
      helpList: [],
      // 相关人列表
      cusNameList: []
    };
  },
  created() {
    this.getAllClueList();
    this.getBusSortList();
    this.getBusStateList();
  },
  methods: {
    // 修改线索状态
    updateStatus(row) {
      let para = { bid: row.id, stateId: row.stateId };
      updateClueStatusData(para, data => {
        this.$message({
          message: "修改状态成功！",
          type: "success"
        });
        this.getAllClueList();
      });
    },
    // 获取相关人列表
    getAllRalateList(id) {
      getAllRalateData({ threadId: id }, data => {
        if (data.data.obj == null) {
          this.cusNameList = [];
        } else {
          this.cusNameList = data.data.obj;
        }
      });
    },
    // 商机来源列表
    getSourceAllList() {
      getSourceListData("", data => {
        if (data.data.obj == null) {
          this.sourceList = [];
        } else {
          this.sourceList = data.data.obj;
        }
      });
    },
    // 查询所有商机状态
    getBusStateList() {
      getAllBusStateData("", data => {
        this.states = data.data.obj;
      });
    },
    // 查询所有商机分类
    getBusSortList() {
      getAllBusSortData("", data => {
        this.sorts = data.data.obj;
      });
    },
    // 查询所有线索数据
    getAllClueList() {
      let para = Object.assign({}, this.filters);
      getClueListData(para, data => {
        if (data.data.obj == null || data.data.obj.length == 0) {
          this.clueData = [];
          this.chanceData = [];
          this.followData = [];
          this.winOrderData = [];
          this.overData = [];
        } else {
          this.clueData = data.data.obj;
          for (var i = 0; i < this.clueData.length; i++) {
            if (this.clueData[i].status == 0) {
              this.chanceData.push(this.clueData[i]);
            } else if (this.clueData[i].status == 1) {
              this.followData.push(this.clueData[i]);
            } else if (this.clueData[i].status == 2) {
              this.winOrderData.push(this.clueData[i]);
            } else if (this.clueData[i].status == 3) {
              this.overData.push(this.clueData[i]);
            }
          }
        }
      });
    },
    // 视图切换
    changeView() {
      if (this.viewway == 0) {
        this.clueViewShow = false;
        this.clueTableShow = true;
      } else if (this.viewway == 1) {
        this.clueViewShow = true;
        this.clueTableShow = false;
      }
    },
    // 新增拜访记录
    handleVisitRecord(row, id) {
      this.clueid = id;
      this.getAllRalateList(id);
      this.visitForm = {};
      this.helpList = [];
      this.visitRecordVisible = true;
    },
    // 新增拜访提交
    submitVisitRecord() {
      let para = Object.assign({}, this.visitForm);
      // 客户名字ids
      var aids = this.visitForm.visitId;
      if (aids.length == 0) {
        aids = "";
      } else {
        aids = aids.join(",");
      }
      para.visitIds = aids;
      // 协助人id
      var hids = [];
      if (this.helpList.length == 0) {
        hids = "";
      } else {
        for (var i = 0; i < this.helpList.length; i++) {
          hids.push(this.helpList[i].id);
        }
      }
      para.helpIds = hids.join(",");
      para.userId = this.userid;
      para.threadId = this.clueid;
      addVisitRecordData(para, data => {
        this.visitRecordVisible = false;
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.getAllClueList();
      });
    },
    //   新增
    handleAdd() {
      this.savaWord = "新增";
      this.dtitle = "添加商机";
      this.dataForm = {};
      this.isType = "add";
      this.relatelist = [];
      this.getSourceAllList();
      this.dataFormVisible = true;
      this.$refs.addClueChild.$refs.dataForm.clearValidate();
    },
    //   编辑
    handleEdit(row) {
      this.savaWord = "保存";
      this.dtitle = "编辑商机";
      this.isType = "edit";
      this.clueid = row.id;
      this.editFuc(this.clueid);
    },
    // 编辑方法
    editFuc(id) {
      this.dataForm = {};
      let para = { id: id };
      detailSourceData(para, data => {
        let obj = data.data.obj;
        this.dataForm.id = obj.id;
        this.dataForm.adress = obj.adress;
        this.dataForm.bidAmount = obj.bidAmount;
        this.dataForm.businessName = obj.businessName;
        this.dataForm.categoryId = obj.categoryId;
        this.dataForm.frequence = obj.frequence;
        this.dataForm.grossMargin = obj.grossMargin;
        this.dataForm.modelBudget = obj.modelBudget;
        this.dataForm.sellManName = obj.sellManName;
        this.dataForm.sourceName = obj.sourceName;
        this.dataForm.stateId = obj.stateId;
        this.dataForm.modelBudget = obj.modelBudget;
        this.dataForm.tenderTime = obj.tenderTime;
        if (data.data.obj.relatedPersonList == null) {
          this.relatelist = [];
        } else {
          this.relatelist = data.data.obj.relatedPersonList;
        }
        this.dataFormVisible = true;
        this.$refs.addClueChild.$refs.dataForm.clearValidate();
      });
    },
    // 提交表单
    submitForm() {
      var child = this.$refs.addClueChild;
      child.$refs.dataForm.validate(valid => {
        if (valid) {
          if (this.isType == "add") {
            this.addClueSubmit();
          } else if (this.isType == "edit") {
            this.editClueSubmit();
          } else {
            this.dataFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    // 新增提交
    addClueSubmit() {
      let para = Object.assign({}, this.dataForm);
      para.userId = this.userid;
      para.relatedPersonList = this.relatelist;
      para = JSON.stringify(para);
      addClueData(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllClueList();
      });
    },
    // 编辑提交
    editClueSubmit() {
      let para = Object.assign({}, this.dataForm);
      para.userId = this.userid;
      para.relatedPersonList = this.relatelist;
      para = JSON.stringify(para);
      editClueData(para, data => {
        this.dataFormVisible = false;
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.getAllClueList();
      });
    },
    // 视图详情
    handleViewDetail(newid) {
      this.clueid = newid;
      for (var i = 0; i < this.clueData.length; i++) {
        if (this.clueData[i].id == this.clueid) {
          this.clueDetailForm = Object.assign({}, this.clueData[i]);
          break;
        }
      }
      this.relatelistDetail = [
        {
          leader: "leader",
          name: "王磊",
          phone: "15896584784",
          position: "java开发工程师",
          role: "主要负责人"
        },
        {
          leader: "leader",
          name: "刘隔",
          phone: "15896584784",
          position: "java开发工程师",
          role: "协助"
        }
      ];
      this.visitList = [
        {
          name: "打更",
          time: "2019-10-02",
          aim: "弄过好难看",
          require: "葛洪还没给",
          plan: "几根公嗯",
          matter: "细条个够弄额"
        },
        {
          name: "打更2",
          time: "2019-10-02",
          aim: "弄过好难看",
          require:
            "葛洪还没给葛洪还没给葛洪还没给葛洪还没给葛洪还没给葛洪还没给葛洪还没给",
          plan: "几根公嗯",
          matter: "细条个够弄额"
        },
        {
          name: "打更2",
          time: "2019-10-02",
          aim: "弄过好难看",
          require:
            "葛洪还没给葛洪还没给葛洪还没给葛洪还没给葛洪还没给葛洪还没给葛洪还没给",
          plan: "几根公嗯",
          matter: "细条个够弄额细条个够弄额细条个够弄额细条个够弄额细条个够弄额"
        }
      ];
      this.detailClueVisible = true;
    },
    // 详情方法
    detailFuc(id) {
      let para = { id: id };
      detailSourceData(para, data => {
        this.clueDetailForm = data.data.obj;
        if (data.data.obj.relatedPersonList == null) {
          this.relatelistDetail = [];
        } else {
          this.relatelistDetail = data.data.obj.relatedPersonList;
        }
        if (data.data.obj.visitRecordList == null) {
          this.visitList = [];
        } else {
          this.visitList = data.data.obj.visitRecordList;
        }
      });
    },
    //   详情
    handleDetail(row) {
      this.clueid = row.id;
      this.detailFuc(this.clueid);
      this.detailClueVisible = true;
    },
    // 搜索
    getDatas() {
      this.getAllClueList();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getAllClueList();
    },
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.tsbox {
  text-align: right;
}
.source {
  color: #1890ff;
}

</style>
