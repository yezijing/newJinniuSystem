<template>
  <div ref="getwidth" class="wrapbox">
    <div class="addtop" :style="{ width: topwidth + 'px' }">
      <p class="location">
        <img :src="iconUrl" alt />
        <span>重点项目</span> -
        <span>创建</span>
      </p>
      <div class="btns">
        <el-button @click="goback" size="mini" type="info">返 回</el-button>
        <el-button size="mini" type="primary">提 交</el-button>
      </div>
    </div>
    <div class="topcut"></div>
    <div class="addcontent">
      <p class="addtitle">基本信息</p>
      <div class="basicinfo">
        <el-form label-width="110px" size="mini" ref="basicInfo" :model="basicInfo">
          <el-form-item
            label="项目名称："
            prop="name"
            :rules="[{ required: true, message: '请输入项目名称', trigger:'blur'}]"
          >
            <el-input placeholder="请输入项目名称" v-model="basicInfo.name"></el-input>
          </el-form-item>
          <div class="flexbox">
            <el-form-item
              label="牵头区领导："
              prop="arealeadids"
              class="flexitem"
              :rules="[{ required: true, message: '请选择牵头区领导', trigger:'blur'}]"
            >
              <el-select
                v-model="basicInfo.arealeadids"
                collapse-tags
                multiple
                filterable
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in leaderlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类别：" prop="category" class="flexitem">
              <el-radio @change="selectChange" v-model="basicInfo.category" label="0">一般项目</el-radio>
              <el-radio @change="selectChange" v-model="basicInfo.category" label="1">重点项目</el-radio>
            </el-form-item>
          </div>
          <div class="flexbox">
            <el-form-item label="所属街道：" prop="street" class="flexitem">
              <el-select
                v-model="basicInfo.street"
                filterable
                multiple
                collapse-tags
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in streetlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目业主：" prop="owndeptid" class="flexitem">
              <el-select v-model="basicInfo.owndeptid" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in ownerlist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flexbox">
            <el-form-item label="经纬度：" prop="mapitude" class="flexitem">
              <el-input placeholder="请输入" v-model="basicInfo.mapitude"></el-input>
            </el-form-item>
            <el-form-item label="项目地址：" prop="address" class="flexitem">
              <el-input placeholder="请输入" v-model="basicInfo.address"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="报送要求：" prop="submitres">
            <el-input
              type="textarea"
              placeholder="请输入"
              :autosize="{ minRows: 2}"
              v-model="basicInfo.submitres"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目描述：" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入"
              :autosize="{ minRows: 3}"
              v-model="basicInfo.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="目标任务：" prop="aimplan">
            <el-input
              type="textarea"
              placeholder="请输入"
              :autosize="{ minRows: 3}"
              v-model="basicInfo.aimplan"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <p class="addtitle">牵头单位</p>
      <div class="unitbox">
        <lead-department :deptlistData.sync="leadDeptList"></lead-department>
      </div>
      <p class="addtitle">责任单位</p>
      <div class="unitbox">
        <lead-department :deptlistData.sync="dutyDeptList"></lead-department>
      </div>
    </div>
  </div>
</template>

<script>
import leadDepartment from "../publicItem/leadDepartment";
export default {
  name: "addproject",
  components: { leadDepartment },
  props: ["leaderlist"],
  data() {
    return {
      // 牵头单位
      leadDeptList: [],
      // 责任单位
      dutyDeptList: [],
      topwidth: "200",
      iconUrl: require("../../assets/create.png"),
      // 基本信息
      basicInfo: {},
      // 项目业主
      ownerlist: [],
      // 街道
      streetlist: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.topwidth = this.$refs.getwidth.clientWidth;
    });
    this.selfAdaption();
  },
  created() {},
  watch: {
    // warnlist: function(newValue, oldValue) {
    //   this.$emit("update:warnlist", newValue);
    // }
  },
  methods: {
    selfAdaption() {
      const that = this;
      setTimeout(() => {
        window.onresize = function() {
          that.$nextTick(() => {
            that.topwidth = that.$refs.getwidth.clientWidth;
          });
        };
      }, 10);
    },
    //   返回
    goback() {
      this.$emit("goback-event");
    },
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
