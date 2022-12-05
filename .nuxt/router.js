import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6814ffd1 = () => interopDefault(import('../pages/diplomaShare/index.vue' /* webpackChunkName: "pages/diplomaShare/index" */))
const _335d7b88 = () => interopDefault(import('../pages/professionDetails/index.vue' /* webpackChunkName: "pages/professionDetails/index" */))
const _ab25964e = () => interopDefault(import('../pages/professions/index.vue' /* webpackChunkName: "pages/professions/index" */))
const _4e85face = () => interopDefault(import('../pages/trajectories/index.vue' /* webpackChunkName: "pages/trajectories/index" */))
const _a005110a = () => interopDefault(import('../pages/trajectory/index.vue' /* webpackChunkName: "pages/trajectory/index" */))
const _02f90c71 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/diplomaShare",
    component: _6814ffd1,
    name: "diplomaShare"
  }, {
    path: "/professionDetails",
    component: _335d7b88,
    name: "professionDetails"
  }, {
    path: "/professions",
    component: _ab25964e,
    name: "professions"
  }, {
    path: "/trajectories",
    component: _4e85face,
    name: "trajectories"
  }, {
    path: "/trajectory",
    component: _a005110a,
    name: "trajectory"
  }, {
    path: "/",
    component: _02f90c71,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
