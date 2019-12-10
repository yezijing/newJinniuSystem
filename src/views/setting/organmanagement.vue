<template>
  <div class="mainbox">
    <p class="navtitle">
      <span>组织机构</span>
    </p>
    <div class="listcontent">
      <div class="organwrap">
        <div class="left">
          <div class="btns">
            <el-button type="primary" size="mini">创建主分类</el-button>
            <el-button type="primary" size="mini">创建子类</el-button>
          </div>
          <div class="treelist">
            <el-tree
              :data="data"
              :props="defaultProps"
              highlight-current
              @node-click="handleNodeClick"
              accordion
              :render-content="renderContent"
            ></el-tree>
          </div>
        </div>
        <div class="right">
          <div class="frombox">
            <el-form size="medium" :model="dataForm" ref="dataForm" label-width="100px">
              <el-form-item label="所属分类" prop="sort">
                <el-select v-model="dataForm.sort" placeholder="选择分类">
                  <el-option
                    v-for="item in sortlist"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称" prop="name">
                <el-input v-model="dataForm.name" autocomplete="off" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="部门电话" prop="phone">
                <el-input v-model="dataForm.phone" autocomplete="off" placeholder="请输入部门电话"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="dataForm.remark"
                  placeholder="备注"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button size="mini" @click="resetForm('dataForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "organ",
  components: {},
  data() {
    return {
      dataForm: { sort: "根分类" },
      // 所属分类
      sortlist: [
        {
          value: 0,
          label: "根分类"
        },
        {
          value: 1,
          label: "金牛区"
        },
        {
          value: 2,
          label: "武侯区"
        },
        {
          value: 3,
          label: "锦江区"
        }
      ],
      data: [
        {
          label: "金牛区",
          icon: "el-icon-s-flag",
          children: [
            {
              label: "街道办",
              children: [
                {
                  label: "荷花池街道办"
                }
              ]
            }
          ]
        },
        {
          label: "武侯区",
          icon: "el-icon-s-flag",
          children: [
            {
              label: "行政部门",
              children: [
                {
                  label: "行政纪要"
                }
              ]
            },
            {
              label: "工程部",
              children: [
                {
                  label: "街区工程"
                }
              ]
            }
          ]
        },
        {
          label: "锦江区",
          icon: "el-icon-s-flag",
          children: [
            {
              label: "公安局",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "市政府办公厅",
              children: [
                {
                  label: "市城建委"
                },
                {
                  label: "市规划局"
                },
                {
                  label: "市房管局"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        icon: "el-icon-s-flag"
      }
    };
  },
  created() {},
  methods: {
    handleNodeClick(data) {
      this.dataForm.sort = data.label;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <i class={data.icon} style="color:#999;"></i>
          <span> {node.label}</span>
        </span>
      );
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.organwrap {
  margin-top: 20px;
  display: flex;
  align-items: stretch;
  .left {
    border: 1px solid #f2f2f2;
    padding: 30px;
    width: 500px;
    .btns {
      margin-bottom: 20px;
    }
  }
  .right {
    flex: 1;
    .frombox {
      padding: 0 40px;
      max-width: 700px;
      .el-input__inner {
        width: 300px;
      }
    }
  }
}
@media screen and (max-width: 1480px) {
  .organwrap {
    .left {
      width: 400px;
      padding: 20px;
    }
    .right {
      .frombox {
        padding: 0 30px;
      }
    }
  }
}
</style>
