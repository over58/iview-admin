<template>
  <div>
    <filter-table :columns="columns" :data="data"></filter-table>
  </div>
</template>

<script>
import filterTable from "com/table/filter-table";
let Mock = require("mockjs");
let columns = [
  {
    type: "selection",
    width: 40
  },
  {
    title: "name",
    key: "name",
    filter: {
      type: "input",
      placeholder: "hello kitty"
    }
  },
  {
    title: "age",
    key: "age",
    filter: {
      type: "slider",
      placeholder: "hello kitty",
      min: 0,
      max: 100
    }
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
    filterTable
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

<style scoped lang="less"></style>
