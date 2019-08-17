<template>
  <div>
    <img :src="nightSVG" alt="" />
  </div>
</template>

<script>
import nightSVG from "@/assets/night.svg";
export default {
  data() {
    return {
      nightSVG: nightSVG
    };
  }
};
</script>

<style></style>
