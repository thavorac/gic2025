import { createRouter, createWebHistory } from 'vue-router'
import PageTwo from '@/components/PageTwo.vue'
import PageThree from '@/components/PageThree.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      redirect: '/page_one',
    },
    {
      name: 'PageOne',
      path: '/page_one',
      component: () => import('@/components/PageOne.vue'), // Lazy-loaded
    },
    {
      name: 'PageTwo',
      path: '/page_two/:message',
      component: PageTwo, // Eagerly-loaded
    },
    {
      name: 'PageThree',
      path: '/page_three',
      component: PageThree, // Eagerly-loaded
    },
  ],
})

export default router
