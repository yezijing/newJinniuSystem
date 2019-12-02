<template>
  <div class="detailbox">
    <el-row :gutter="20" class="wrap">
      <el-col :span="16">
        <el-form size="small" :model="clueDetailForm" label-width="142px" ref="clueDetailForm">
          <el-form-item label="商机名称：" prop="businessName">
            <el-input readonly v-model="clueDetailForm.businessName" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="项目地点：" prop="adress">
            <el-input readonly v-model="clueDetailForm.adress" placeholder="未填写"></el-input>
          </el-form-item>
          <div class="flexbox">
            <el-form-item label="商机分类：" prop="categoryName" class="flexitem">
              <el-input readonly v-model="clueDetailForm.categoryName" placeholder="未填写"></el-input>
            </el-form-item>
            <el-form-item label="商机状态：" prop="stateName" class="flexitem">
              <el-input readonly v-model="clueDetailForm.stateName" placeholder="未填写"></el-input>
            </el-form-item>
          </div>
          <div class="flexbox">
            <el-form-item label="商机来源：" prop="sourceName" class="flexitem">
              <el-input readonly v-model="clueDetailForm.sourceName" placeholder="未填写"></el-input>
            </el-form-item>
            <el-form-item label="拜访频率：" prop="frequence" class="flexitem">
              <el-input readonly v-model="clueDetailForm.frequence" placeholder="未填写">
                <template slot="prepend">每隔</template>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="flexbox">
            <el-form-item label="项目预计开标时间：" prop="tenderTime" class="flexitem">
              <!-- <el-input readonly v-model="clueDetailForm.tenderTime" placeholder="未填写"></el-input> -->
              <el-date-picker v-model="clueDetailForm.tenderTime" type="datetime" readonly placeholder="请选择预计开标时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="预计实现毛利：" prop="grossMargin" class="flexitem">
              <el-input readonly v-model="clueDetailForm.grossMargin" placeholder="未填写"></el-input>
            </el-form-item>
          </div>
          <div class="flexbox">
            <el-form-item label="预计中标金额：" prop="bidAmount" class="flexitem">
              <el-input readonly v-model="clueDetailForm.bidAmount" placeholder="未填写"></el-input>
            </el-form-item>
            <el-form-item label="项目建模预算：" prop="modelBudget" class="flexitem">
              <el-input readonly v-model="clueDetailForm.modelBudget" placeholder="未填写"></el-input>
            </el-form-item>
          </div>
          <div class="relatebox">
            <p class="tt">相关人：</p>
            <div class="relatelist">
              <p v-if="relatelistDetail.length==0">无</p>
              <div v-else>
                <el-tooltip
                  effect="dark"
                  placement="top-start"
                  v-for="(item,index) in relatelistDetail"
                  :key="index"
                >
                  <div style="max-width:300px;line-height:2;" slot="content">
                    <p style="font-size: 14px;font-weight: bold;">客户信息</p>
                    <p>客户姓名：{{item.name}}</p>
                    <p>客户职位：{{item.job}}</p>
                    <p>上级领导：{{item.leadership}}</p>
                    <p>客户电话：{{item.phone}}</p>
                    <p>客户角色：{{item.customerRole}}</p>
                  </div>
                  <a class="item" href="javascript:;">{{item.name}}</a>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-form>
      </el-col>
      <el-col :span="8">
        <div class="visit-box">
          <p class="tt">拜访记录详情</p>
          <div class="visitwrap">
            <p v-if="visitList.length==0">无</p>
            <div v-else>
              <el-tooltip
                effect="dark"
                placement="top-start"
                v-for="(item,index) in visitList"
                :key="index"
              >
                <div
                  slot="content"
                  class="toolbox"
                  style="line-height:1.7;max-width:300px;color:#ccc;"
                >
                  <p style="margin-bottom:6px;">
                    客户姓名：
                    <span style="color:#fafafa;margin-right:10px;" v-for="vitem in item.visitUserList" :key="vitem.id">{{vitem.name}}</span>
                  </p>
                  <p style="margin-bottom:6px;">
                    拜访时间：
                    <span style="color:#fafafa;">{{item.visitTime | dateformat('YYYY-MM-DD')}}</span>
                  </p>
                  <p style="margin-bottom:6px;">
                    下次拜访时间：
                    <span style="color:#fafafa;">{{item.nextTime | dateformat('YYYY-MM-DD')}}</span>
                  </p>
                  <p style="margin-bottom:6px;">
                    申请协助：
                    <span style="color:#fafafa;margin-right:10px;" v-for="hitem in item.helpList" :key="hitem.id">{{hitem.name}}</span>
                  </p>
                  <p style="margin-bottom:6px;">
                    拜访目的：
                    <span style="color:#fafafa;">{{item.visitAim}}</span>
                  </p>
                  <p style="margin-bottom:6px;">
                    客户要求：
                    <span style="color:#fafafa;">{{item.customerRequire}}</span>
                  </p>
                  <p style="margin-bottom:6px;">
                    下步计划：
                    <span style="color:#fafafa;">{{item.nextPlan}}</span>
                  </p>
                  <p style="margin-bottom:6px;">
                    待协调解决：
                    <span style="color:#fafafa;">{{item.dealThing}}</span>
                  </p>
                </div>
                <div class="list">
                  <p class="num">{{index+1}}</p>
                  <div class="con">
                    <p>
                      <span>客户姓名：</span> 
                      <i v-for="vitem in item.visitUserList" :key="vitem.id">{{vitem.name}}</i>
                    </p>
                    <p>
                      <span>拜访时间：</span>
                      {{item.visitTime | dateformat('YYYY-MM-DD')}}
                    </p>
                    <p>
                      <span>待协调解决：</span>
                      {{item.dealThing}}
                    </p>
                  </div>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "detailClue",
  components: {},
  props: [
    "detailClueVisible",
    "clueDetailForm",
    "relatelistDetail",
    "visitList"
  ],
  data() {
    return {};
  },
  created() {},
  watch: {
    detailClueVisible: function(newValue, oldValue) {
      this.$emit("update:detailClueVisible", newValue);
    }
  },
  methods: {}
};
</script>

<style lang="scss" scope>
.relatebox {
  display: flex;
  .tt {
    text-align: right;
    font-size: 14px;
    color: #606266;
    line-height: 32px;
    padding: 0 12px 0 0;
    width: 142px;
  }
  .relatelist {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .item {
      display: inline-block;
      position: relative;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      background-color: #eee;
      color: #333;
      margin-right: 10px;
      font-size: 12px;
      border-radius: 3px;
    }
  }
}
.detailbox {
  .wrap {
    display: flex;
    align-items: stretch;
    .el-col {
      .visit-box {
        height: 100%;
        border-left: 1px solid #ccc;
        padding-left: 20px;
        .tt {
          color: #333;
          font-size: 14px;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .list {
          display: flex;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px dotted #ccc;
          .num {
            color: #333;
            font-size: 12px;
            line-height: 1.7;
            width: 30px;
            font-weight: bold;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
            &:after {
              content: "";
              position: absolute;
              left: 4px;
              height: 100%;
              top: 24px;
              background: #999;
              width: 1px;
            }
          }
          .con {
            flex: 1;
            color: #333;
            font-size: 14px;
            line-height: 1.7;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 305px;
              color: #666;
              span {
                color: #333;
              }
              i{font-style: normal;display: inline-block;margin-right: 10px;}
            }
          }
        }
      }
    }
    .visitwrap {
      max-height: 320px;
      overflow: auto;
    }
  }
}
</style>
