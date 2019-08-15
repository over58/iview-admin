<template>
  <div class="container">
    <Row>
      <Col :span="18">
        <div id="cy" />
      </Col>
      <Col :span="6">
        <Card title="节点信息">
          <Form :model="node" :label-width="80">
            <Form-Item label="节点Id">
              {{ node.id }}
            </Form-Item>
            <Form-Item label="节点名称">
              {{ node.name }}
            </Form-Item>
            <Form-Item label="额外信息">
              节点的其他的信息
            </Form-Item>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import cytoscape from "cytoscape";
import edgehandles from "cytoscape-edgehandles";
import data from "./data.js";

// 提供类似于tooltip的提示框
import popper from "cytoscape-popper";
import tippy from "tippy.js";
//  使用插件
cytoscape.use(edgehandles);
cytoscape.use(popper);

//  可以使用自己选的配色
// const colors = ['#FFFFCC', '#CCFFFF', '#FFCCCC', '#FFFF99', '#CCCCFF', '#FF9966', '#FF6666', '#FFCC99', '#CCFF99', '#CCCCCC', '#CCFFCC', '#99CC99', '#99CCCC']
// const colors1 = ['#FF6666', '#006699', '#FF9966', '#0066CC', '#339933', '#FFCC33', '#FF9900', '#FFFFCC', '#CC6600', '#CCCC44', '#99CC33', '#0099CC', '#99CCCC', '#FF0033', '#333399', '#CCCC00', '#33CC99', '#FFFF00', '#336699']
// const colors2 = ['#CCFF99', '#99CCFF', '#99CCCC', '#CCFFCC', '#66CCCC', '#CCCCFF', '#FFFFCC', '#CCFFFF', '#66CCFF', '#6699CC']

let vm = null;
export default {
  components: {},
  props: {},
  data() {
    return {
      tippyInstance: null,
      node: {
        name: "",
        id: ""
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    vm = this;
  },
  mounted() {
    this.$nextTick(() => {
      this.draw();
    });
  },
  methods: {
    draw() {
      let nodes = data.nodes;
      let edges = data.edges;
      nodes = nodes.map(x => {
        // x.data.color = colors[i % 13]
        // x.data.color = colors1[i % 19]
        // x.data.color = colors2[i % 10];
        x.data.colour = "gray";
        x.data.lineStyle = "solid";
        return x;
      });
      edges = edges.map(x => {
        x.data.colour = "gray";
        x.data.lineStyle = "solid";
        return x;
      });
      const cy = cytoscape({
        container: document.getElementById("cy"),
        layout: {
          name: "breadthfirst",
          concentric: function(n) {
            return n.id() === "j" ? 200 : 0;
          },
          levelWidth: function() {
            return 100;
          },
          minNodeSpacing: 100,
          directed: true
        },

        style: [
          {
            selector: "node",
            style: {
              shape: "round-rectangle", // rectangle vee pentagon
              content: function(ele) {
                const data = ele.data();
                return `${data.name}`;
              },
              // 'width': 'mapData(size, 0, 1.0, 10, 40)',
              // 'height': 'mapData(size, 0, 1.0, 40, 60)'
              "text-valign": "center",
              "text-halign": "center",
              width: 100,
              height: 60
              // 'background-color': 'data(color)'
            }
          },

          {
            selector: "edge",
            style: {
              "curve-style": "straight",
              "target-arrow-shape": "triangle",
              // 'target-arrow-color': 'data(colour)',
              "line-color": "data(colour)",
              // 'width': 'mapData(width, 0, 1.0, 1, 3)',
              width: 0.8,
              // 'label': 'data(info)'
              "control-point-distances": [40, -40],
              "control-point-weights": [0.25, 0.75],
              "line-style": "data(lineStyle)"
            }
          },
          // some style for the extension

          {
            selector: ".eh-handle",
            style: {
              "background-color": "red",
              width: 12,
              height: 12,
              shape: "ellipse",
              "overlay-opacity": 0,
              "border-width": 12, // makes the handle easier to hit
              "border-opacity": 0
            }
          },

          {
            selector: ".eh-hover",
            style: {
              "background-color": "red"
            }
          },

          {
            selector: ".eh-source",
            style: {
              "border-width": 2,
              "border-color": "red"
            }
          },

          {
            selector: ".eh-target",
            style: {
              "border-width": 2,
              "border-color": "red"
            }
          },

          {
            selector: ".eh-preview, .eh-ghost-edge",
            style: {
              "background-color": "red",
              "line-color": "red",
              "target-arrow-color": "red",
              "source-arrow-color": "red"
            }
          },

          {
            selector: ".eh-ghost-edge.eh-preview-active",
            style: {
              opacity: 0
            }
          },
          {
            selector: ".edge-out-highlight",
            style: {
              "line-color": "black",
              "target-arrow-color": "black",
              width: 3
            }
          },
          {
            selector: ".edge-in-highlight",
            style: {
              "line-color": "purple",
              "target-arrow-color": "purple",
              width: 3
            }
          }
        ],

        elements: {
          nodes: nodes,
          edges: edges
        }
      });

      // edge添加事件
      // cy.on('tap', 'edge', function(evt) {
      //   var node = evt.target
      //   if (vm.tippyInstance) {
      //     vm.tippyInstance.hide()
      //     vm.tippyInstance.destroy()
      //   }
      //   vm.makeTippy(node)
      //   vm.tippyInstance.show()
      // })

      // node 添加事件
      // cy.on('tap', 'edge', function(evt) {
      //   var node = evt.target
      //   if (vm.tippyInstance) {
      //     vm.tippyInstance.hide()
      //     vm.tippyInstance.destroy()
      //   }
      //   vm.makeTippy(node)
      //   vm.tippyInstance.show()
      // })

      cy.on("tap", "node", function(evt) {
        var node = evt.target;
        // node.incomers('edge').toggleClass('edge-in-highlight')
        // node.edgesWith('*').toggleClass('edge-out-highlight')
        vm.node = node.data();
        console.log(node.data());
      });
    },
    makeTippy(node) {
      // 点击edge出现一个弹框，显示一些额外的信息
      this.tippyInstance = tippy(node.popperRef(), {
        content: function() {
          var div = document.createElement("div");
          div.innerHTML = `<p style="text-align:left;padding-top:8px;">${node._private.data.info}</p>`;
          return div;
        },
        trigger: "manual",
        arrow: true,
        placement: "bottom",
        hideOnClick: false,
        multiple: true,
        sticky: true
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 500px;
  padding: 10px;
}
#cy {
  height: 500px;
  border: solid 1px #aaa;
}
</style>
