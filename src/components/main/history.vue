<template>
  <div class="history_wrapper">
    <span class="prefix" @click="handleScroll('left')">
      <Icon type="ios-arrow-back" />
    </span>
    <div class="content" ref="scroll_elem">
      <div>
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
    </div>
    <span class="suffix" @click="handleScroll('right')">
      <Icon type="ios-arrow-forward" />
    </span>
  </div>
</template>

<script>
let vm = null;
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
    },
    handleScroll(dir = "left") {
      let requestAnimation =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(cb) {
          setTimeout(cb, 1000 / 60);
        };
      let cancalAnimation =
        window.cancelAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(timer) {
          clearTimeout(timer);
        };

      let timer;
      let ref = vm.$refs.scroll_elem;
      if (dir === "left") {
        let speed = Math.max(parseInt(ref.scrollLeft / 10, 10), 1);
        let fn = function() {
          if (ref.scrollLeft <= 0) {
            ref.scrollLeft = 0;
            cancalAnimation(timer);
            return;
          }
          ref.scrollLeft -= speed;
          speed = Math.max(parseInt(ref.scrollLeft / 10, 10), 1);
          timer = requestAnimation(fn);
        };
        fn();
      } else {
        let speed = Math.max(
          parseInt((ref.scrollWidth - ref.clientWidth) / 10, 10),
          1
        );
        let target = ref.scrollWidth - ref.clientWidth;
        let fn = function() {
          if (ref.scrollLeft >= target) {
            ref.scrollLeft = target;
            cancalAnimation(timer);
            return;
          }
          ref.scrollLeft += speed;
          speed = Math.max(parseInt((target - ref.scrollLeft) / 10, 10), 1);
          timer = requestAnimation(fn);
        };
        fn();
      }
    }
  },
  created() {
    vm = this;
  }
};
</script>

<style lang="less" scoped>
.history_wrapper {
  height: 40px;
  border: solid 1px #eee;
  // overflow-y: hidden;
  overflow: hidden;
  // overflow-x: auto;
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
    overflow-x: scroll;
    height: 40px;
    overflow-x: auto;
    white-space: nowrap;
    padding: 1px 5px;
    background: #eee;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
}
</style>
