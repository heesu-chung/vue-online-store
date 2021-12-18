import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue2Editor from 'vue2-editor';
import IconBase from './components/IconBase.vue';
import IconHeart from './components/icons/IconHeart.vue';
import IconHeartFilled from './components/icons/IconHeartFilled.vue';
import Shopping from './components/icons/Shopping.vue';
import 'firebase/auth';
Vue.use(Vue2Editor);
Vue.component('icon-base', IconBase);
Vue.component('icon-heart', IconHeart);
Vue.component('icon-heart-filled', IconHeartFilled);
Vue.component('shopping', Shopping);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
