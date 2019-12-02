<template>
  <div class="list-wrap">
    <p class="title">
      项目投标收费情况
      <a class="morebtn" v-if="openShow" href="javascript:;" @click="openDown()">···</a>
      <a
        class="el-icon-arrow-down morebtn"
        v-if="closeShow"
        href="javascript:;"
        @click="closeDown()"
      ></a>
    </p>
    <div class="wrapbox" v-if="closeUp">
      <el-form size="small" :model="chargeForm" label-width="126px" ref="chargeForm">
        <div class="flexbox">
          <el-form-item label="项目产值：" prop="price" class="flexitem">
            <el-input v-model.number="chargeForm.price" auto-complete="off" placeholder="请填写项目产值">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="资质使用费用：" prop="price" class="flexitem">
            <el-input v-model.number="chargeForm.price" auto-complete="off" placeholder="请填写资质使用费用">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="标书制作费：" prop="price" class="flexitem">
            <el-input v-model.number="chargeForm.price" auto-complete="off" placeholder="请填写标书制作费">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="技术服务费：" prop="price" class="flexitem">
            <el-input v-model.number="chargeForm.price" auto-complete="off" placeholder="请填写技术服务费">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="出现场费：" prop="price" class="sigle-ww">
          <el-input v-model.number="chargeForm.price" auto-complete="off" placeholder="请填写出现场费">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <div class="bid-subtotal">
          <span>投标收费小计：</span>
          {{tenderChargeTotal}}元
        </div>
        <div class="number">
          <span class="t0">投标保证金：</span>
          <el-input
            v-model.number="collectMoney"
            size="small"
            auto-complete="off"
            @keyup.native="bondMoney()"
          >
            <template slot="prepend">收</template>
            <template slot="append">元</template>
          </el-input>
          <el-input
            v-model.number="payMoney"
            auto-complete="off"
            size="small"
            @keyup.native="bondMoney()"
          >
            <template slot="prepend">付</template>
            <template slot="append">元</template>
          </el-input>
          <el-input
            v-model.number="refundMoney"
            auto-complete="off"
            size="small"
            @keyup.native="bondMoney()"
          >
            <template slot="prepend">退</template>
            <template slot="append">元</template>
          </el-input>
          <el-input
            v-model.number="repayMoney"
            auto-complete="off"
            size="small"
            @keyup.native="bondMoney()"
          >
            <template slot="prepend">还</template>
            <template slot="append">元</template>
          </el-input>
        </div>
        <div class="bid-subtotal">
          <span>投标保证金小计：</span>
          {{subTotal}}元 &nbsp;&nbsp;&nbsp; {{upperTotal}}
        </div>
        <el-form-item label="备注：" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2}"
            v-model="chargeForm.remark"
            placeholder="备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="probox-mt">
        <charge-record :chargeList.sync="chargeList"></charge-record>
      </div>
    </div>
  </div>
</template>

<script>
import chargeRecord from "./chargeRecordItem"; //投标收款记录
export default {
  name: "chargeSituation",
  components: { chargeRecord },
  props: { chargeForm: Object, chargeList: Array },
  data() {
    return {
      openShow: false,
      closeShow: true,
      chargeTitle: "",
      isType: "",
      isRead: false,
      chargeFormVisible: false,
      closeUp: true,
      collectMoney: "", //收
      payMoney: "", //付
      refundMoney: "", //退
      repayMoney: "", //还
      subTotal: "", //投标保证金小计
      upperTotal: "", //投标保证金大写
      tenderChargeTotal: "" //投标收费小计
    };
  },
  created() {},
  watch: {
    chargeForm: function(newValue, oldValue) {
      this.$emit("update:chargeForm", newValue);
    },
    chargeList: function(newValue, oldValue) {
      this.$emit("update:chargeList", newValue);
    }
  },
  methods: {
    bondMoney() {
      var total = this.collectMoney - this.payMoney + this.refundMoney - this.repayMoney;
      this.subTotal = total.toFixed(2)
      this.smalltoBIG(this.subTotal);
    },
    // 人民币转大写
    smalltoBIG(n) {
      var fraction = ["角", "分"];
      var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
      var head = n < 0 ? "负" : "";
      n = Math.abs(n);
      var s = "";
      for (var i = 0; i < fraction.length; i++) {
        s += (
          digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, "");
      }
      s = s || "整";
      n = Math.floor(n);

      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = "";
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
      }
      this.upperTotal =head + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");
    },
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
        width: 126px;
        text-align: right;
        padding-right: 12px;
      }
    }
    .number {
      display: flex;
      margin-bottom: 12px;
      .t0 {
        width: 126px;
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
.sigle-ww {
  width: 444px;
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
