<template>
  <div class="wrapper">
    <span class="text">404</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@keyframes breath {
  0% {
    box-shadow: 0px 0px 10px 0px #333;
  }
  50% {
    box-shadow: 0px 0px 10px 5px #333;
  }
  100% {
    box-shadow: 0px 0px 10px 10px #333;
  }
}
.wrapper {
  text-align: center;
  font-size: 30px;
  text-align: center;
  font-style: italic;
  font-weight: 900;
  padding-top: 70px;
  .text {
    animation: breath 2s linear infinite alternate;
    background: #000;
    color: red;
    padding: 5px 10px;
  }
}
</style>
