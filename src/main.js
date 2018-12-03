import Vue from 'vue'
import MainComponent from './components/MainComponent.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(MainComponent)
}).$mount('#app')
