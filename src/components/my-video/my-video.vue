<template>
<div>
  {{played}}
  <video ref="videoPlayer" :src="url" :poster="poster" controls :autoplay="autoplay">
  </video>
</div>
</template>

<script>
let vm = null
export default {
  props: {
    url : {
      type: String,
      default: 'https://www.runoob.com/try/demo_source/movie.mp4'
    },
    poster: {
      type: String,
      default: ''
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    loop: {
      type :Boolean,
      default: false
    }
  },
  data () {
    return {
      isPlaying: false,
      played: false
    }
  },
  mounted () {
    vm = this
    this.$refs.videoPlayer.addEventListener('ended', this.videoPlayed)
  },
  beforeDestroy () {
    this.$refs.videoPlayer.removeEventListener('ended', this.videoPlayed)
  },
  methods: {
    videoPlayed () {
      this.played = true
    }
  }
}
</script>

<style>

</style>