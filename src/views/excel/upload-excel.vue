<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <Table :data="tableData" :columns="tableHeader" border></Table>
  </div>
</template>

<script>
import UploadExcelComponent from "com/excel/UploadExcel.vue";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$Message.error("Please do not upload files larger than 1m in size.");
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header.map(item => {
        return {
          title: item,
          key: item
        };
      });
    }
  }
};
</script>
