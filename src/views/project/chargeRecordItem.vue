<template>
  <div class="list-wrap">
    <p class="title">
      投标收款记录（0笔）
      <a class="addbtn" href="javascript:;" @click="addInfoList">
        <span>+</span> 添加
      </a>
    </p>
    <div class="wrapbox">
      <ul class="list">
        <li v-for="(aitem,index) in chargeList" :key="index">
          <div class="txts">
            <p class="tt">{{aitem.sort}}</p>
            <p class="tt">{{aitem.price}}元</p>
            <p class="tt">{{aitem.time}}</p>
            <p class="tt">{{aitem.name}}</p>
          </div>
          <div class="btns">
            <el-button size="small" @click="infoEdit(index)">编辑</el-button>
            <el-button size="small" @click="infoDelete(index)">删除</el-button>
          </div>
        </li>
      </ul>
      <p class="totals">合计：元</p>
      <div class="tj">
          <span>回款进度比例：%</span>
          <span>剩余应收：元</span>
      </div>
    </div>

    <!-- 添加、编辑 -->
    <el-dialog :title="infoTitle" :visible.sync="infoFormVisible" width="640px" v-dialogDrag append-to-body >
      <el-form size="small" :model="infoForm" label-width="82px" ref="infoForm">
        <div class="flexbox">
          <el-form-item label="收款类别：" prop="sort" class="flexitem">
            <el-select
              v-model="infoForm.sort"
              clearable
              placeholder="请选择收款类别"
              @change="selectChange"
            >
              <el-option
                v-for="item in chargeSort"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收款时间：" prop="time" class="flexitem">
            <el-date-picker
              v-model="infoForm.time"
              type="date"
              @change="selectChange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择收款时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item
            label="收款："
            prop="price"
            class="flexitem"
          >
            <el-input
              :readonly="isRead"
              v-model="infoForm.price"
              auto-complete="off"
              placeholder="请填写收款"
              @keyup.native="receiptMoney"
            >
             <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="收款人：" prop="name" class="flexitem">
            <el-select
              v-model="infoForm.name"
              clearable
              placeholder="请选择收款人"
              @change="selectChange"
            >
              <el-option
                v-for="item in chargeSort"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="upprice">
            金额大写：{{upMoney}}
        </div>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="infoFormVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitInfoForm()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "chargeRecord",
  components: {},
  props: { chargeList: Array },
  data() {
    return {
      infoTitle: "",
      infoFormVisible: false,
      isType: "",
      isRead: false,
      infoForm: {},
      chargeSort: [
        { value: 1, name: "资质使用费" },
        { value: 2, name: "标书制作费" },
        { value: 3, name: "技术服务费" },
        { value: 4, name: "出现场费" }
      ],
      upMoney:'',  //金额大写
    };
  },
  created() {},
  watch: {
    chargeList: function(newValue, oldValue) {
      this.$emit("update:chargeList", newValue);
    }
  },
  methods: {
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
      this.upMoney =head + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");
    },
    receiptMoney(){
      var price = this.infoForm.price
      this.smalltoBIG(price)
    },
    selectChange() {
      this.$forceUpdate();
    },
    //   新增收款记录
    addInfoList() {
      this.infoTitle = "添加收款记录";
      this.infoFormVisible = true;
      this.isType = "add";
      this.isRead = false;
      this.infoForm = {};
    },
    // 详情
    infoDetail(index) {
      this.infoTitle = "收款记录详情";
      this.isRead = true;
      this.infoForm = Object.assign({}, this.chargeList[index]);
      this.infoFormVisible = true;
      this.isType = "detail";
    },
    // 编辑
    infoEdit(index) {
      this.infoTitle = "编辑收款记录";
      this.infoFormVisible = true;
      this.isType = "edit";
      this.isRead = false;
      this.infoForm = Object.assign({}, this.chargeList[index]);
    },
    // 删除
    infoDelete(index) {
      this.chargeList.splice(index, 1);
    },
    // 表单提交
    submitInfoForm() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if (this.isType == "add") {
            this.addInfoSubmit();
          } else if (this.isType == "edit") {
            this.editInfoSubmit();
          } else {
            this.infoFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    // 添加提交
    addInfoSubmit() {
      let obj = Object.assign({}, this.infoForm);
      this.chargeList.push(obj);
      this.infoFormVisible = false;
    },
    // 编辑提交
    editInfoSubmit(index) {
      let obj = Object.assign({}, this.infoForm);
      this.chargeList.splice(this.index, 1, obj);
      this.infoFormVisible = false;
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
    position: relative;
    .addbtn {
      position: absolute;
      right: 0;
      top: 0;
      line-height: 20px;
      color: #0099ff;
      font-size: 14px;
      span {
        font-weight: bold;
        display: inline-block;
        margin-right: 3px;
      }
    }
  }
  .wrapbox {
    margin-top: 15px;
    .totals{
        color: #f00;
        font-size: 14px;margin-bottom: 10px;
        padding: 0 15px;
        margin-top: 15px;
    }
    .tj{
        color: #f00;
        font-size: 14px;
        padding: 0 15px;
        span{
            display: inline-block;
            padding-right: 25px;
        }
        span+span{
            border-left: 1px solid #ccc;
        }
    }
  }
  .list {
    padding-right: 60px;
    margin-top: 10px;
    li {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      padding: 5px 10px;
      .txts {
        display: flex;
        width: 70%;
        p {
          color: #333;
          font-size: 12px;
          margin-right: 15px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 20px;
        }
        p + p {
          border-left: 1px solid #ccc;
          padding-left: 15px;
        }
        .tt{
            flex:1;
        }
      }
      .btns {
        opacity: 0;
        visibility: hidden;
        width: 110px;
        flex-shrink: 0;
        .el-button {
          border: 0;
          background: transparent;
          color: #0099ff;
          padding: 0;
        }
      }
      &:hover {
        background: #eee;
        .btns {
          opacity: 1;
          visibility: visible;
        }
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
.upprice{
    color: #f00;
    font-size: 14px;
}
</style>
