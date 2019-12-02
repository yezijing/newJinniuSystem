<template>
  <div class="list-wrap">
    <p class="title">
      项目管理
      <a class="morebtn" v-if="openShow" href="javascript:;" @click="openDown()">···</a>
      <a
        class="el-icon-arrow-down morebtn"
        v-if="closeShow"
        href="javascript:;"
        @click="closeDown()"
      ></a>
    </p>
    <div class="wrapbox" v-if="closeUp">
      <el-form size="small" :model="projectForm" label-width="140px" ref="projectForm">
        <div class="flexbox">
          <el-form-item label="项目经理：" prop="manager" class="flexitem">
            <el-select
              v-model="projectForm.manager"
              clearable
              placeholder="请选择项目合作对接人"
              @change="selectChange"
            >
              <el-option
                v-for="item in managerList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同签订时间：" prop="time" class="flexitem">
            <el-date-picker
              v-model="projectForm.time"
              type="date"
              @change="selectChange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="合同约定工期：" prop="price" class="flexitem">
            <el-input
              v-model.number="projectForm.price"
              auto-complete="off"
              placeholder="请填写合同约定工期"
            >
              <template slot="append">月</template>
            </el-input>
          </el-form-item>
          <el-form-item label="合同约定开工时间：" prop="time" class="flexitem">
            <el-date-picker
              v-model="projectForm.time"
              type="date"
              @change="selectChange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="实际开工时间：" prop="time" class="flexitem">
            <el-date-picker
              v-model="projectForm.time"
              type="date"
              @change="selectChange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="项目实际竣工时间：" prop="time" class="flexitem">
            <el-date-picker
              v-model="projectForm.time"
              type="date"
              @change="selectChange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="number">
          <span class="t0">履约质保金：</span>
          <el-input v-model.number="collectMoney" size="small" auto-complete="off">
            <template slot="prepend">收</template>
            <template slot="append">元</template>
          </el-input>
          <el-input v-model.number="payMoney" auto-complete="off" size="small">
            <template slot="prepend">付</template>
            <template slot="append">元</template>
          </el-input>
          <el-input v-model.number="refundMoney" auto-complete="off" size="small">
            <template slot="prepend">退</template>
            <template slot="append">元</template>
          </el-input>
          <el-input v-model.number="repayMoney" auto-complete="off" size="small">
            <template slot="prepend">还</template>
            <template slot="append">元</template>
          </el-input>
        </div>
        <div class="bid-subtotal">
          <span>履约质保金小计：</span> 元
        </div>

        <div class="flexbox">
          <el-form-item label="签订合同额：" prop="price" class="flexitem">
            <el-input v-model.number="projectForm.price" auto-complete="off" placeholder="请填写签订合同额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="审计增减：" prop="price" class="flexitem">
            <el-input v-model.number="projectForm.price" auto-complete="off" placeholder="请填写审计增减额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="管理费：" prop="price" class="flexitem">
            <el-input v-model.number="projectForm.price" auto-complete="off" placeholder="请填写管理费">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="管理费：" prop="price" class="flexitem">
            <el-input v-model.number="projectForm.price" auto-complete="off" placeholder="请填写管理费">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="bid-subtotal bid-subtotal2">
          <span>金额大写：</span>元
        </div>
        <el-form-item label="备注：" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2}"
            v-model="projectForm.remark"
            placeholder="备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 投标小组 -->
      <div class="probox-mt">
        <tender-team :tenderTeamList.sync="tenderTeamList"></tender-team>
      </div>
      <!-- 上传原件 -->
      <div class="probox-mt">
        <upload-file></upload-file>
      </div>
    </div>
  </div>
</template>

<script>
import tenderTeam from "./tenderTeamItem";
import uploadFile from "./uploadFileItem";
export default {
  name: "chargeSituation",
  components: { tenderTeam, uploadFile },
  props: { projectForm: Object },
  data() {
    return {
      // 投标小组
      tenderTeamList: [],
      // 项目经理
      managerList: [],
      openShow: false,
      closeShow: true,
      closeUp: true,
      chargeTitle: "",
      isType: "",
      isRead: false,
      projectFormVisible: false,
      collectMoney: "",
      payMoney: "",
      refundMoney: "",
      repayMoney: ""
    };
  },
  created() {},
  watch: {
    projectForm: function(newValue, oldValue) {
      this.$emit("update:projectForm", newValue);
    },
    chargeList: function(newValue, oldValue) {
      this.$emit("update:chargeList", newValue);
    }
  },
  methods: {
    //   展开
    openDown() {
      this.closeUp = true;
      this.openShow = false;
      this.closeShow = true;
    },
    // 收回
    closeDown() {
      this.closeUp = false;
      this.openShow = true;
      this.closeShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  .title {
    color: #0099ff;
    font-size: 14px;
    line-height: 20px;
    border-left: 3px solid #0099ff;
    padding-left: 6px;
    position: relative;
    .morebtn {
      position: absolute;
      right: 0;
      top: 0;
      line-height: 20px;
      color: #0099ff;
      font-size: 24px;
      width: 30px;
      text-align: right;
    }
  }
  .wrapbox {
    margin-top: 15px;
    padding-bottom: 15px;
    .bid-subtotal {
      color: #f00;
      font-size: 14px;
      margin-bottom: 18px;
      span {
        display: inline-block;
        width: 140px;
        text-align: right;
        padding-right: 12px;
      }
    }
    .bid-subtotal2 {
      // text-align: right;
      padding-left: 484px;
    }
    .number {
      display: flex;
      margin-bottom: 12px;
      .t0 {
        width: 140px;
        text-align: right;
        flex-shrink: 0;
        line-height: 32px;
        padding-right: 12px;
      }
      .el-input-group--append .el-input__inner,
      .el-input-group__prepend {
        text-align: center;
      }
      .el-input + .el-input {
        margin-left: 20px;
      }
    }
  }
}
.flexbox .flexitem + .flexitem {
  margin-left: 40px;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 12px;
}
.probox-mt {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 0;
  margin-top: 20px;
}
</style>
