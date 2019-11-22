const blackRecord = [
  'login',
  'logout',
  '404'
]
const ctx = require.context('../views', true, /\.vue$/)
let routes = {}

//过滤掉黑名单中的路由
let data = ctx.keys().filter(item => {
  let dirs = item.split("/").filter(x => x !== ".");
  let key = dirs[0].replace(/(\.vue$)/, "").toLowerCase();
  return !blackRecord.includes(key) && dirs.length <= 2;
})

// 处理有两层菜单的父级路由和一层的路由
data.filter(item => {
    let dirs = item.split("/").filter(x => x !== ".");
    if (dirs.length >= 2) {
      return (
        "index" === dirs[1].replace(/(\.vue$)/, "").toLowerCase()
      );
    }
    return true;
  })
  .forEach(item => {
    let dirs = item.split("/").filter(x => x !== ".");
    let level_1 = dirs[0].replace(/(\.vue$)/, "").toLowerCase();
    routes[level_1] = {
      path: level_1,
      name: level_1,
      component: ctx(item).default || ctx(item),
      meta: {
        icon: "",
        label: level_1
      },
      children: []
    };
  });

// 处理二层路由
data.filter(item => {
  let dirs = item.split("/").filter(x => x !== ".");
  if (dirs.length >= 2) {
    return (
      "index" !== dirs[1].replace(/(\.vue$)/, "").toLowerCase()
    );
  }
  return false
}).forEach(item => {
  let dirs = item.split("/").filter(x => x !== ".");
  let level_1 = dirs[0].replace(/(\.vue$)/, "").toLowerCase();
  let level_2 = dirs[1].replace(/(\.vue$)/, "").toLowerCase();
  routes[level_1].children.push({
    path: level_2,
    name: level_2,
    component: ctx(item).default || ctx(item),
    meta: {
      icon: "",
      label: level_2
    },
    children: []
  });
})
export default Object.values(routes)
