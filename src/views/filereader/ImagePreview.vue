<template>
  <div>
    <input
      type="file"
      ref="input"
      @change="preview"
      accept="image/gif,image/jpeg,image/png"
    />
    <Progress :percent="progress" />
    <div ref="preview" class="preview"></div>
  </div>
</template>

<script>
let vm = null;
export default {
  data() {
    return {
      progress: 0
    };
  },
  computed: {},
  methods: {
    preview() {
      let input = this.$refs.input;
      if (input.files && input.files[0]) {
        let file = input.files[0];
        let image = new Image();
        image.style.width = "100%";
        image.onload = () => {
          this.$refs.preview.innerHTML = "";
          this.$refs.preview.appendChild(image);
        };
        let reader = new FileReader();
        reader.addEventListener("loadstart", () => {
          console.log("upload start");
        });
        reader.addEventListener("loadend", function() {
          vm.$Notice.success({ title: "upload success" });
          image.src = this.result;
        });
        reader.addEventListener("progress", e => {
          vm.progress = (100 * e.loaded) / e.total;
        });
        reader.onerror = err => {
          this.$Notice.error({
            title: "发生错误",
            desc: err
          });
        };
        reader.readAsDataURL(file);
      }
    }
  },
  created() {
    vm = this;
  }
};
</script>

<style lang="less" scoped>
.preview {
  height: 300px;
  border: solid 1px #eee;
  overflow: auto;
}
</style>
