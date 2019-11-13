<template>
  <div>
    <Tabs>
      <TabPane label="mouse实现">
        <div class="container" ref="container">
          <div class="box" ref="drag" @mousedown="handleMousedown"></div>
        </div>
      </TabPane>
      <TabPane label="drag实现">
        <div class="container" ref="container1">
          <div
            class="box"
            ref="drag1"
            draggable="true"
            @dragstart="handleDragStart"
            @drag="handleDrag"
            @dragend="handleDragEnd"
          ></div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleMousedown(e) {
      // 记录左上角坐标
      var container = this.$refs.container;
      var drag = this.$refs.drag;
      let paddingX = e.clientX - drag.offsetLeft;
      let paddingY = e.clientY - drag.offsetTop;
      let borderWidth = 1;
      drag.setCapture && drag.setCapture();

      document.onmousemove = function(e) {
        var moveX = e.clientX - paddingX; // 鼠标停下时候元素左上角的x坐标
        var moveY = e.clientY - paddingY; // 鼠标停下时候元素左上角的y坐标

        if (moveX < 0) {
          moveX = 0;
        } else if (
          moveX >
          container.offsetWidth - 2 * borderWidth - drag.offsetWidth
        ) {
          moveX = container.offsetWidth - 2 * borderWidth - drag.offsetWidth;
        }

        if (moveY < 0) {
          moveY = 0;
        } else if (
          moveY >
          container.offsetHeight - 2 * borderWidth - drag.offsetHeight
        ) {
          moveY = container.offsetHeight - 2 * borderWidth - drag.offsetHeight;
        }

        drag.style.left = moveX + "px";
        drag.style.top = moveY + "px";
      };

      document.onmouseup = function() {
        this.onmousemove = null;
        this.onmouseup = null;
        drag.releaseCapture && drag.releaseCapture();
      };
    },
    handleDragStart() {
      console.log("start drag");
    },
    handleDrag(e) {
      e.preventDefault();
      console.log("drag");
      console.log({
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        x: e.x,
        y: e.y,
        movementX: e.movementX,
        movementY: e.movementY
      });
    },
    handleDragEnd(e) {
      e.preventDefault();

      let box = this.$refs.drag1;
      // console.log(e.clientX);
      box.style.left = e.clientX - 50 + "px";
      box.style.top = e.clientY - 80 + "px";
      // if (e.clientX < 50) {
      // }
      // console.log("drag end", e);
      // console.log({
      //   screenX: e.screenX,
      //   screenY: e.screenY,
      //   clientX: e.clientX,
      //   clientY: e.clientY,
      //   x: e.x,
      //   y: e.y,
      //   movementX: e.movementX,
      //   movementY: e.movementY
      // });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  height: 400px;
  border: solid #dfdfdf 1px;
  .box {
    position: absolute;
    height: 100px;
    width: 100px;
    background-color: aquamarine;
  }
}
</style>
