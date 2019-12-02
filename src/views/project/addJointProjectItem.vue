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
          <el-input v-model="dataForm.industry" auto-complete="off" placeholder="请输入行业"></el-input>
        </el-form-item>
      </div>
      <div class="flexbox">
        <el-form-item label="合作方式：" prop="sort" class="select-block flexitem">
          <el-select
            v-model="dataForm.sort"
            filterable
            clearable
            allow-create
            placeholder="请选择合作方式"
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
            placeholder="请选择项目所使用的资质"
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
        <el-form-item
          label="项目对接人："
          prop="source"
          class="select-block flexitem"
          :rules="[{ required: true, message: '请选择项目合作对接人', trigger: 'change' }]"
        >
          <el-select
            v-model="dataForm.source"
            filterable
            clearable
            allow-create
            placeholder="请选择项目合作对接人"
            @change="selectChange"
          >
            <el-option
              v-for="item in sourceList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item
        label="招标方式："
        prop="tenderWay"
        class="sigle-ww"
        :rules="[{ required: true, message: '请选择招标方式', trigger: 'change' }]"
      >
        <el-select
          v-model="dataForm.tenderWay"
          filterable
          clearable
          placeholder="请选择招标方式"
          @change="selectChange"
        >
          <el-option
            v-for="item in tenderWayList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="备注：" prop="remark">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2}"
          v-model="dataForm.remark"
          placeholder="备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 项目甲方情况 -->
    <div class="probox">
      <datainfo-list :infoList="partAlist" :listTitle="atitle"></datainfo-list>
    </div>
    <!-- 项目合作情况 -->
    <div class="probox">
      <datainfo-list :infoList="projectWorklist" :listTitle="ctitle"></datainfo-list>
    </div>
    <!-- 项目投标收费情况 -->
    <div class="probox">
      <charge-situation :chargeForm.sync="chargeForm" :chargeList.sync="chargeList"></charge-situation>
    </div>
    <!-- 项目管理 -->
    <div class="probox">
      <project-manage :projectForm.sync="projectForm"></project-manage>
    </div>
  </div>
</template>

<script>
import datainfoList from "./datainfoListItem"; //情况列表
import chargeSituation from "./chargeSituationItem"; //投标收费情况
import projectManage from "./projectManageItem"; //项目管理
export default {
  name: "addbusniess",
  components: { datainfoList, chargeSituation, projectManage },
  props: ["dataFormVisible", "dataForm"],
  data() {
    return {
      // 项目管理
      projectForm: {},
      chargeList: [], //投标收款记录
      // 招标方式
      tenderWayList: [
        { value: 1, name: "公开招标" },
        { value: 2, name: "内部邀标" },
        { value: 3, name: "直接采购" }
      ],
      states: [],
      sorts: [],
      sourceList: [],
      // 项目合作情况列表
      projectWorklist: [],
      //   项目甲方情况列表
      partAlist: [],
      atitle: "项目甲方情况",
      ctitle: "项目合作情况",
      // 收费情况
      chargeForm: {}
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
.probox {
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 15px;
}
.sigle-ww {
  width: 444px;
}
</style>
