<template>
  <div>
    <end-page-table
      batch
      :columns="columns"
      :data="currentData"
      :page="page"
      :total="total"
      @on-page-change="handlePageChange"
      @on-page-size-change="handlePageSizeChange"
      @batch="handleBatchData"
    ></end-page-table>
    <Alert type="info" style="margin-top:5px;">下面展示选中的数据</Alert>
    <editor-json :data="selectedData"></editor-json>
  </div>
</template>

<script>
import endPageTable from "com/table/end-page-table";
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
    endPageTable,
    editorJson
  },
  data() {
    return {
      columns: columns,
      data: [],
      page: 1,
      pageSize: 10,
      selectedData: []
    };
  },
  computed: {
    // 模拟请求API
    currentData() {
      return this.data.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
    total() {
      return this.data.length;
    }
  },
  methods: {
    handlePageChange(page) {
      this.page = page;
    },
    handlePageSizeChange(page, pageSize) {
      this.page = page;
      this.pageSize = pageSize;
    },
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
