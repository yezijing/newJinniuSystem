<template>
  <div class="list-wrap">
    <p class="title">
      上传原件（**个）
      <a class="morebtn" v-if="openShow" href="javascript:;" @click="openDown()">···</a>
      <a
        class="el-icon-arrow-down morebtn"
        v-if="closeShow"
        href="javascript:;"
        @click="closeDown()"
      ></a>
    </p>
    <div v-if="closeUp" class="wrapbox">
      <ul class="filelist">
        <li>
          <div class="tt">
            <a
              class="el-icon-arrow-right btn"
              v-if="unfoldShow"
              @click="unfoldList()"
              href="javascript:;"
            ></a>
            <a
              class="el-icon-arrow-down btn"
              v-if="foldShow"
              @click="foldList()"
              href="javascript:;"
            ></a>
            <span>邀标文件（**个）</span>
            <a class="addfile" href="javascript:;" @click="addFile()">上传</a>
          </div>
          <div class="flist" v-if="closeList">
            <div class="ww">
              <a class="name" href>文件名称文件名称</a>
              <div class="btns">
                <el-button>查看</el-button>
                <el-button>下载</el-button>
                <el-button>删除</el-button>
              </div>
            </div>
            <div class="ww">
              <a class="name" href>文件名称文件名称</a>
              <div class="btns">
                <el-button>查看</el-button>
                <el-button>下载</el-button>
                <el-button>删除</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "uploadFile",
  components: {},
  props: [],
  data() {
    return {
      unfoldShow: true,
      foldShow: false,
      openShow: false,
      closeShow: true,
      closeUp: true,
      closeList: false
    };
  },
  created() {},
  watch: {
    // partAlist: function(newValue, oldValue) {
    //   this.$emit("update:partAlist", newValue);
    // }
  },
  methods: {
    // 展开文件
    unfoldList() {
      this.unfoldShow = false;
      this.foldShow = true;
      this.closeList = true;
    },
    // 收回文件
    foldList() {
      this.unfoldShow = true;
      this.foldShow = false;
      this.closeList = false;
    },
    // 上传文件
    addFile() {},
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
}
.filelist {
  margin-top: 15px;
  li {
    margin-bottom: 20px;
    .tt {
      display: flex;
      position: relative;
      line-height: 20px;
      padding: 10px;
      .btn {
        display: inline-block;
        line-height: 20px;
        color: #999;
        width: 30px;
        font-size: 18px;
      }
      span {
        display: inline-block;
        margin-right: 15px;
        line-height: 20px;
        color: #666;
        font-size: 14px;
      }
      .addfile {
        position: absolute;
        right: 10px;
        top: 10px;
        line-height: 20px;
        color: #0099ff;
        font-size: 14px;
      }
      &:hover {
        background-color: #eee;
      }
    }
  }
  .on {
    .tt {
      background-color: #eee;
    }
  }
  .flist {
    .ww {
      margin-bottom: 8px;
      padding: 0px 10px 0px 36px;
      display: flex;
      justify-content: space-between;
      max-width: 70%;
      .name {
        color: #0099ff;
        font-size: 14px;
        display: block;
        line-height: 21px;
      }
      .btns {
        display: none;
        .el-button {
          padding: 0;
          border: 0;
          color: #0099ff;
          font-size: 12px;
          line-height: 20px;
        }
      }
      &:hover {
        .btns {
          display: block;
        }
      }
    }
  }
}
.wrapbox {
  margin-top: 15px;
}
</style>
