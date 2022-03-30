import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
Vue.use(Vuex)

const InitModule = {
  state: {
    logo: null,
    list: null
  },
  mutations: {
    "logo/SET": (state, data) => {
      Vue.set(state, 'logo', data)
    },
    "list/SET": (state, data) => {
      Vue.set(state, 'list', data)
    }
  },
  actions: {
    "INIT": (context, data) => {
      // return context.dispatch('message/GET').then(context.dispatch('list/GET'))
      return context.dispatch('logo/GET').then(() => {
        return context.dispatch('list/GET')
      })
    },
    "logo/GET": (context, data) => {
      return api.getLogo().then(function(data) {
        context.commit('logo/SET', data.vue)
      }, function(err) {
        context.commit('logo/SET', '')
        console.log(err)
      })
    },
    "list/GET": (context, data) => {
      return api.getList().then(function(data) {
        context.commit('list/SET', data.list)
      }, function(err) {
        context.commit('list/SET', null)
        console.log(err)
      })
    }
  }
}

const GalleryModule = {
  state: {
    data: null
  },
  mutations: {
    "gallery/SET": (state, data) => {
      state.data = data.data
        // Vue.set(state, 'gallery', data)
    }
  },
  actions: {
    'gallery/GET': (context, data) => {
      return api.getGallery().then(function(data) {
        context.commit('gallery/SET', data)
      }, function(err) {
        context.commit('gallery/SET', null)
        console.log(err)
      })
    }
  }
}

const LightBoxModule = {
  state: {
    component: null,
    params: null
  },
  mutations: {
    "lightBox/OPEN": (state, { component, params }) => {
      state.component = component
      state.params = params
    },
    "lightBox/CLOSE": (state) => {
      state.component = null
      state.params = null
    }
  }
}


const KarenModule = {
  state: {
    data: null
  },
  mutations: {
    "karen/SET": (state, data) => {
      state.data = data
        // Vue.set(state, 'karen', data)
    }
  },
  actions: {
    "karen/GET": (context, data) => {
      return api.getKaren().then(function(data) {
        context.commit('karen/SET', data)
      }, function(err) {
        context.commit('karen/SET', null)
        console.log(err)
      })
    }
  }
}

export function createStore() {
  return new Vuex.Store({
    modules: {
      init: InitModule,
      lightBox: LightBoxModule,
      karen: KarenModule,
      gallery: GalleryModule
    }
  })
}