<template>
  <div class="addcluebox">
    <el-form size="small" :model="dataForm" label-width="142px" ref="dataForm">
      <el-form-item
        label="商机名称："
        prop="businessName"
        :rules="[{ required: true, message: '请填写商机名称', trigger: 'blur' }]"
      >
        <el-input v-model="dataForm.businessName" auto-complete="off" placeholder="请填写商机名称"></el-input>
      </el-form-item>
      <el-form-item
        label="项目地点："
        prop="adress"
        :rules="[{ required: true, message: '请填写项目地点', trigger: 'blur' }]"
      >
        <el-input v-model="dataForm.adress" auto-complete="off" placeholder="请填写项目地点"></el-input>
      </el-form-item>
      <div class="flexbox">
        <el-form-item
          label="商机分类："
          prop="categoryId"
          :rules="[{ required: true, message: '请选择商机分类', trigger: 'blur' }]"
          class="select-block flexitem"
        >
          <el-select
            v-model="dataForm.categoryId"
            filterable
            clearable
            placeholder="请选择商机分类"
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
        <el-form-item
          label="商机状态："
          prop="stateId"
          :rules="[{ required: true, message: '请选择商机状态', trigger: 'blur' }]"
          class="select-block flexitem"
        >
          <el-select
            v-model="dataForm.stateId"
            filterable
            clearable
            placeholder="请选择商机状态"
            @change="stateChange()"
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
        <el-form-item label="商机来源：" prop="sourceName" class="select-block flexitem">
          <el-select
            v-model="dataForm.sourceName"
            filterable
            clearable
            allow-create
            placeholder="请选择商机来源"
            @change="changeAddSource"
            @focus="getSourceAllList"
          >
            <el-option
              v-for="item in sourceList"
              :key="item.id"
              :label="item.sourceName"
              :value="item.sourceName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拜访频率：" prop="frequence" class="flexitem input-remark">
          <el-input
            v-model="dataForm.frequence"
            auto-complete="off"
            placeholder="请输入天数"
            class="visitrate"
            @keyup.native="onlyNumber"
          >
            <template slot="prepend">间隔</template>
            <template slot="append">天拜访</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="flexbox">
        <el-form-item label="项目预计开标时间：" prop="tenderTime" class="flexitem">
          <el-date-picker
            v-model="dataForm.tenderTime"
            type="datetime"
            @change="selectChange"
            placeholder="请选择预计开标时间"
            default-time="09:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="预计实现毛利：" prop="grossMargin" class="flexitem">
          <el-input v-model="dataForm.grossMargin" auto-complete="off" placeholder="请填写预计实现毛利">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="flexbox">
        <el-form-item label="预计中标金额：" prop="bidAmount" class="flexitem">
          <el-input v-model="dataForm.bidAmount" auto-complete="off" placeholder="请填写预计中标金额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="项目建模预算：" prop="modelBudget" class="flexitem">
          <el-input v-model="dataForm.modelBudget" auto-complete="off" placeholder="请填写项目建模预算">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="relatebox">
        <p class="tt">相关人：</p>
        <div class="relatelist">
          <el-tooltip
            effect="dark"
            placement="top-start"
            v-for="(item,index) in relatelist"
            :key="index"
          >
            <div style="min-width:200px;max-width:300px; line-height:2;" slot="content">
              <p style="font-size: 14px;font-weight: bold;">客户信息</p>
              <p>客户姓名：{{item.name}}</p>
              <p>年龄：{{item.age}}</p>
              <p v-if="item.gender=='1'">性别：男</p>
              <p v-else-if="item.gender=='2'">性别：女</p>
              <p v-else>性别：</p>
              <p>客户职位：{{item.job}}</p>
              <p>上级领导：{{item.leadership}}</p>
              <p>客户电话：{{item.phone}}</p>
              <p>客户角色：{{item.customerRole}}</p>
              <p>情况说明：{{item.explains}}</p>
            </div>
            <a class="item" href="javascript:;" :style="item.status==2?'display:none':''">
              <span @click="editRalate(index)">{{item.name}}</span>
              <img :src="closeimg" @click="delRelate(index)" alt />
            </a>
          </el-tooltip>
          <a class="addbtn" href="javascript:;" @click="addRelate">
            <img :src="addimg" alt />
          </a>
        </div>
      </div>
    </el-form>
    <!-- 添加相关人 -->
    <el-dialog
      :title="ralateTitle"
      :visible.sync="ratateVisible"
      width="700px"
      v-dialogDrag
      append-to-body
    >
      <el-form size="small" :model="ralateForm" label-width="100px" ref="ralateForm">
        <div class="flexbox">
          <el-form-item
            label="客户姓名："
            prop="name"
            class="flexitem"
            :rules="[{ required: true, message: '请填写客户姓名', trigger: 'change' }]"
          >
            <el-input v-model="ralateForm.name" auto-complete="off" placeholder="请填写客户姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄：" prop="age" class="flexitem">
            <el-input
              v-model="ralateForm.age"
              auto-complete="off"
              @keyup.native="ageNumber"
              placeholder="请填写客户年龄"
            ></el-input>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="客户电话：" prop="phone" class="flexitem">
            <el-input v-model="ralateForm.phone" auto-complete="off" placeholder="请填写客户电话"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender" class="flexitem">
            <el-radio-group v-model="ralateForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="flexbox">
          <el-form-item label="客户职位：" prop="job" class="flexitem">
            <el-input v-model="ralateForm.job" auto-complete="off" placeholder="请填写客户职位"></el-input>
          </el-form-item>
          <el-form-item label="上级领导：" prop="leadership" class="flexitem">
            <el-input v-model="ralateForm.leadership" auto-complete="off" placeholder="请填写客户上级领导"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="客户角色：" prop="role">
          <el-select
            v-model="role"
            clearable
            multiple
            collapse-tags
            placeholder="请选择客户在本项目的决策角色"
            @change="selectChange"
          >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="情况说明：" prop="explains">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2}"
            v-model="ralateForm.explains"
            auto-complete="off"
            placeholder="对该项目作用顿号、商务关系情况、项目跟进情况总结"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="ratateVisible=false">取消</el-button>
        <el-button size="small" type="primary" @click="submitRalateForm()">{{btnRalateWord}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSourceListData, addSourceData } from "../../api/clueApi";
export default {
  name: "addclue",
  components: {},
  props: [
    "dataFormVisible",
    "dataForm",
    "relatelist",
    "states",
    "sorts",
    "sourceList",
    "isType"
  ],
  data() {
    return {
      role: [],
      // 角色
      roleList: [
        { value: 1, name: "决策者" },
        { value: 2, name: "影响者" },
        { value: 3, name: "执行者" },
        { value: 4, name: "使用者" }
      ],
      addimg: "./static/images/add.png",
      closeimg: "./static/images/close.png",
      ratateVisible: false,
      ralateForm: {},
      ralateTitle: "",
      btnRalateWord: "",
      ralateType: 0, //1添加 2编辑
      index: 0
    };
  },
  created() {},
  watch: {
    dataFormVisible: function(newValue, oldValue) {
      this.$emit("update:dataFormVisible", newValue);
    },
    dataForm: function(newValue, oldValue) {
      this.$emit("update:dataForm", newValue);
    },
    relatelist: function(newValue, oldValue) {
      this.$emit("update:relatelist", newValue);
    },
    ratateVisible: function(newValue, oldValue) {
      this.$emit("update:ratateVisible", newValue);
    },
    sourceList: function(newValue, oldValue) {
      this.$emit("update:sourceList", newValue);
    }
  },
  methods: {
    // 商机状态改变，自动加上频率值
    stateChange() {
      this.$forceUpdate();
      this.dataForm.stateId;
      for (var i = 0; i < this.states.length; i++) {
        if (this.dataForm.stateId == this.states[i].id) {
          this.dataForm.frequence = this.states[i].frequence;
          break;
        }
      }
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
    // 新增商机来源
    changeAddSource() {
      this.$forceUpdate();
      let para = { sourceName: this.dataForm.sourceName };
      addSourceData(para, data => {
        
      });
    },
    // 验证只能输入正整数
    onlyNumber() {
      this.dataForm.frequence = this.dataForm.frequence.replace(/[^\.\d]/g, "");
      this.dataForm.frequence = this.dataForm.frequence.replace(".", "");
    },
    ageNumber() {
      this.ralateForm.age = this.ralateForm.age.replace(/[^\.\d]/g, "");
      this.ralateForm.age = this.ralateForm.age.replace(".", "");
    },
    // 添加相关人
    addRelate() {
      this.ratateVisible = true;
      this.ralateTitle = "添加相关人";
      this.btnRalateWord = "添加";
      this.ralateForm = {};
      this.ralateType = 1;
      this.role = [];
    },
    // 编辑
    editRalate(index) {
      this.index = index;
      this.ralateForm = Object.assign({}, this.relatelist[index]);
      if (this.relatelist[index].customerRole == "") {
        this.role = [];
      } else {
        this.role = this.relatelist[index].customerRole.split(",");
      }
      this.ralateTitle = "编辑相关人";
      this.btnRalateWord = "保存";
      this.ralateType = 2;
      this.ratateVisible = true;
    },
    // 删除相关人
    delRelate(index) {
      if (this.isType == "add") {
        this.relatelist.splice(index, 1);
      } else if (this.isType == "edit") {
        this.relatelist[index].status = 2;
      }
    },
    // 添加相关人提交
    submitRalateForm() {
      if (this.ralateType === 1) {
        var obj = Object.assign({}, this.ralateForm);
        obj.customerRole = this.role.join(",");
        obj.status = 1;
        this.relatelist.push(obj);
        this.ratateVisible = false;
      } else if (this.ralateType === 2) {
        var eobj = Object.assign({}, this.ralateForm);
        eobj.customerRole = this.role.join(",");
        this.relatelist.splice(this.index, 1, eobj);
        this.ratateVisible = false;
      }
    },
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
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
    .addbtn {
      display: inline-block;
      line-height: 32px;
      height: 32px;
      line-height: 32px;
      width: 32px;
      text-align: center;
      img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }
    .item {
      display: inline-block;
      position: relative;
      height: 32px;
      line-height: 32px;
      padding: 0 18px 0 8px;
      background-color: #eee;
      color: #333;
      margin-right: 10px;
      font-size: 12px;
      border-radius: 3px;
      img {
        position: absolute;
        right: 3px;
        top: 3px;
        width: 12px;
        height: 12px;
        z-index: 9;
      }
    }
  }
}
</style>
