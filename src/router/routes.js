export default [
  {
    path: "",
    name: "home",
    meta: {
      label: "首页",
      icon: "home"
    },
    component: () => import("../views/Home")
  },
  {
    path: "charts",
    name: "charts",
    meta: {
      label: "图表",
      icon: "Charts"
    },
    component: () => import("../views/charts/Charts.vue"),
    redirect: { name: "highcharts" },
    children: [
      {
        path: "highcharts",
        name: "highcharts",
        meta: {
          label: "Highcharts库的图表",
          icon: "Charts"
        },
        component: () => import("../views/charts/Highcharts.vue")
      },
      {
        path: "cytoscape",
        name: "cytoscape",
        meta: {
          label: "Cytoscape绘制的图表",
          icon: "Charts"
        },
        component: () => import("../views/charts/Cytoscape.vue")
      },
      {
        path: "d3-bar",
        name: "d3-bar",
        meta: {
          label: "d3-bar",
          icon: "Charts"
        },
        component: () => import("../views/charts/d3/bar.vue")
      },
      {
        path: "line-graph",
        name: "line-graph",
        meta: {
          label: "line-graph",
          icon: "Charts"
        },
        component: () => import("../views/charts/line-graph.vue")
      },
      {
        path: "g2",
        name: "g2",
        meta: {
          label: "g2",
          icon: "Charts"
        },
        component: () => import("../views/charts/g2.vue")
      }
    ]
  },
  {
    path: "filereader",
    name: "filereader",
    meta: {
      label: "FileReader",
      icon: "wenjian"
    },
    component: () => import("../views/filereader/index.vue"),
    children: [
      {
        path: "imagepreview",
        name: "imagepreview",
        meta: {
          label: "图片预览",
          icon: "image"
        },
        component: () => import("../views/filereader/ImagePreview.vue")
      }
    ]
  },
  {
    path: "excel",
    name: "excel",
    meta: {
      label: "Excel",
      icon: "excel"
    },
    component: () => import("../views/excel/index.vue"),
    children: [
      {
        path: "upload",
        name: "uploadExcel",
        meta: {
          label: "上传Excel",
          icon: "upload"
        },
        component: () => import("../views/excel/upload-excel.vue")
      }
    ]
  },
  {
    path: "components",
    name: "components",
    meta: {
      label: "组件",
      icon: "component"
    },
    component: () => import("../views/components/index.vue"),
    children: [
      {
        path: "codePreview",
        name: "codePreview",
        meta: {
          label: "代码预览",
          icon: "code"
        },
        component: () => import("../views/components/codePreview.vue")
      },
      {
        path: "countTo",
        name: "countTo",
        meta: {
          label: "数字",
          icon: "jiesuanguanli"
        },
        component: () => import("../views/components/countTo.vue")
      },
      {
        path: "json",
        name: "json",
        meta: {
          label: "JSON",
          icon: "jsongeshihua"
        },
        component: () => import("../views/components/editorJson.vue")
      },
      {
        path: "svg",
        name: "svg",
        meta: {
          label: "SVG",
          icon: "SVG"
        },
        component: () => import("../views/components/svg.vue")
      }
    ]
  },
  {
    path: "table",
    name: "table",
    meta: {
      label: "表格",
      icon: "table"
    },
    component: () => import("../views/table/index.vue"),
    children: [
      {
        path: "simple",
        name: "simple",
        meta: {
          label: "简单表格",
          icon: "table"
        },
        component: () => import("../views/table/simple.vue")
      },
      {
        path: "endPage",
        name: "endPage",
        meta: {
          label: "后端分页表格",
          icon: "table"
        },
        component: () => import("../views/table/end-page-table.vue")
      },
      {
        path: "frontPage",
        name: "frontPage",
        meta: {
          label: "前端分页表格",
          icon: "table"
        },
        component: () => import("../views/table/front-page-table.vue")
      }
    ]
  },
  {
    path: "css",
    name: "css",
    meta: {
      label: "CSS",
      icon: "css"
    },
    component: () => import("../views/css/index.vue"),
    children: [
      {
        path: "size",
        name: "size",
        meta: {
          label: "尺寸",
          icon: "size"
        },
        component: () => import("../views/css/size.vue")
      },
      {
        path: "canvas",
        name: "canvas",
        meta: {
          label: "画布",
          icon: "canvas"
        },
        component: () => import("../views/css/canvas.vue")
      }
    ]
  },
  {
    path: "js",
    name: "js",
    meta: {
      label: "JS",
      icon: "js"
    },
    component: () => import("../views/js/index.vue"),
    children: [
      {
        path: "throttle",
        name: "throttle",
        meta: {
          label: "节流防抖",
          icon: "hand_throttle"
        },
        component: () => import("../views/js/throttle.vue")
      }
    ]
  },
  {
    path: "drag",
    name: "drag",
    meta: {
      label: "拖拽",
      icon: "drag"
    },
    component: () => import("../views/drag/index.vue")
  },
  {
    path: "lazyload",
    name: "lazyload",
    meta: {
      label: "图片懒加载",
      icon: "lazyload"
    },
    component: () => import("../views/lazyload")
  },
  {
    path: "record",
    name: "record",
    meta: {
      label: "记录",
      icon: "record"
    },
    component: () => import("../views/Record")
  },
  {
    path: "other",
    name: "other",
    meta: {
      label: "测试",
      icon: "test"
    },
    component: () => import("../views/other"),
    children: [
      {
        path: "hashroute",
        name: "hashroute",
        meta: {
          label: "hash路由",
          icon: "route"
        },
        component: () => import("../views/other/hashroute.vue")
      },
      {
        path: "historyroute",
        name: "historyroute",
        meta: {
          label: "history路由",
          icon: "route"
        },
        component: () => import("../views/other/historyroute.vue")
      }
    ]
  },
  {
    path: "github",
    name: "github",
    meta: {
      label: "GitHub",
      icon: "git"
    },
    component: () => import("../views/Home")
  },
  {
    path: "*",
    name: "404",
    meta: {
      label: "404",
      icon: "icon-test"
    },
    component: () => import("../views/404.vue")
  }
];
