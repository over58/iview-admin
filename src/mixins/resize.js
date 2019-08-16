import _ from "lodash";
let vm = null;
export default {
  data() {
    return {
      chartInstance: null,
      timer: null
    };
  },
  computed: {
    isCollapsed() {
      return this.$store.state.isCollapsed;
    }
  },
  watch: {
    isCollapsed() {
      setTimeout(() => {
        this.resize();
      }, 200);
    }
  },
  methods: {
    resize() {
      this.chartInstance && this.chartInstance.reflow();
    },
    throttle(func, wait) {
      this.timer = null;
      return function() {
        if (!vm.timer) {
          vm.timer = setTimeout(() => {
            func.apply(vm);
            vm.timer = null;
          }, wait);
        } else {
          clearTimeout(vm.timer);
          vm.timer = null;
        }
      };
    }
  },
  created() {
    vm = this;

    this.throttleResize = this.throttle(function() {
      vm.resize();
    }, 500);

    window.addEventListener("resize", this.throttleResize, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.throttleResize());
    this.chartInstance && this.chartInstance.destroy();
    this.chartInstance = null;
  }
};
