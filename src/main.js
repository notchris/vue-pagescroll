import '../src/assets/css/style.css'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  render: h => h(App),
  metaInfo: () => ({
    titleTemplate: '%s | Example Site',
    htmlAttrs: {
      lang: 'en'
    }
  })
}).$mount('#app')
