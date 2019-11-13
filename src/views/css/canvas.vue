<template>
  <div>
    <img :src="dataUrl" ref="img" />
  </div>
</template>

<script>
var QRcode = require("qrcode");
import shareImage from "./images/9oZAikiKCiE.jpg";
export default {
  data() {
    return {
      dataUrl: ""
    };
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    async initCanvas() {
      let canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 600;
      let ctx = canvas.getContext("2d");

      let bgImg = await this.initImg(shareImage);
      ctx.drawImage(bgImg, 0, 0, 500, 800, 0, 0, canvas.width, canvas.height);

      let code = await this.initCode();
      console.log(code);
      ctx.drawImage(code, 0, 0, 50, 50, 225, 275, 50, 50);

      this.drawCircle(ctx);

      let dataUrl = canvas.toDataURL("image/png");
      this.dataUrl = dataUrl;

      let demision = await this.getImgNatualDimension(shareImage);
      console.log("demision", demision);
    },
    async drawCircle(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.moveTo(50, 50);
      ctx.lineTo(200, 50);
      ctx.arc(200, 75, 25, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(50, 100);
      ctx.arc(50, 75, 25, Math.PI / 2, (3 * Math.PI) / 2);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 14px Verdana";
      ctx.fillStyle = "#fff";
      ctx.fillText("我是测试的文字", 125, 75, 150);
      ctx.closePath();

      // 绘制一个圆形
      ctx.beginPath();
      // ctx.moveTo(300, 100);
      ctx.arc(300, 75, 50, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    },
    async initCode() {
      return QRcode.toDataURL("这是一个二维码", {
        width: 50,
        height: 50
      }).then(url => {
        let img = new Image();
        if (!url.startsWith("data:image")) {
          img.setAttribute("crossOrigin", "Anonymous");
        }
        img.src = url;
        return new Promise(resolve => {
          img.onload = () => {
            resolve(img);
          };
        });
      });
    },
    async initImg(url) {
      let img = new Image();
      // ios 9 base64 设置会报错,去掉
      if (!url.startsWith("data:image")) {
        img.setAttribute("crossOrigin", "Anonymous");
      }
      img.src = url;
      return new Promise(resolve => {
        img.onload = () => {
          resolve(img);
        };
      });
    },
    async getImgNatualDimension(url) {
      let image = new Image();
      image.src = url;
      return new Promise(resolve => {
        image.onload = () => {
          resolve([image.width, image.height]);
        };
      });
    }
  }
};
</script>

<style lang="less" scoped>
canvas {
  color: white;
}
</style>
