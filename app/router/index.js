import { createRouter, createWebHashHistory } from 'vue-router'

import { useFilters } from '@/store/filters'

const routes = [
  {
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      // Redirect project base root to homepage
      {
        path: '/project/',
        redirect: () => ({ path: '/' }),
      },
      // project route
      {
        path: '/project/:slug',
        component: () => import('../views/Project.vue'),
      },
    ],
  },
  // Redirect keynote base root to homepage
  {
    path: '/keynote/',
    redirect: () => ({ path: '/' }),
  },
  // keynote route
  {
    path: '/keynote/:year',
    component: () => import('../views/Keynote.vue'),
  },
  // Error Page
  {
    path: '/error',
    component: () => import('../views/Error404.vue'),
  },
  // Redirect routes with no matches to error page
  {
    path: '/:noMatch(.*)*',
    redirect: () => ({ path: '/error' }),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

const cleanStrArr = (arr) => {
  if (!arr) {
    return []
  }
  return arr.split('|').filter((tag) => tag.length > 0) || []
}

const cleanNumArr = (arr) => {
  if (!arr) {
    return []
  }
  return (
    arr
      .split('|')
      .map((tag) => parseInt(tag))
      .filter((tag) => tag > 0) || []
  )
}

const updateParams = (query) => {
  const filterStore = useFilters()

  const activeTags = cleanStrArr(query.tags)
  const activeCategories = cleanStrArr(query.categories)
  const activeYears = cleanNumArr(query.years)

  filterStore.updateBatch({
    searchQuery: query.search || null,
    activeTags,
    activeCategories,
    activeYears,
  })
}

router.beforeEach((to) => {
  updateParams(to.query)
})

export default router
