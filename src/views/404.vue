<template>
  <div class="wrapper">
    <span class="text breath">404</span>
    <span class="text shine">404</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  padding-top: 70px;
  .text {
    background: #000;
    color: red;
    padding: 5px 5px;
    width: 80px;
    height: 40px;
    line-height: 30px;
    display: inline-block;
    font-size: 30px;
    text-align: center;
    font-style: italic;
    font-weight: 900;
  }
}
</style>
