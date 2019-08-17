<template>
  <div>
    <div style="text-align:right">
      <Poptip transfer trigger="click" placement="bottom-end">
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
              style="display: block;"
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
    <Table
      ref="selection"
      :columns="filterColumns"
      :data="data"
      :border="border"
      :size="size"
      :loading="loading"
      @on-selection-change="handleSelect"
    ></Table>
    <div class="footer">
      <template v-if="batch">
        <Button @click="handleSelectAll(true)" class="margin-sm">全选</Button>
        <Button @click="handleSelectAll(false)" class="margin-sm"
          >取消全选</Button
        >
        <slot name="batch"> </slot>
        <span class="margin-sm">
          共选中
          <b style="color:#19be6b;padding:0 3px;">{{ selectedData.length }}</b>
          条数据
        </span>
      </template>
      <slot></slot>
      <Page
        :current.sync="page.current"
        :total="page.total"
        :page-size="page.size"
        show-sizer
        style="float:right"
        @on-change="handlePageChange"
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
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 默认显示所有列
      showColumnsKeys: this.columns
        .filter(item => !item.hidden)
        .map(item => item.key),
      page: {
        current: 1,
        size: this.pageSize,
        total: this.total
      },
      selectedData: []
    };
  },
  watch: {},
  computed: {
    filterColumns() {
      return this.columns.filter(
        item => this.showColumnsKeys.indexOf(item.key) > -1
      );
    }
  },
  methods: {
    handlePageChange(page) {
      this.$emit("on-page-change", page);
    },
    handlePageSizeChange(pageSize) {
      this.$set(this.page, "size", pageSize);
      this.$set(this.page, "current", 1);
      this.$emit("on-page-change", this.page.current, this.page.size);
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
.footer {
  overflow: hidden;
}
.margin-sm {
  margin-right: 2px;
}
</style>
