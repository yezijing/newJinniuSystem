<template>
  <div class="mainbox">
    <el-row :gutter="40" class="mbbox2">
      <el-col :span="10">
        <div class="datawrap">
          <div class="databox">
            <p class="tt">待处理工作总数</p>
            <p class="number">150</p>
          </div>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="databox">
                <p class="tt">预警</p>
                <p class="number">150</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="databox">
                <p class="tt">逾期</p>
                <p class="number">150</p>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="databox">
                <p class="tt">滞后</p>
                <p class="number">150</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="databox">
                <p class="tt">严重滞后</p>
                <p class="number">150</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="whitebox">
          <p class="title">预警信息</p>
          <warn-list :warnlist="warnlist"></warn-list>
        </div>
      </el-col>
    </el-row>
    <el-row class="mbbox">
      <el-col :span="24">
        <div class="whitebox">
          <person-data :persondata="persondata"></person-data>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="14">
        <div class="whitebox">
          <p class="title">工作动态</p>
          <el-table border :data="workdata" style="width: 100%" height="300px" size="small">
            <el-table-column prop="name" label="事项"></el-table-column>
            <el-table-column prop="name" label="催办内容"></el-table-column>
            <el-table-column prop="name" label="时间"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="whitebox">
          <p class="title">X月督办事项状态分析</p>
          <div class>
            <status-charts :statedata="statedata"></status-charts>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import warnList from "../publicItem/warnListItem";
import personData from "../publicItem/personDataItem";
import statusCharts from "../publicItem/statusChartsItem";
export default {
  name: "index",
  components: { warnList, personData, statusCharts },
  data() {
    return {
      // 状态分析
      statedata: [
        { value: 50, name: "待审核" },
        { value: 102, name: "审核通过" },
        { value: 15, name: "审核未通过" }
      ],
      // 工作动态
      workdata: [],
      // 总数据列表
      persondata: [],
      // 预警信息
      warnlist: [
        {
          name: "项目名称",
          deptname: "牵头单位名称",
          type: "重点项目",
          endtime: "2018-08-12",
          formstatus: 1,
          totalstatus: 3
        },
        {
          name: "项目名称",
          deptname: "牵头单位名称",
          type: "重点项目",
          endtime: "2018-08-12",
          formstatus: 0,
          totalstatus: 4
        },
        {
          name: "项目名称",
          deptname: "牵头单位名称",
          type: "重点项目",
          endtime: "2018-08-12",
          formstatus: -1,
          totalstatus: 0
        },
        {
          name: "项目名称",
          deptname: "牵头单位名称",
          type: "重点项目",
          endtime: "2018-08-12",
          formstatus: 2,
          totalstatus: -1
        }
      ]
    };
  },
  mounted: function() {},
  created: function() {},
  updated: function() {},
  watch: {
    //观察option的变化
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.mainbox {
  background-color: #f2f2f2 !important;
  padding: 0 0 20px 0 !important;
  .mbbox {
    margin-bottom: 20px;
  }
  .mbbox2 {
    margin-bottom: 10px;
  }
  .whitebox {
    background-color: #fff;
    padding: 15px;
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
  .title {
    color: #333;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .databox {
    background-color: #37a2da;
    border-radius: 8px;
    color: #fff;
    padding: 20px;
    margin-bottom: 10px;
    .tt {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .number {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>