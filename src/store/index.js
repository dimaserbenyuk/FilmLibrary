import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import task from './task'
import tags from './tags'
import user from './user'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    common,
    task,
    tags,
    user
  }
})
