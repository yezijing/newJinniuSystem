<template>
  <div>
    <div class="departbox">
      <div class="dtitle">
        <span>牵头单位信息</span>
        <div class="btns">
          <a @click="addDeptlist" href="javascript:;">
            <img :src="addUrl" alt />
          </a>
          <a @click="delDeptlist" href="javascript:;">
            <img :src="jianUrl" alt />
          </a>
        </div>
      </div>
      <el-table
        border
        :data="deptlistData"
        style="width: 100%"
        size="small"
        height="300px"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="name" label="牵头单位">
          <template slot-scope="scope">
            <el-cascader
              v-model="scope.row.name"
              size="mini"
              :show-all-levels="false"
              @change="handleChange"
              :options="options"
              :props="{ checkStrictly: true, label:'name', value:'id' }"
              clearable
            ></el-cascader>
          </template>
        </el-table-column>
        <el-table-column prop="leader" label="责任领导"></el-table-column>
        <el-table-column prop="leaderPhone" label="联系方式"></el-table-column>
        <el-table-column prop="charge" label="经办人">
          <template slot-scope="scope">
            <el-select v-model="scope.row.charge" size="mini">
              <el-option
                v-for="item in chargelist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="chargePhone" label="联系方式"></el-table-column>
        <el-table-column prop="duty" label="工作职责">
          <template slot-scope="scope">
            <el-input
              size="mini"
              type="textarea"
              :autosize="{ minRows: 1}"
              v-model="scope.row.duty"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "departmentlist",
  components: {},
  props: ["deptlistData"],
  data() {
    return {
      addUrl: require("../../assets/add.png"),
      jianUrl: require("../../assets/jian.png"),
      currentRow: null,
      //   经办人
      chargelist: [],
      options: [
        {
          id: "zhinan",
          name: "金牛区政府",
          children: [
            {
              id: "shejiyuanze",
              name: "目督办",
              children: [
                {
                  id: "yizhi",
                  name: "督查部门"
                },
                {
                  id: "fankui",
                  name: "工程部"
                }
              ]
            },
            {
              id: "daohang",
              name: "街道办",
              children: [
                {
                  id: "cexiangdaohang",
                  name: "侧向导航"
                },
                {
                  id: "dingbudaohang",
                  name: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          id: "zujian",
          name: "成华区政府",
          children: [
            {
              id: "basic",
              name: "Basic",
              children: [
                {
                  id: "layout",
                  name: "Layout 布局"
                },
                {
                  id: "color",
                  name: "Color 色彩"
                },
                {
                  id: "typography",
                  name: "Typography 字体"
                },
                {
                  id: "icon",
                  name: "Icon 图标"
                },
                {
                  id: "button",
                  name: "Button 按钮"
                }
              ]
            },
            {
              id: "form",
              name: "Form",
              children: [
                {
                  id: "radio",
                  name: "Radio 单选框"
                },
                {
                  id: "checkbox",
                  name: "Checkbox 多选框"
                },
                {
                  id: "input",
                  name: "Input 输入框"
                },
                {
                  id: "input-number",
                  name: "InputNumber 计数器"
                },
                {
                  id: "select",
                  name: "Select 选择器"
                },
                {
                  id: "cascader",
                  name: "Cascader 级联选择器"
                },
                {
                  id: "switch",
                  name: "Switch 开关"
                },
                {
                  id: "slider",
                  name: "Slider 滑块"
                },
                {
                  id: "time-picker",
                  name: "TimePicker 时间选择器"
                },
                {
                  id: "date-picker",
                  name: "DatePicker 日期选择器"
                },
                {
                  id: "datetime-picker",
                  name: "DateTimePicker 日期时间选择器"
                },
                {
                  id: "upload",
                  name: "Upload 上传"
                },
                {
                  id: "rate",
                  name: "Rate 评分"
                },
                {
                  id: "form",
                  name: "Form 表单"
                }
              ]
            },
            {
              id: "data",
              name: "Data",
              children: [
                {
                  id: "table",
                  name: "Table 表格"
                },
                {
                  id: "tag",
                  name: "Tag 标签"
                },
                {
                  id: "progress",
                  name: "Progress 进度条"
                },
                {
                  id: "tree",
                  name: "Tree 树形控件"
                },
                {
                  id: "pagination",
                  name: "Pagination 分页"
                },
                {
                  id: "badge",
                  name: "Badge 标记"
                }
              ]
            },
            {
              id: "notice",
              name: "Notice",
              children: [
                {
                  id: "alert",
                  name: "Alert 警告"
                },
                {
                  id: "loading",
                  name: "Loading 加载"
                },
                {
                  id: "message",
                  name: "Message 消息提示"
                },
                {
                  id: "message-box",
                  name: "MessageBox 弹框"
                },
                {
                  id: "notification",
                  name: "Notification 通知"
                }
              ]
            },
            {
              id: "navigation",
              name: "Navigation",
              children: [
                {
                  id: "menu",
                  name: "NavMenu 导航菜单"
                },
                {
                  id: "tabs",
                  name: "Tabs 标签页"
                },
                {
                  id: "breadcrumb",
                  name: "Breadcrumb 面包屑"
                },
                {
                  id: "dropdown",
                  name: "Dropdown 下拉菜单"
                },
                {
                  id: "steps",
                  name: "Steps 步骤条"
                }
              ]
            },
            {
              id: "others",
              name: "Others",
              children: [
                {
                  id: "dialog",
                  name: "Dialog 对话框"
                },
                {
                  id: "tooltip",
                  name: "Tooltip 文字提示"
                },
                {
                  id: "popover",
                  name: "Popover 弹出框"
                },
                {
                  id: "card",
                  name: "Card 卡片"
                },
                {
                  id: "carousel",
                  name: "Carousel 走马灯"
                },
                {
                  id: "collapse",
                  name: "Collapse 折叠面板"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {},
  watch: {
    deptlistData: function(newValue, oldValue) {
      this.$emit("update:deptlistData", newValue);
    }
  },
  methods: {
    // 新增牵头单位
    addDeptlist() {
      var obj = {
        name: "",
        leader: "",
        leaderPhone: "",
        charge: "",
        chargePhone: "",
        duty: ""
      };
      this.deptlistData.push(obj);
    },
    handleChange(value) {
      console.log(value);
    },
    // 删除牵头单位
    delDeptlist() {
        console.log(this.currentRow)
    },
    // 选中某一列
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    selectChange() {
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.departbox {
  border: 1px solid #ccc;
}
</style>
