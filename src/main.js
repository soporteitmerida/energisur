import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import {router} from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { BAspect } from 'bootstrap-vue';
import { BForm } from 'bootstrap-vue';
import VMdDateRangePicker from "v-md-date-range-picker";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faWrench,
  faPlusCircle,
  faPlus,
  faPlaneArrival
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faWrench,faPlusCircle,faPlus,faPlaneArrival);

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('b-aspect', BAspect);
Vue.component('b-form', BForm)
Vue.use(VMdDateRangePicker);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
