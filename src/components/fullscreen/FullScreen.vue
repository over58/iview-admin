<template>
  <Button @click="toggle" :icon="full ? 'md-contract' : 'md-expand'"></Button>
</template>
<script>
export default {
  name: "FullScreen",
  props: {
    elem: {
      type: HTMLDivElement,
      required: true
    }
  },
  data() {
    return {
      full: false
    };
  },
  methods: {
    toggle() {
      this.full = !this.full;
      if (this.full) {
        if (this.elem.requestFullscreen) {
          this.elem.requestFullscreen();
        } else if (this.elem.webkitRequestFullscreen) {
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          this.elem.mozRequestFullScreen();
        } else if (this.elem.msRequestFullscreen) {
          this.elem.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.$emit("on-change", this.full);
    }
  }
};
</script>
<style scoped>
.btn-con .ivu-tooltip-rel {
  height: 64px;
  width: 64px;
  line-height: 56px;
}
.btn-con .ivu-tooltip-rel i {
  cursor: pointer;
}
</style>
