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
    path: "record",
    name: "record",
    meta: {
      label: "关于",
      icon: "record"
    },
    component: () => import("../views/Record")
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
          label: "Highcharts库的图表"
        },
        component: () => import("../views/charts/Highcharts.vue")
      },
      {
        path: "cytoscape",
        name: "cytoscape",
        meta: {
          label: "Cytoscape绘制的图表"
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
    path: "*",
    name: "404",
    meta: {
      label: "404",
      icon: "icon-test"
    },
    component: () => import("../views/404.vue")
  }
];
