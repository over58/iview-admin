import Vue from 'vue'

Vue.directive("json", {
  bing () {
    console.log('bind')
  },
  update () {
    console.table('update')
  },
  inserted: function(el, binding) {
    console.log('inserted')
    el.textContent = JSON.stringify(binding.value, null, 2);
    el.style.backgroundColor = "rgba(0,0,0,.8)";
    el.style.color = "#fff";
    el.style.padding = "20px";
    el.style.borderRadius = "10px";
  },
  componentUpdated(el, binding) {
    console.log("componentUpdated");
    el.textContent = JSON.stringify(binding.value, null, 2);
    el.style.backgroundColor = "rgba(0,0,0,.8)";
    el.style.color = "#fff";
    el.style.padding = "20px";
    el.style.borderRadius = "10px";
  },
  unbind(){
    console.log('unbind')
  }
});