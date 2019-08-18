<template>
  <div>
    <Card dis-hover title="说明">
      <dl>
        <dt>防抖</dt>
        <dd>
          概念：触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
        </dd>
        <dd>思路：每次触发事件时都取消之前的延时调用方法</dd>
      </dl>
      <dl>
        <dt>节流</dt>
        <dd>
          概念：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
        </dd>
        <dd>思路：每次触发事件时都判断当前是否有等待执行的延时函数</dd>
      </dl>
      <dl>
        <dt>两者区别</dt>
        <dd>
          在于创建timer时是否需要判断已存在定时器，节流在n毫秒内只能执行一次，而防抖则在n秒内不一定能执行一次
        </dd>
      </dl>
      <dl>
        <dt>应用场景</dt>
        <dd>
          <ul>
            <li>鼠标/触摸屏的mouseover/touchmove事件</li>
            <li>页面窗口的resize事件</li>
            <li>滚动条的scroll事件</li>
          </ul>
        </dd>
      </dl>
    </Card>
    <Tabs v-model="tabName">
      <TabPane name="throttle" label="throttle">
        <Card dis-hover title="节流前">
          <div ref="container_before" class="container" @mousemove="hanler">
            0
          </div>
        </Card>
        <Card dis-hover title="节流后">
          <div ref="container" class="container" @mousemove="throttleHandler">
            0
          </div>
        </Card>
      </TabPane>
      <TabPane name="debounce" label="debounce">
        <Card dis-hover title="防抖前">
          <div
            ref="debounce_before"
            class="container"
            @mousemove="handler2"
          ></div>
        </Card>
        <Card dis-hover title="防抖后">
          <div
            ref="debounce_after"
            class="container"
            @mousemove="debounceHander"
          ></div>
        </Card>
        <Card
          dis-hover
          title="高级(添加immediate参数，控制直接触发还是最后触发)"
        >
          <pre style="background-color:rgba(0,0,0,.8);color:#fff">
              <code>
                export function debounce(func: , wait = 500, immediate = true) {
                let timeout, context, args;
                const later = () => setTimeout(() => {
                  timeout = null;
                  if (!immediate) {
                    func.apply(context, args)
                  }
                  context = args = null;
                }, wait)

                return function(this, ...params) {
                  context = this;
                  args = params;
                  if (timeout) {
                    clearTimeout(timeout);
                    timeout = later();
                  } else {
                    timeout = later();
                    if (immediate) {
                      func.apply(context, args);
                    }
                  }
                }
              }
              </code>
              
            </pre>
        </Card>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabName: "throttle",
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0
    };
  },
  methods: {
    hanler() {
      this.$refs.container_before.innerHTML = ++this.count1;
    },
    throttle(func, wait) {
      var canRun = true;
      return function(...args) {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
          func.apply(this, args);
          canRun = true;
        }, wait);
      };
    },
    throttleHandler: function() {},
    handler2() {
      this.$refs.debounce_before.innerHTML = ++this.count1;
    },
    debounce(func, wait) {
      var timer = null;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    },
    debounceHander: function() {}
  },
  created() {
    this.throttleHandler = this.throttle(() => {
      this.$refs.container.innerHTML = ++this.count2;
    }, 2000);
    this.debounceHander = this.debounce(() => {
      this.$refs.debounce_after.innerHTML = ++this.count4;
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
dd {
  padding-left: 2em;
}
.container {
  height: 200px;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 200px;
}
</style>
