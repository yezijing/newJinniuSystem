<template>
  <div class="foot">
    <p>Copyright © 2019 联智科技.</p>
    <p>技术支持：成都联智汇软件有限公司</p>
  </div>
</template>

<script>
export default {
  name: "bottom",
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.foot {
  display: flex;
  justify-content: space-between;
  p {
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 12px;
    color: #999999;
  }
}
</style>
