<template>
  <div class="front-page-table">
    <div class="head">
      <Input
        v-model="search"
        search
        enter-button
        style="float:left;width: 400px"
      >
        <Select
          v-model="ignoreCase"
          slot="prepend"
          transfer
          style="width: 120px"
        >
          <Option :value="1">忽略大小写敏感</Option>
          <Option :value="0">大小写敏感</Option>
        </Select>
      </Input>
      <div style="text-align:right">
        <Button @click="exportCsv">导出</Button>
        <Poptip
          style="float:right"
          transfer
          trigger="click"
          placement="bottom-end"
        >
          <Button>自定义列</Button>
          <div slot="content" style="max-height: 200px;overflow:auto">
            <Tag color="success" style="display:block;" @click.native="reset">
              点击选择所有列
            </Tag>
            <CheckboxGroup v-model="showColumnsKeys">
              <Checkbox
                v-for="item in columns"
                :key="item.key"
                :label="item.key"
                :style="{ display: item.type ? 'none' : 'block' }"
                :disabled="
                  showColumnsKeys.indexOf(item.key) > -1 &&
                    showColumnsKeys.length <= 1
                "
              >
                {{ item.title }}
              </Checkbox>
            </CheckboxGroup>
          </div>
        </Poptip>
      </div>
    </div>
    <Table
      ref="selection"
      :stripe="stripe"
      :columns="filterColumns"
      :data="currentPageData"
      :border="border"
      :size="size"
      :loading="loading"
      @on-selection-change="handleSelect"
    ></Table>
    <div class="footer">
      <template v-if="batch">
        <Button @click="handleSelectAll(true)" class="margin-sm">全选</Button>
        <Button @click="handleSelectAll(false)" class="margin-sm">
          取消全选
        </Button>
        <slot name="batch"> </slot>
        <span class="margin-sm">
          共选中
          <b style="color:#19be6b;padding:0 3px;">{{ selectedData.length }}</b>
          条数据
        </span>
      </template>
      <slot></slot>
      <Page
        :current.sync="current"
        :total="total"
        :page-size="pageSize"
        show-sizer
        style="float:right"
        @on-page-size-change="handlePageSizeChange"
      ></Page>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    border: Boolean,
    size: {
      type: String,
      default: "small"
    },
    loading: {
      type: Boolean,
      default: false
    },
    batch: Boolean,
    stripe: Boolean
  },
  data() {
    return {
      // 默认显示所有列
      showColumnsKeys: this.columns
        .filter(item => !item.hidden)
        .map(item => item.key),
      current: 1,
      pageSize: 10,
      ignoreCase: 1,
      myData: [],
      search: "",
      selectedData: []
    };
  },
  watch: {
    data() {
      this.current = 1;
    }
  },
  computed: {
    filterColumns() {
      return this.columns.filter(
        item => this.showColumnsKeys.indexOf(item.key) > -1
      );
    },
    filterSearchData() {
      if (this.ignoreCase) {
        return this.data.filter(row => {
          return Object.keys(row).some(column => {
            return row[column]
              .toString()
              .toLowerCase()
              .includes(this.search.toLowerCase());
          });
        });
      } else {
        return this.data.filter(row => {
          return Object.keys(row).some(column => {
            return row[column].toString().includes(this.search);
          });
        });
      }
    },
    currentPageData() {
      return this.filterSearchData.slice(
        (this.current - 1) * this.pageSize,
        this.current * this.pageSize
      );
    },
    total() {
      return this.data.length;
    }
  },
  methods: {
    handlePageSizeChange(pageSize) {
      this.current = 1;
      this.pageSize = pageSize;
    },
    reset() {
      this.showColumnsKeys = this.columns.map(item => item.key);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    handleSelect(selection) {
      this.selectedData = selection;
      this.$emit("batch", this.selectedData);
    },
    exportCsv() {
      this.$refs.selection.exportCsv({
        filename: "table",
        columns: this.filterColumns,
        data: this.data
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.ivu-table-cell {
  padding-left: 6px;
  padding-right: 6px;
}
/deep/.ivu-page-options-sizer {
  margin-right: 0;
}
.front-page-table {
  .head {
    padding: 1px 0;
    overflow: hidden;
  }
  .footer {
    overflow: hidden;
  }
  .margin-sm {
    margin-right: 2px;
  }
}
</style>
