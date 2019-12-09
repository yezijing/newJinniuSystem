<template>
  <div>
    <div class="charts" id="statecharts"></div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
require("echarts/theme/dark");
export default {
  name: "statuscharts",
  components: {},
  props: ["statedata"],
  data() {
    return {};
  },
  mounted: function() {
    this.drawCharts();
  },
  created() {},
  watch: {
    // persondata: function(newValue, oldValue) {
    //   this.$emit("update:persondata", newValue);
    // }
  },
  methods: {
    stateCharts() {
      let myChart = echarts.init(document.getElementById("statecharts"));
      myChart.setOption({
        textStyle: {
          fontSize: 20 // 调节字体大小
        },
        title: {
          text: "", // 主标题名称
          subtext: "", // 副标题名称
          x: "center" // 标题的位置
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>{a} : {c}个"
        },
        legend: {
          x: "center", // 标签的位置
          y: "bottom",
          textStyle: {
            color: "#333",
            fontSize: 12
          },
          data: [
            "待审核",
            "审核通过",
            "审核未通过",
          ]
        }, 
        calculable: true,
        color: ["#eaa28b", "#409EFF", "#f56c6c"], //自己设置扇形图颜色
        series: [
          {
            name: "状态分析", // 图表名称
            type: "pie", // 图表类型
            radius: [0, 100], // 图表内外半径大小
            center: ["50%", "50%"], // 图表位置
            selectedMode: 'single',
            selectedOffset: 30,
            clockwise: true,
            label: {
              normal: {
                show: true,
                formatter: "{b}{c}个" // 显示百分比
              }
            },
            data: this.statedata,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{c}次",
                  textStyle: {
                    fontSize: 12
                  }
                },
                //标线长度，宽度
                labelLine: {
                  show: true,
                  length: 10,
                  lineStyle: {
                    width: 1
                  }
                }
              }
            }
          }
        ]
      });
    },
    drawCharts() {
      this.stateCharts();
    }
  }
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 300px;
}
</style>
