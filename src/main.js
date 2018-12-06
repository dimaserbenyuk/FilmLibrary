import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimimi from 'uimini/dist/css/uimini.css'


import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(
  Vuelidate,
  Uimimi
);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAqu9QL1JqYFO414El1-wRDc_R2yJD3mAg',
      authDomain: 'film-library-cddb2.firebaseapp.com',
      databaseURL: 'https://film-library-cddb2.firebaseio.com',
      projectId: 'film-library-cddb2',
      storageBucket: 'film-library-cddb2.appspot.com',
      messagingSenderId: '475782094615'
    };
    firebase.initializeApp(config);
  }
});

