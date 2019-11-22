<template>
  <div class="container">
    <Card dis-hover title="配置参数">
      <Form label-position="right" :label-width="100">
        <Form-item label="width">
          <InputNumber v-model="width"></InputNumber>
        </Form-item>
      </Form>
      <div class="box" :style="{width:width+'px'}">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 100
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  overflow: hidden;
}
.item{
  float: left;
  width: 33.3%;
  padding-top: 33.3%;
  border-top: solid 1px #fff;
  border-right: solid 1px #fff;
  background-color: red;
}
.item:nth-child(1){
  padding-top: 66.6%;
  width: 66.6%;
}
.item:nth-child(2), .item:nth-child(3), .item:nth-child(6) {
  border-right: 0 none;
}
.item:nth-child(1), .item:nth-child(2) {
  border-top: 0 none;
}
</style>