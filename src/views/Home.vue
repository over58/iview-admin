<template>
  <div class="home">
    <Card dis-hover title="项目说明">
      <p>
        最近有意准备将之前工作中遇到的问题以及封装的组件整理出来，于是有了这个项目。后期还想要将想要将一些HTML、CSS、JS
        中的一些新的特性写一些测试在这上面。总之，这个项目更倾向于是个笔记本，一个前端大杂烩。
      </p>
    </Card>

    <Card
      dis-hover
      title="页面前端性能监控"
      v-if="monitor"
      style="margin-top:10px"
    >
      <div class="cell">
        <label><b>页面加载时间</b></label>
        <p>{{ monitor.getLoadComsume() }}</p>
      </div>
      <div class="cell">
        <label>
          <b>URL耗时情况</b>
          <i-switch v-model="showChart" :true-value="true" :false-value="false">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </label>

        <template v-if="showChart">
          <div ref="url_chart" class="chart">将要绘制图表</div>
        </template>
        <pre class="format-content" v-else>
          {{ monitor.geturlConsume() }}
        </pre>
      </div>
      <div class="cell">
        <label><b>超时的URL( >= 1000ms)</b></label>
        <pre class="format-content">{{ monitor.getTimeoutURL() }}</pre>
      </div>
    </Card>
  </div>
</template>

<script>
import Monitor from "com/monitor/Monitor";
// import Highcharts from "highcharts";

export default {
  name: "home",
  components: {},
  data() {
    return {
      monitor: null,
      showChart: false,
      urlConsumeData: []
    };
  },
  methods: {
    drawChart() {
      // Highcharts.chart(this.$refs.url_chart, {
      //   chart: {
      //     type: "bar"
      //   },
      //   xAxis: {
      //     categories: this.urlConsumeData.map(item => item.name),
      //     title: {
      //       text: "url"
      //     }
      //   },
      //   yAxis: {
      //     min: 0
      //   },
      //   series: this.urlConsumeData
      // });
    }
  },
  mounted() {
    this.monitor = new Monitor();
    let t = this.monitor.geturlConsume();
    this.urlConsumeData = Object.keys(t).map(key => {
      return {
        name: key,
        data: [t[key]]
      };
    });
    this.drawChart();
  }
};
</script>

<style lang="less" scoped>
.cell {
  display: flex;
  flex-direction: row;
  margin: 5px;
  > label {
    padding: 0 10px;
    line-height: 20px;
    width: 200px;
    flex-shrink: 0;
  }
  > p {
    flex: 1;
    line-height: 20px;
  }
  .format-content {
    margin: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: whitesmoke;
    padding: 5px;
    max-height: 300px;
    overflow: auto;
  }
}
.chart {
  margin: 5px;
  height: 300px;
  border: solid 1px #dfdfdf;
  width: 100%;
}
</style>
