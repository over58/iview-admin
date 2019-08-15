<template>
  <div>
    <Table :columns="columns" :data="data" :height="500"></Table>
    <Modal
      v-model="editModalVis"
      @on-ok="submitEdit"
      @on-cancel="cancelEdit"
      :title="`编辑 (${editForm && editForm.name})`"
    >
      <Form
        v-if="editForm"
        ref="editForm"
        :model="editForm"
        :rules="editFormRules"
        label-position="right"
        :label-width="100"
      >
        <Form-item label="age" prop="age">
          <InputNumber v-model="editForm.age" :min="5" :max="78"></InputNumber>
        </Form-item>
        <Form-item label="province" prop="province">
          <Select v-model="editForm.province">
            <Option
              v-for="(item, index) in provinceList"
              :value="item"
              :key="index"
              >{{ item }}</Option
            >
          </Select>
        </Form-item>
        <Form-item label="email" prop="email">
          <Input v-model="editForm.email" placeholder="Enter something..." />
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
let Mock = require("mockjs");
let columns = [
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
    title: "email",
    key: "email"
  },
  {
    title: "操作",
    render(h, params) {
      return h("div", [
        h(
          "Button",
          {
            style: {
              margin: "0 1px"
            },
            props: {
              type: "primary",
              size: "small"
            },
            on: {
              click() {
                vm.openEdit(params.row);
              }
            }
          },
          "编辑"
        ),
        h(
          "Button",
          {
            style: {
              margin: "0 1px"
            },
            props: {
              type: "error",
              size: "small"
            },
            on: {
              click() {}
            }
          },
          "删除"
        )
      ]);
    }
  }
];
let vm = null;
export default {
  data() {
    return {
      data: [],
      columns: columns,
      editModalVis: false,
      editForm: null,
      editFormRules: {
        age: { type: "number", required: true, trigger: "blur" },
        birthday: { type: "string", required: true, trigger: "blur" },
        province: { type: "string", required: true, trigger: "change" },
        city: { type: "string", required: true, trigger: "change" }
      },
      provinceList: ["北京", "河北", "河南", "山东"]
    };
  },
  methods: {
    refresh() {
      this.init();
    },
    openEdit(row) {
      this.editModalVis = true;
      this.editForm = row;
    },
    submitEdit() {
      this.editModalVis = false;
    },
    cancelEdit() {
      this.editModalVis = false;
    },
    preDelete() {},
    init() {
      this.data = Array.from({ length: 78 }).map(() => {
        return Mock.mock({
          "name|1-10": /[a-z][A-Z]/,
          "age|5-89": 70,
          "sex|": Mock.Random.name(),
          birthday: Mock.Random.date("yyyy-MM-dd"),
          province: this.provinceList[Math.round(Math.random() * 3)],
          email: Mock.Random.email()
        });
      });
    }
  },
  created() {
    vm = this;
    this.init();
  }
};
</script>

<style></style>
