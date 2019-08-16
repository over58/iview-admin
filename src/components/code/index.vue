<template>
  <div>
    <Row class="container">
      <Col :sm="12" :xs="24" class="preview">
        <slot></slot>
      </Col>
      <Col :sm="12" :xs="24" class="code">
        <Icon
          :type="full ? 'md-contract' : 'md-expand'"
          class="toggle"
          @click="expand"
        />
        <pre class="source">
          {{ code }}
        </pre>
      </Col>
    </Row>

    <Modal v-model="full" title="源码" :width="80">
      <pre
        style="background-color:rgba(0,0,0,.8);overflow:auto;max-height:500px;color:#fff"
        >{{ code }}</pre
      >
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    code: String
  },
  components: {},
  data() {
    return {
      full: false
    };
  },
  computed: {
    elem() {
      return this.$refs.code;
    }
  },
  watch: {
    isCollapsed(val) {
      if (!val) {
        this.$refs.container.style.height =
          Math.max(300, this.$refs.code.style.offsetHeight) + "px";
      }
    }
  },
  methods: {
    expand() {
      this.full = true;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.container {
  height: 300px;
  border: dashed 1px #dfdfdf;
  .preview,
  .code {
    height: 100%;
  }
  .preview {
    padding: 10px;
    height: 100%;
    border-right: dashed 1px #dfdfdf;
  }
  .code {
    position: relative;
    .toggle {
      position: absolute;
      top: 3px;
      right: 3px;
      font-size: 16px;
      cursor: pointer;
      color: #fff;
    }
    .source {
      background: rgba(0, 0, 0, 0.8);
      color: #dfdfdf;
      height: 100%;
      overflow: auto;
      margin: 0;
    }
  }
}
</style>
