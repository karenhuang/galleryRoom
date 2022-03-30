import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', name: 'index', component: () => { return import ('pages/Index') } },
      { path: '/GalleryRoom', name: 'karen-circleroom', component: () => { return import ('pages/GalleryRoom') } },
      { path: '*', redirect: '/' }
    ]
  })
}