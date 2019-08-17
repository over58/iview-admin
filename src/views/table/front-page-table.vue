<template>
  <div>
    <front-page-table
      batch
      :columns="columns"
      :data="data"
      @batch="handleBatchData"
    ></front-page-table>
    <Alert type="info" style="margin-top:5px;">下面展示选中的数据</Alert>
    <editor-json :data="selectedData"></editor-json>
  </div>
</template>

<script>
import frontPageTable from "com/table/front-page-table";
import editorJson from "com/editor/editor-json";
let Mock = require("mockjs");
let columns = [
  {
    type: "selection",
    width: 40
  },
  {
    title: "name",
    key: "name"
  },
  {
    title: "age",
    key: "age"
  },
  {
    title: "birthday",
    key: "birthday"
  },
  {
    title: "province",
    key: "province"
  },
  {
    title: "city",
    key: "city",
    hidden: true
  },
  {
    title: "email",
    key: "email"
  }
];
export default {
  components: {
    frontPageTable,
    editorJson
  },
  data() {
    return {
      columns: columns,
      data: [],
      selectedData: []
    };
  },
  computed: {},
  methods: {
    handleBatchData(data) {
      this.selectedData = data;
    },
    init() {
      this.data = Array.from({ length: 78 }).map(() => {
        return Mock.mock({
          "name|1-10": /[a-z][A-Z]/,
          "age|5-89": 70,
          "sex|": Mock.Random.name(),
          birthday: Mock.Random.date("yyyy-MM-dd"),
          province: Mock.Random.province(),
          city: Mock.Random.city(),
          email: Mock.Random.email()
        });
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style></style>
