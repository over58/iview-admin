<template>
  <div>
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div style="display:flex">
      <div style="width:300px">
        <div class="item">
          <b class="title">上传文件</b>
          <div class="content">
            {{ this.rawFile && this.rawFile.name }}
          </div>
        </div>
        <div class="item">
          <b class="title">上传进度</b>
          <div class="content">
            <Progress :percent="precent" style="width:160px" />
          </div>
        </div>
      </div>
      <div style="flex:1">
        <div
          class="drop"
          @drop="handleDrop"
          @dragover="handleDragover"
          @dragenter="handleDragover"
        >
          拖拽文件到这里
          <Button
            :loading="loading"
            style="margin-left:16px;"
            size="small"
            type="primary"
            @click="handleUpload"
          >
            <i class="iconfont icon-upload"></i>上传
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      rawFile: null,
      precent: 0
    };
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      this.rawFile = files[0]; // only use files[0]

      if (!this.isExcel()) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload();
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      this.rawFile = files[0]; // only use files[0]
      if (!this.rawFile) return;
      this.upload();
    },
    upload() {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData();
        return;
      }
      const before = this.beforeUpload(this.rawFile);
      if (before) {
        this.readerData();
      }
    },
    readerData() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        reader.onerror = err => {
          reject(err);
        };
        reader.onprogress = e => {
          this.precent = (e.loaded * 100) / e.total;
        };
        reader.readAsArrayBuffer(this.rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel() {
      return /\.(xlsx|xls|csv)$/.test(this.rawFile.name);
    }
  }
};
</script>

<style scoped lang="less">
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.item {
  padding: 10px 20px;
  overflow: hidden;
  .title {
    width: 100px;
    float: left;
  }
  .content {
    margin-left: 100px;
  }
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  // margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
