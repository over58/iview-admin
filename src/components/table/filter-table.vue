<template>
  <div>
    <div class="filter-header">
      <div
        v-for="(item, index) in columns"
        :key="index"
        class="filter-header__item"
        :style="[item.width ? { width: item.width + 'px' } : { flex: 1 }]"
      >
        <div v-if="item.filter">
          <template v-if="item.filter.type === 'input'">
            <Input
              v-model="search"
              :placeholder="item.placeholder || '请输入搜索值'"
              search
              enter-button
            />
          </template>
          <div
            v-if="item.filter.type === 'slider'"
            style="display:flex;flex-direction:row"
          >
            <b style="padding: 0 10px 0 3px;line-height:34px;"
              >[ {{ item.filter.min }}~{{ item.filter.max }}]</b
            >
            <Slider
              style="flex:1"
              range
              show-input
              v-model="search"
              :min="item.filter.min"
              :max="item.filter.max"
            ></Slider>
            <Button
              type="primary"
              size="small"
              icon="ios-search"
              class="search-button"
            ></Button>
          </div>
        </div>
      </div>
    </div>
    <Table :columns="columns" :data="data" border></Table>
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
    }
  },
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style scoped lang="less">
.filter-header {
  display: flex;
  flex-direction: row;
  .filter-header__item {
    height: 40px;
    padding: 3px;
    background-color: #fff;
    border-top: solid 1px #dfdfdf;
    border-left: solid 1px #dfdfdf;
    display: block;
    &:last-child {
      border-right: solid 1px #dfdfdf;
    }
    .search-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 32px;
    }
  }
  /deep/.ivu-input-number {
    border-radius: 0;
  }
}
</style>
