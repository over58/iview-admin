<template>
  <Card dis-hover class="chart-item" style="margin-bottom:20px">
    <template v-if="!simple">
      <div slot="title" class="chart-item-title">
        {{ title }}
        <span style="float:right">
          <slot name="extra">
            <template v-if="unit">
              <span class="desc-title">单位</span> {{ unit }}
              <span class="vertital-divider">|</span>
            </template>
          </slot>
        </span>
      </div>
      <div class="chart-item-header">
        <slot name="operation" />
      </div>
    </template>

    <div ref="chart" class="chart-item-content" />
  </Card>
</template>

<script>
import Highcharts from "highcharts";
import HighchartsNoData from "highcharts/modules/no-data-to-display";
import HighchartsExporting from "highcharts/modules/exporting";

HighchartsNoData(Highcharts);
HighchartsExporting(Highcharts);

export default {
  name: "ChartItem",
  props: {
    simple: {
      type: Boolean,
      default: false
    },
    title: String, // 图表名字
    extra: Object, // 关于图表的一些其他信息
    data: {
      type: Array,
      required: true
    },
    unit: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  computed: {
    // resize () {
    //   return this.$store.state.common.resize
    // },
    option() {
      return {
        chart: {
          type: "pie"
        },
        title: {
          text: this.simple ? this.title : "",
          style: {
            fontWeight: "bold"
          }
        },
        credits: {
          text: "http://yongchao.tech:9000/",
          href: "http://yongchao.tech:9000/"
        },
        legend: {
          enabled: true,
          lineHeight: 20,
          maxHeight: 40
        },
        // 提示框
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.2f}%</b>"
        },
        // 数据点
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.2f} %"
            },
            showInLegend: true
          }
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: [
                "viewFullscreen",
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
                "downloadSVG"
              ]
            }
          },
          filename: this.title
        },
        series: [
          {
            data: this.innerData
          }
        ]
      };
    },
    innerData() {
      return this.data;
    }
  },
  watch: {
    // resize () {
    //   this.chartInstance && this.chartInstance.reflow()
    // }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.chartInstance && this.chartInstance.destroy();
    this.chartInstance = null;
  },
  methods: {
    init() {
      Highcharts.setOptions({
        global: {
          useUTC: true
        },
        lang: {
          loading: "加载中...",
          shortMonths: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          printChart: "打印图表",
          downloadJPEG: "导出jpeg",
          downloadPNG: "导出png",
          downloadSVG: "导出svg",
          downloadPDF: "导出pdf",
          noData: "暂无数据",
          contextButtonTitle: "导出",
          viewFullscreen: "全屏显示",
          viewData: "表格显示数据"
        }
      });
      Highcharts.chart(this.$refs.chart, this.option);
    }
  }
};
</script>

<style lang="less" scoped>
.chart-item {
  margin-bottom: 20px;
  &-title {
    font-weight: bold;
    height: 18px;
    line-height: 18px;
    .vertital-divider {
      margin: 0 5px;
      display: inline-block;
      width: 1px;
      vertical-align: middle;
      color: #e8eaec;
      box-sizing: border-box;
      background: #e8eaec;
    }
    .desc-title {
      color: #888;
    }
  }
  &-header {
    text-align: right;
  }
  &-content {
    height: 300px;
  }
  .simple {
    height: 346px;
  }
}
</style>
