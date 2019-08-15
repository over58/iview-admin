export default [
  {
    path: "home",
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
    component: () => import("../views/filereader/FileReader.vue"),
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
      icon: "wenjian"
    },
    component: () => import("../views/excel/index.vue"),
    children: [
      {
        path: "upload",
        name: "uploadExcel",
        meta: {
          label: "上传Excel",
          icon: "image"
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
      icon: "wenjian"
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
      }
    ]
  },
  {
    path: "css",
    name: "css",
    meta: {
      label: "CSS",
      icon: "wenjian"
    },
    component: () => import("../views/css/index.vue"),
    children: []
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
    path: "*",
    name: "404",
    meta: {
      label: "404",
      icon: "icon-test"
    },
    component: () => import("../views/404.vue")
  }
];
