<template>
  <div class="chart">
    <Row :gutter="10">
      <Col :sm="12" :xs="24">
        <chart-line
          :data="mockData.pie.count_tendency"
          title="响应时间分布(simple)"
          type="spline"
        />
      </Col>
      <Col :sm="12" :xs="24">
        <chart-pie
          :data="mockData.pie.count"
          title="响应时间分布"
          type="spline"
        />
      </Col>
    </Row>

    <Row :gutter="10">
      <Col :sm="12" :xs="24">
        <chart-line
          :data="mockData.pie.count_tendency"
          title="响应时间分布(simple)"
          type="areaspline"
          :tooltip-format="format"
          simple
          @hook:created="listenChildComCreated"
        />
      </Col>
      <Col :sm="12" :xs="24">
        <!-- <chart-line
          type="spline"
          :data="mockData.pie.count_tendency"
          title="响应时间分布"
          :plot-line="{ text: '5000', value: 5000, align: 'right' }"
        >
          <span slot="operation">
            <Button>详情</Button>
            <Button>编辑</Button>
            <Button>其他</Button>
          </span>
        </chart-line> -->
      </Col>
    </Row>
  </div>
</template>

<script>
import mockData from "@/components/Highcharts/mock.js";
import ChartLine from "@/components/Highcharts/ChartLine";
import ChartPie from "@/components/Highcharts/ChartPie";

export default {
  name: "Chart",
  components: {
    ChartLine,
    ChartPie
  },
  data() {
    return {
      mockData: mockData
    };
  },
  methods: {
    format(ctx) {
      ctx.points.sort((a, b) => (a.y < b.y ? 1 : -1));
      let html = ctx.points.reduce((a, b) => {
        return `${a}<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${b.color};margin-right:5px;"></span>${b.series.name}: ${b.y}</div>`;
      }, "<div>");
      html += "</div>";
      return html;
    },
    listenChildComCreated() {
      console.log("-----测试父组件中监听子组件的生命周期钩子-----");
      console.log("子组件创建完成");
    }
  }
};
</script>

<style lang="less" scoped>
.chart {
  padding: 20px;
}
</style>
