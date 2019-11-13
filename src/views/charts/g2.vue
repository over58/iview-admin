<template>
  <div class="box" id="box" ref="container"></div>
</template>

<script>
import G2 from "@antv/g2";
import { DataSet } from "@antv/data-set";
import tipImage from "./images/tip@2x.png";
let vm = null;
export default {
  props: {
    pixelRatio: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      origin_data: [
        {
          item: "词汇量",
          standard: 70,
          my: 30
        },
        {
          item: "口语",
          standard: 60,
          my: 50
        },
        {
          item: "发音准确度",
          standard: 50,
          my: 0
        },
        {
          item: "听力",
          standard: 40,
          my: 20
        },
        {
          item: "学习积极性",
          standard: 60,
          my: 10
        }
      ],
      tipPosition: [
        {
          offsetX: -50,
          offsetY: -60
        },
        {
          offsetX: -30,
          offsetY: -50
        },
        {
          offsetX: 0,
          offsetY: -40
        },
        {
          offsetX: -100,
          offsetY: -30
        },
        {
          offsetX: -100,
          offsetY: -60
        }
      ]
    };
  },
  computed: {
    data() {
      return this.origin_data.map(x => {
        if (x.item.length >= 5) {
          x.item = `${x.item}\n(${x.my || "无数据"})  `;
        } else {
          x.item = `${x.item}(${x.my || "无数据"})`;
        }
        return x;
      });
    }
  },
  mounted() {
    vm = this;
    this.init();
  },
  methods: {
    init() {
      var dv = new DataSet().createView().source(this.data);

      dv.transform({
        type: "fold",
        fields: ["standard", "my"], // 展开字段集
        key: "user", // key字段
        value: "score" // value字段
      });

      const chart = new G2.Chart({
        container: "box",
        forceFit: true,
        padding: [0, 0, 0, 0],
        pixelRatio: vm.pixelRatio
      });

      chart.source(dv, {
        standard: {
          alias: "同龄VIP用户"
        },
        my: {
          alias: "我的宝贝"
        },
        score: {
          min: 0,
          max: 100
        }
      });

      // 指定坐标系
      chart.coord("polar", {
        radius: 0.5
      });

      chart.axis("item", {
        field: null,
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: true
        }
      });

      chart.axis("score", {
        line: null,
        tickLine: null,
        grid: {
          type: "polygon",
          lineStyle: {
            lineDash: null
          }
        },
        label: null
      });

      chart.legend("user", {
        marker: "square",
        offset: 10
      });

      chart
        .line()
        .position("item*score")
        .color("user")
        .size(1);

      chart
        .point()
        .position("item*score")
        .color("user*score", function(serie, score) {
          if (serie === "my" && score < 60) {
            return "red";
          } else {
            return "transparent";
          }
        })
        .shape("circle")
        .size("user*score*item", function(serie, score) {
          if (serie === "my" && score < 60) {
            return 6;
          } else {
            return 1;
          }
        })
        .style({
          stroke: "#fff",
          lineWidth: 1,
          fillOpacity: 1
        });

      chart
        .area()
        .position("item*score")
        .color("user", function(val) {
          if (val === "standard") {
            return "#79E9FF";
          } else {
            return "#F7B500";
          }
        });

      let minIndex = -1
      let min = 150
      this.data.forEach((item, index) => {
        if (min > item.my) {
          min = item.my
          minIndex = index
        }
      })

      if (minIndex !== -1) {
        chart.guide().image({
          start: [vm.data[minIndex].item, 100],
          width: 100,
          offsetY: vm.tipPosition[minIndex].offsetY,
          offsetX: vm.tipPosition[minIndex].offsetX,
          src: improveImage
        })
      }

      this.data
        .filter(item => !item.my)
        .forEach(i => {
          if (i.item.includes('发音准确度')) {
            chart.guide().html({
              position: [i.item, 100],
              html: `<a style="font-size:12px;color:#32D1FF" href="http://www.baidu.com">跳转链接</a>`,
              alignX: 'center',
              alignY: 'bottom',
              offsetX: 10,
              offsetY: 45,
              forceFit: true
            })
          }
        })

      // 禁止显示提示框
      chart.tooltip(false)
      chart.render()

    }
  }
};
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  width: 100%;
  font-size: 0.6rem;
}
</style>
