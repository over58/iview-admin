<template>
  <div class="container">
    <Card dis-hover title="vue-lazyload">
      <div class="box1">
        <img v-for="item in imgs" :key="item" v-lazy="item" alt="">
      </div>
    </Card>
    <Card dis-hover title="自己写的">
      <div class="box1">
        <img class="img2" v-for="item in imgs" :key="item" src="" :data-src="item" alt="">
      </div>
    </Card>
    
    <img :src="a" width="200" alt="">
    <img src="../assets/lazyload/0653_wY0nRc.jpg" width="200" alt="">

  </div>
</template>

<script>

export default {
  data () {
    return {
      imgs: [],
      a: require('../assets/lazyload/95RvuULh91A.jpg')
    }
  },
  computed: {
  },
  mounted(){
    this.init()
    this.$nextTick(() => {
      this.init2()
    })
  },
  methods: {
    init (){
      let webpackContext = require.context('../assets/lazyload/', false, /\.jpg$/i)
      this.imgs = webpackContext.keys().map((x) => webpackContext(x))
    },
    init2(){
      // IntersectionObserver指的是和viewport的交叉区域
      let imgs = [...document.querySelectorAll(".img2")]
      let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.intersectionRatio > 0) {
            entry.target.src = entry.target.dataset.src
            observer.unobserve(entry.target)
          }
        })
      })

      imgs.forEach(img => {
        observer.observe(img)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box1{
  width: 500px;
  height: 380px;
  overflow: auto;
  border: solid 1px #dfdfdf;
  border-radius: 3px;
  padding: 3px;
  img{
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
</style>