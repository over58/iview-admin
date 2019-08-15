<template>
  <Header :style="{ padding: 0, margin: 0 }" class="layout-header-bar">
    <Icon
      @click.native="collapsedSider"
      :class="rotateIcon"
      :style="{ margin: '0 20px', cursor: 'pointer' }"
      type="md-menu"
      size="24"
    ></Icon>
    <span style="float:right;padding:0 5px;">
      <fullscreen :elem="elem"></fullscreen>
    </span>
  </Header>
</template>

<script>
import fullscreen from "com/fullscreen/FullScreen";
export default {
  components: {
    fullscreen
  },
  data() {
    return {};
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    isCollapsed() {
      return this.$store.state.isCollapsed;
    }
  },
  methods: {
    collapsedSider() {
      this.$store.commit("setCollapsed", !this.isCollapsed);
    }
  },
  created() {
    this.elem = document.getElementById("app");
  }
};
</script>

<style lang="less" scoped>
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
