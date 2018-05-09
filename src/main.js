// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueQuillEditor from 'vue-quill-editor'
import iView from 'iview';
import VueLocalStorage from 'vue-ls';
import vendors from '@/vendors/index.js';
import 'iview/dist/styles/iview.css';
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/connom.css'
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(iView);
Vue.use(VueLocalStorage, {
  namespace: 'vuejs__'
});
Vue.prototype.$socket = vendors.socket;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
