import Vue from 'vue'

Vue.directive('tack', {
  bind: function(el, binding){
    el.style.position = 'fixed'
    let value = binding.value || 300
    el.style[binding.arg] = value + 'px'
  }
})