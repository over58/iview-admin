import _ from "lodash";
export default {
  data() {
    return {};
  },
  computed: {
    throttleResize() {
      return _.throttle(this.resize, 200, {
        trailing: true
      });
    },
    isCollapsed() {
      return this.$store.state.isCollapsed;
    }
  },
  watch: {
    isCollapsed() {
      this.throttleResize();
    }
  },
  methods: {},
  created() {
    this.handleResize = function() {
      this.throttleResize();
    };
    window.addEventListener("resize", this.handleResize, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
