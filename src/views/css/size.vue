<template>
  <div class="wrapper">
    <div class="container">
      <div class="box" ref="box">
        <pre>
          width: 300px;
          heihgt:300px;
          padding: 10px;
          border: solid 10px black;
          box-sizing: content-box;

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, itaque? Eos consequatur cupiditate magnam, dolore nostrum saepe unde voluptate dolor alias eligendi. Et sed optio beatae libero nesciunt ipsam repudiandae.
        </pre>
      </div>
    </div>
    <Row>
      <Col :xs="24" :sm="12">
        <Card dis-hover title="client尺寸">
          <Form label-position="right" :label-width="100" v-if="elem">
            <Form-item label="clientWidth">
              {{ elem.clientWidth }} = width + 2 * padding
            </Form-item>
            <Form-item label="clientHeight">
              {{ elem.clientHeight }} = height + 2 * padding
            </Form-item>
            <Form-item label="clientTop">
              {{ elem.clientTop }} = border-top-width
            </Form-item>
            <Form-item label="clientLeft">
              {{ elem.clientLeft }} = border-left-width
            </Form-item>
          </Form>
        </Card>
      </Col>
      <Col :xs="12" :sm="12">
        <Card dis-hover title="offset尺寸">
          <Form label-position="right" :label-width="100" v-if="elem">
            <Form-item label="offsettWidth">
              {{ elem.offsetWidth }} = width + 2 * padding + 左右border
            </Form-item>
            <Form-item label="offsettHeight">
              {{ elem.offsetHeight }} = height + 2 * padding + 上下border
            </Form-item>
            <Form-item label="offsettTop">
              {{ elem.offsetTop }}
              当前元素 上边框 外边缘 到 最近的已定位父级（offsetParent） 上边框
              内边缘的 距离。如果父 级都没有定位，则分别是到body 顶部
              和左边的距离
            </Form-item>
            <Form-item label="offsettLeft">
              {{ elem.offsetLeft }}
              当前元素 左边框 外边缘 到 最近的已定位父级（offsetParent） 左边框
              内边缘的 距离。如果父级都没有定位，则分别是到body 顶部
              和左边的距离
            </Form-item>
          </Form>
        </Card>
      </Col>
      <Col :xs="12" :sm="12">
        <Card dis-hover title="scroll尺寸">
          <Form label-position="right" :label-width="100" v-if="elem">
            <Form-item label="scrolltWidth">
              {{ elem.scrollWidth }}
              获取指定标签内容层的真实宽度（可视区域宽度+被隐藏区域宽度
            </Form-item>
            <Form-item label="scrolltHeight">
              {{ elem.scrollHeight }} 内容层顶部 到 可视区域顶部的距离。
              scrollHeight：获取指定标签内容层的真实高度（可视区域高度+被隐藏区域高度）
            </Form-item>
            <Form-item label="scrolltTop">
              {{ elem.scrollTop }} 内容层顶部 到 可视区域顶部的距离。 实例：
              <pre>
              var scrollTop = document.documentElement.scrollTop ||
              window.pageYOffset || document.body.scrollTop;

              </pre>
              持续获取高度的方式：
              <pre>
                window.addEventListener('scroll', ()=>{
                  var scrollTop = document.documentElement.scrollTop 
                  || window.pageYOffset
                  || document.body.scrollTop; 
                });
              </pre>
            </Form-item>
            <Form-item label="scrolltLeft">
              {{ elem.scrollLeft }} 内容层左端 到 可视区域左端的距离.
            </Form-item>
            <Form-item label="是否滚动到了底部">
              {{ elem.scrollWidth - elem.scrollLeft === elem.clientWidth }}
            </Form-item>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elem: null
    };
  },
  computed: {
    clientWidth() {
      return this.elem && this.elem.clientWidth;
    }
  },
  mounted() {
    console.log(this);
    this.$nextTick(() => {
      this.elem = this.$refs.box;
      console.log(this.elem);
    });
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  .container {
    position: relative;
    padding-top: 13px;
    height: 350px;
    width: 350px;
    border: solid 1px red;
    .box {
      height: 300px;
      width: 300px;
      padding: 10px;
      border: solid 10px black;
      background: pink;
      margin: 0 auto;
      box-sizing: content-box;
      overflow: auto;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  .right {
    background: gray;
    height: 500px;
    color: aliceblue;
  }
}
</style>
