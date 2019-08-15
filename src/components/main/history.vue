<template>
  <div class="history_wrapper">
    <span class="prefix">
      <Icon type="ios-arrow-back" />
    </span>
    <div class="content">
      <Tag
        type="dot"
        closable
        checkable
        v-for="(item, index) in historys"
        :key="index"
        :name="index"
        :color="checked.includes(index) ? 'primary' : 'default'"
        @on-close="removeHistory"
        @on-change="changeHistory"
        >{{ item.name }}</Tag
      >
    </div>
    <span class="suffix">
      <Icon type="ios-arrow-forward" />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: []
    };
  },
  computed: {
    historys() {
      return this.$store.state.historyStack;
    }
  },
  watch: {},
  methods: {
    removeHistory() {
      this.$store.commit("popHistory");
    },
    changeHistory(checked, name) {
      if (checked) {
        this.checked.push(name);
      } else {
        let index = this.checked.findIndex(item => item === name);
        this.checked.splice(index, 1);
      }
      this.$router.push({ name: this.historys[name].name });
    }
  }
};
</script>

<style lang="less" scoped>
.history_wrapper {
  height: 40px;
  border: solid 1px #eee;
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
  .prefix,
  .suffix {
    display: inline-block;
    width: 40px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: cadetblue;
    }
  }
  .content {
    flex: 1;
    overflow-x: auto;
    padding: 1px 5px;
    background: #eee;
  }
}
</style>
