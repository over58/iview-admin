<template>
  <pre class="editor-json">{{ innerData }}</pre>
</template>

<script>
export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => {
        return {};
      }
    }
  },
  computed: {
    innerData() {
      return JSON.stringify(this.data, null, 2);
    }
  }
};
</script>

<style lang="less" scoped>
.editor-json {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
}
</style>
