module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  globals: {
    Vue: true
  },
  rules: {
    "no-console": 0,
    "no-debugger": 0,
    "vue/no-use-v-if-with-v-for": 0,
    "vue/no-v-html": 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]


  },
  parserOptions: {
    parser: "babel-eslint"
  }
};