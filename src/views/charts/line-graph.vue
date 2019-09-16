<template>
  <div>
    <div ref="chart" style="height:500px;border:solid 1px #dfdfdf"></div>
  </div>
</template>
<script>
import echarts from "echarts";
let graph = {
  nodes: [
    {
      x: "5",
      y: "5",
      name: "服务器",
      alarm: "产生告警了哦"
    },
    {
      x: "3",
      y: "0",
      name: "存储设备1"
    },
    {
      x: "7",
      y: "0",
      name: "存储设备2"
    },
    {
      x: "0",
      y: "10",
      name: "防火墙"
    },
    {
      x: "5",
      y: "10",
      name: "网络设备1",
      alarm: "产生告警了哦"
    },
    {
      x: "12",
      y: "12",
      name: "网络设备2"
    }
  ],
  edges: [
    {
      source: "存储设备2",
      target: "存储设备1",
      name: "数据传输",
      label: {
        normal: {
          show: true,
          formatter() {
            return this.name;
          }
        }
      },
      lineStyle: {
        normal: {
          color: "#12b5d0"
        }
      }
    },
    {
      source: "存储设备1",
      target: "服务器",
      name: "数据传输",
      label: {
        normal: {
          show: true,
          formatter() {
            return this.name;
          }
        }
      },
      lineStyle: {
        normal: {
          color: "#12b5d0"
        }
      }
    },
    {
      source: "服务器",
      target: "防火墙",
      name: "访问",
      label: {
        normal: {
          show: true,
          formatter() {
            return this.name;
          }
        }
      },
      lineStyle: {
        normal: {
          color: "#12b5d0"
        }
      }
    },
    {
      source: "防火墙",
      target: "网络设备1",
      name: "访问",
      label: {
        normal: {
          show: true,
          formatter() {
            return this.name;
          }
        }
      },
      lineStyle: {
        normal: {
          color: "#12b5d0"
        }
      }
    },
    {
      source: "网络设备1",
      target: "网络设备2",
      name: "访问",
      label: {
        normal: {
          show: true,
          formatter() {
            return this.name;
          }
        }
      },
      lineStyle: {
        normal: {
          color: "#12b5d0"
        }
      }
    }
  ]
};

let vm = null;
export default {
  components: {},
  data() {
    return {
      charts: {
        nodes: graph.nodes,
        edges: graph.edges,
        linesData: []
      },
      nodePositionMap: new Map(),
      chartInstance: null
    };
  },
  computed: {},
  methods: {
    initData() {
      this.charts.nodes = this.charts.nodes.map(node => {
        this.nodePositionMap.set(node.name, [node.x, node.y]);
        return {
          name: node.name,
          value: [node.x, node.y],
          symbolSize: 20,
          alarm: node.alarm,
          // symbol: 'image:///asset/get/s/' + node.img,
          itemStyle: {
            normal: {
              color: "#12b5d0"
            }
          }
        };
      });

      this.charts.linesData = [];

      this.charts.edges = this.charts.edges.map(edge => {
        this.charts.linesData.push([
          {
            coord: this.nodePositionMap.get(edge.source)
          },
          {
            coord: this.nodePositionMap.get(edge.target)
          }
        ]);
        return {
          source: edge.source,
          target: edge.target,
          label: {
            normal: {
              show: true
              // formatter: edge.nam
            }
          },
          lineStyle: {
            normal: {
              // color: edge.data.colour
            }
          }
        };
      });
    },
    init() {
      this.initData();
      let option = {
        title: {
          text: "网络拓扑图"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}",
          alwaysShowContent: true
        },
        backgroundColor: "#F5F5F5",
        xAxis: {
          min: 0,
          max: 20,
          show: true,
          type: "value"
        },
        yAxis: {
          min: 0,
          max: 20,
          show: true,
          type: "value"
        },
        series: [
          {
            type: "graph",
            layout: "none",
            id: "a",
            coordinateSystem: "cartesian2d",
            edgeSymbol: ["none", "arrow"],
            // symbolSize: 50,
            label: {
              normal: {
                show: true,
                position: "bottom",
                color: "#12b5d0"
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: "none"
              }
            },
            xAxis: {
              min: 0,
              max: 12,
              show: false,
              type: "value"
            },
            yAxis: {
              min: 0,
              max: 12,
              show: false,
              type: "value"
            },
            // edgeSymbolSize: 8,
            draggable: true,
            nodes: this.charts.nodes,
            edges: this.charts.edges,
            z: 4,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function(item) {
                    return item.data.name;
                  }
                }
              }
            }
          },
          {
            name: "A",
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 4,
            effect: {
              show: true,
              trailLength: 0,
              symbol: "arrow",
              color: "#12b5d0",
              symbolSize: 8
            },
            lineStyle: {
              normal: {
                curveness: 0
              }
            },
            data: this.charts.linesData
          }
        ]
      };
      this.chartInstance = echarts.init(this.$refs.chart);
      this.chartInstance.setOption(option);
    }
  },
  mounted() {
    vm = this;
    this.$nextTick(() => {
      this.init();
    });
    window.addEventListener("resize", () => {
      vm.chartInstance && this.chartInstance.resize();
    });
  }
};
</script>
<style scoped></style>
