<template>
  <div class="clueview">
    <div class="listwrap">
      <p class="title">
        潜在机会
        <span>3</span>
      </p>
      <div class="box" v-for="(item,index) in chanceData" :key="index">
        <div class="tt1">
          <div class="ww">
            <el-popover placement="bottom" width="150" v-model="chanceStateVisible" trigger="click">
              <div class="statelist">
                <a
                  v-for="(sitem, num) in states"
                  :class="item.status==num?'on':''"
                  :style="item.status==num?backgroundDiv:''"
                  :key="num"
                  href="javascript:;"
                  @click="changeChanceState"
                >{{sitem.name}}</a>
              </div>
              <a class="changebtn" href="javascript:;" slot="reference">
                <img :src="changeimg" alt />
              </a>
            </el-popover>
            <p @click="handleDetailClue(item.id)">{{item.projectname}}</p>
          </div>
          <a class="visitbtn" href="javascript:;" @click="handleVisitRecord">
            <img :src="visitimg" alt />
          </a>
        </div>
        <div class="tt2">
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="tt2">
          <span>下步工作计划</span>
          <span>{{item.plan}}</span>
        </div>
        <div class="tt3">
          <span>
            <i class="dot dot1">·</i>
            {{item.newtime}}
          </span>
          <span>
            <i class="dot dot2">·</i>
            {{item.nexttime}}
          </span>
        </div>
        <div class="tt4">
          <i class="dot dot3">·</i>
          {{item.salename}}
        </div>
      </div>
      <a class="addbtn" @click="addClueView" href="javascript:;">+</a>
    </div>
    <div class="listwrap">
      <p class="title">
        待跟进
        <span>3</span>
      </p>
      <div class="box box-red" v-for="(item,index) in followData" :key="index">
        <div class="tt1">
          <div class="ww">
            <el-popover placement="bottom" width="160" v-model="followStateVisible" trigger="click">
              <div class="statelist">
                <a
                  v-for="(sitem, num) in states"
                  :class="item.status==num?'on':''"
                  :style="item.status==num?backgroundDiv:''"
                  :key="num"
                  href="javascript:;"
                  @click="changeFollowState"
                >{{sitem.name}}</a>
              </div>
              <a class="changebtn" href="javascript:;" slot="reference">
                <img :src="changeimg" alt />
              </a>
            </el-popover>
            <p @click="handleDetailClue(item.id)">{{item.projectname}}</p>
          </div>
          <a class="visitbtn" href="javascript:;" @click="handleVisitRecord">
            <img :src="visitimg" alt />
          </a>
        </div>
        <div class="tt2">
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="tt2">
          <span>下步工作计划</span>
          <span>{{item.plan}}</span>
        </div>
        <div class="tt3">
          <span>
            <i class="dot dot1">·</i>
            {{item.newtime}}
          </span>
          <span>
            <i class="dot dot2">·</i>
            {{item.nexttime}}
          </span>
        </div>
        <div class="tt4">
          <i class="dot dot3">·</i>
          {{item.salename}}
        </div>
      </div>
      <a class="addbtn" @click="addClueView" href="javascript:;">+</a>
    </div>
    <div class="listwrap">
      <p class="title">
        赢单
        <span>3</span>
      </p>
      <div class="box box-purple" v-for="(item,index) in winOrderData" :key="index">
        <div class="tt1">
          <div class="ww">
            <el-popover placement="bottom" width="160" v-model="winStateVisible" trigger="click">
              <div class="statelist">
                <a
                  v-for="(sitem, num) in states"
                  :class="item.status==num?'on':''"
                  :style="item.status==num?backgroundDiv:''"
                  :key="num"
                  href="javascript:;"
                  @click="changeWinState"
                >{{sitem.name}}</a>
              </div>
              <a class="changebtn" href="javascript:;" slot="reference">
                <img :src="changeimg" alt />
              </a>
            </el-popover>
            <p @click="handleDetailClue(item.id)">{{item.projectname}}</p>
          </div>
          <a class="visitbtn" href="javascript:;" @click="handleVisitRecord">
            <img :src="visitimg" alt />
          </a>
        </div>
        <div class="tt2">
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="tt2">
          <span>下步工作计划</span>
          <span>{{item.plan}}</span>
        </div>
        <div class="tt3">
          <span>
            <i class="dot dot1">·</i>
            {{item.newtime}}
          </span>
          <span>
            <i class="dot dot2">·</i>
            {{item.nexttime}}
          </span>
        </div>
        <div class="tt4">
          <i class="dot dot3">·</i>
          {{item.salename}}
        </div>
      </div>
      <a class="addbtn" @click="addClueView" href="javascript:;">+</a>
    </div>
    <div class="listwrap">
      <p class="title">
        完结
        <span>3</span>
      </p>
      <div class="box box-orange" v-for="(item,index) in overData" :key="index">
        <div class="tt1">
          <div class="ww">
            <el-popover placement="bottom" width="160" v-model="overStateVisible" trigger="click">
              <div class="statelist">
                <a
                  v-for="(sitem, num) in states"
                  :class="item.status==num?'on':''"
                  :style="item.status==num?backgroundDiv:''"
                  :key="num"
                  href="javascript:;"
                  @click="changeOverState"
                >{{sitem.name}}</a>
              </div>
              <a class="changebtn" href="javascript:;" slot="reference">
                <img :src="changeimg" alt />
              </a>
            </el-popover>
            <p @click="handleDetailClue(item.id)">{{item.projectname}}</p>
          </div>
          <a class="visitbtn" href="javascript:;" @click="handleVisitRecord">
            <img :src="visitimg" alt />
          </a>
        </div>
        <div class="tt2">
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="tt2">
          <span>下步工作计划</span>
          <span>{{item.plan}}</span>
        </div>
        <div class="tt3">
          <span>
            <i class="dot dot1">·</i>
            {{item.newtime}}
          </span>
          <span>
            <i class="dot dot2">·</i>
            {{item.nexttime}}
          </span>
        </div>
        <div class="tt4">
          <i class="dot dot3">·</i>
          {{item.salename}}
        </div>
      </div>
      <a class="addbtn" @click="addClueView" href="javascript:;">+</a>
    </div>

    <!-- 新增拜访记录 -->
    <el-dialog title="添加拜访记录" :visible.sync="visitRecordVisible" width="800px" v-dialogDrag>
      <visit-record
        :visitRecordVisible="visitRecordVisible"
        :visitForm="visitForm"
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
import visitRecord from "./visitRecordItem"; //拜访记录
export default {
  name: "clueview",
  components: { visitRecord },
  props: [
    "followData",
    "chanceData",
    "winOrderData",
    "overData",
    "states",
    "clueid"
  ],
  data() {
    return {
      visitimg: "../../../static/images/plan.png",
      changeimg: "../../../static/images/xia2.png",
      visitRecordVisible: false,
      visitForm: {},
      chanceStateVisible: false,
      followStateVisible: false,
      winStateVisible: false,
      overStateVisible: false,
      backgroundDiv: {
        backgroundImage: "url(" + require("../../assets/gou.png") + ")"
      },
      newclueid: this.clueid
    };
  },
  created() {},
  watch: {
    followData: function(newValue, oldValue) {
      this.$emit("update:followData", newValue);
    },
    chanceData: function(newValue, oldValue) {
      this.$emit("update:chanceData", newValue);
    },
    winOrderData: function(newValue, oldValue) {
      this.$emit("update:winOrderData", newValue);
    },
    overData: function(newValue, oldValue) {
      this.$emit("update:overData", newValue);
    }
  },
  methods: {
    //   详情
    handleDetailClue(cid) {
      this.newclueid = cid;
      this.$emit("detailclue-event", cid);
    },
    //   添加商机
    addClueView() {
      this.$emit("addclue-event");
    },
    //   改变商机状态
    changeChanceState() {
      this.chanceStateVisible = false;
    },
    changeFollowState() {
      this.followStateVisible = false;
    },
    changeWinState() {
      this.winStateVisible = false;
    },
    changeOverState() {
      this.overStateVisible = false;
    },
    // 新增拜访记录
    handleVisitRecord(row, id) {
      this.visitRecordVisible = true;
    },
    // 新增拜访提交
    submitVisitRecord() {
      this.visitRecordVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.clueview {
  background: #e3e3e3;
  display: flex;
  padding: 15px 5px;
  min-height: 500px;
  .listwrap {
    flex-shrink: 0;
    box-sizing: border-box;
    width: 25%;
    padding: 0 10px;
    .title {
      color: #333;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 15px;
      span {
        display: inline-block;
        margin-left: 5px;
      }
    }
    .box {
      background: #fff;
      padding: 10px;
      margin-bottom: 15px;
      border-left: 2px solid #66cc99;
      .tt1 {
        margin-bottom: 5px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ww {
          display: flex;
          align-items: center;
          max-width: 80%;
          p {
            flex: 1;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
          }
          .changebtn {
            flex-shrink: 0;
            display: inline-block;
            vertical-align: middle;
            margin-right: 5px;
            img {
              width: 16px;
            }
          }
        }
        .visitbtn {
          display: block;
          flex-shrink: 0;
          margin-left: 20px;
          img {
            width: 18px;
            height: auto;
          }
        }
      }
      .tt2 {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          max-width: 50%;
          flex-shrink: 0;
        }
      }
      .tt3 {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        span {
          display: block;
          max-width: 50%;
          flex-shrink: 0;
        }
      }
      .tt4 {
        text-align: right;
        font-size: 14px;
      }
      .dot {
        color: #000;
        font-weight: bold;
        margin-right: 2px;
        display: inline-block;
        font-style: normal;
      }
      .dot1 {
        color: green;
      }
      .dot2 {
        color: #f00;
      }
      .dot3 {
        color: purple;
      }
    }
    .box-red {
      border-left: 2px solid #ff4f3e;
    }
    .box-purple {
      border-left: 2px solid #9999ff;
    }
    .box-orange {
      border-left: 2px solid #ffcc99;
    }
    .addbtn {
      background: #fff;
      text-align: center;
      font-weight: bold;
      height: 32px;
      line-height: 32px;
      font-size: 24px;
      color: #777;
      display: block;
    }
  }
}
</style>
