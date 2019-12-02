<template>
  <div class="addcluebox">
    <el-form size="small" :model="dataForm" label-width="110px" ref="dataForm">
      <div class="flexbox">
        <el-form-item
          label="项目名称："
          prop="name"
          class="flexitem"
          :rules="[{ required: true, message: '请填写项目名称', trigger: 'change' }]"
        >
          <el-input v-model="dataForm.name" auto-complete="off" placeholder="请填写商机名称"></el-input>
        </el-form-item>
        <el-form-item label="行业：" prop="industry" class="flexitem">
          <el-input v-model="dataForm.industry" auto-complete="off" placeholder="请填写行业"></el-input>
        </el-form-item>
      </div>
      <div class="flexbox">
        <el-form-item
          label="区域："
          prop="frequence"
          class="flexitem"
          :rules="[{ required: true, message: '请填写区域', trigger: 'change' }]"
        >
          <el-input
            v-model="dataForm.frequence"
            auto-complete="off"
            placeholder="市、区"
            class="visitrate"
            @keyup.native="onlyNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="招标方式：" prop="way" class="select-block flexitem">
          <el-select v-model="dataForm.way" clearable placeholder="请选择招标方式" @change="selectChange">
            <el-option
              v-for="item in tenderWayList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flexbox">
        <el-form-item label="招标时间：" prop="remark" class="flexitem">
          <el-date-picker
            v-model="dataForm.tenderTime"
            type="date"
            @change="selectChange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择招标时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="交付时间：" prop="remark" class="flexitem">
          <el-date-picker
            v-model="dataForm.tenderTime"
            type="date"
            @change="selectChange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择交付时间"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div class="flexbox">
        <el-form-item
          label="项目负责人："
          prop="sort"
          class="select-block flexitem"
          :rules="[{ required: true, message: '请填写项目负责人', trigger: 'change' }]"
        >
          <el-select
            v-model="dataForm.sort"
            filterable
            clearable
            placeholder="请选择项目负责人"
            @change="selectChange"
          >
            <el-option
              v-for="item in sorts"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目资质：" prop="status" class="select-block flexitem">
          <el-select
            v-model="dataForm.status"
            filterable
            clearable
            allow-create
            placeholder="请选择项目资质"
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
      </div>
      <el-form-item label="备注：" prop="remark">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2}"
          v-model="dataForm.remark"
          placeholder="备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 设计单位 -->
    <div class="busbox">
      <company-info :infoList="disignList" :listTitle="atitle"></company-info>
    </div>
    <!-- 监理单位 -->
    <div class="busbox">
      <company-info :infoList="superviseList" :listTitle="ctitle"></company-info>
    </div>
    <!-- 总包单位 -->
    <div class="busbox">
      <company-info :infoList="workunitList" :listTitle="atitle"></company-info>
    </div>
    <!-- 合作单位 -->
    <div class="busbox">
      <company-info :infoList="cooperationList" :listTitle="ctitle"></company-info>
    </div>
    <!-- 招标代理公司 -->
    <div class="busbox">
      <agency-company :agencyForm.sync="agencyForm"></agency-company>
    </div>
    <!-- 招标小组 -->
    <div class="busbox">
      <tender-team :tenderTeamList.sync="tenderTeamList"></tender-team>
    </div>
    <div class="busbox">
      <upload-file></upload-file>
    </div>
  </div>
</template>

<script>
import companyInfo from "./companyInfoItem"; //单位列表
import agencyCompany from "./agencyCompanyItem"; //招标代理公司
import tenderTeam from "./tenderTeamItem";
import uploadFile from "./uploadFileItem";
export default {
  name: "addbusniess",
  components: { companyInfo, agencyCompany, tenderTeam, uploadFile },
  props: ["dataFormVisible", "dataForm"],
  data() {
    return {
      // 招标方式
      tenderWayList: [
        { value: 1, name: "公开招标" },
        { value: 2, name: "内部邀标" },
        { value: 3, name: "直接采购" }
      ],
      states: [],
      sorts: [],
      sourceList: [],
      // 设计单位
      disignList: [],
      //   监理单位
      superviseList: [],
      // 总包单位
      workunitList: [],
      // 合作单位
      cooperationList: [],
      tenderTeamList: [], //招标小组
      // 招标代理公司
      agencyForm: {},
      atitle: "设计单位",
      ctitle: "监理单位"
    };
  },
  created() {},
  watch: {
    dataFormVisible: function(newValue, oldValue) {
      this.$emit("update:dataFormVisible", newValue);
    },
    dataForm: function(newValue, oldValue) {
      this.$emit("update:dataForm", newValue);
    }
  },
  methods: {
    // 验证只能输入正整数
    onlyNumber() {
      this.dataForm.frequence = this.dataForm.frequence.replace(/[^\.\d]/g, "");
      this.dataForm.frequence = this.dataForm.frequence.replace(".", "");
    },
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.busbox {
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 15px;
}
</style>
