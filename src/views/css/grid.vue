<template>
  <div class="container">
    <div class="box1">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
      <div class="item">6</div>
    </div>
    <div class="box2">
      <div class="item">
        <img src="./images/9oZAikiKCiE.jpg" alt="">
      </div>
      <div class="item">
        <img src="./images/9oZAikiKCiE.jpg" alt="">
      </div>
      <div class="item">
        <img src="./images/9oZAikiKCiE.jpg" alt="">
      </div>
      <div class="item">
        <img src="./images/9oZAikiKCiE.jpg" alt="">
      </div>
      <div class="item">
        <img src="./images/9oZAikiKCiE.jpg" alt="">
      </div>
      <div class="item">
        <img src="./images/9oZAikiKCiE.jpg" alt="">
      </div>
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px 50px;
  grid-column-gap: 20px;
  // grid-row-gap: 10px;
  border: solid 1px royalblue;
}
.item{
  height: 40px;
  width: 40px;
  border: solid 1px #dfdfdf;
}


.box2{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: 100px 100px;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  border: solid 1px royalblue;
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>