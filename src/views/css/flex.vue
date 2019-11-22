<template>
  <div class="container">
    <div class="box1">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container{
}
.box1{
  display: flex;
  justify-content: center;
  height: 300px;
  border: solid 1px #dfdfdf;
}
.item{
  height: 50px;
  width: 50px;
  background: red;
}
</style>