<template>
  <div class="container">
    <h2>v-json指令</h2>
    <pre v-json="content"></pre>
    <button @click="updateValue">更新值</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      content: {
        name: 'Tom',
        sex: 'man',
        age: 10,
        address: '北京朝阳区'
      }
    }
  },
  methods: {
    updateValue () {
      this.content = {
        age: 1342423,
        name: 'Marry'
      }
      console.log(this.content)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  padding: 20px;
}
</style>