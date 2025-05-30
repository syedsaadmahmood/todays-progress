import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

global.Vue = Vue

Vue.component('v-icon', {
  template: '<span><slot></slot></span>',
  props: {
    color: String
  }
})
