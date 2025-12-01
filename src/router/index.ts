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
      component: () => import('@/components/PageOne.vue'),
      children: [
        {
          name: 'PageOne_Section',
          // path: '/page_one/sections/:sectionId',
          path: 'sections/:sectionId',
          component: () => import('@/components/SectionComponent.vue'),
        },
      ],
    },
    {
      name: 'PageTwo',
      path: '/page_two',
      component: PageTwo, // Eagerly-loaded
      children: [
        {
          name: 'PageTwo_Section',
          path: 'sections/:sectionId',
          component: () => import('@/components/SectionComponent.vue'),
        },
      ],
    },
    {
      name: 'PageThree',
      path: '/page_three',
      component: PageThree, // Eagerly-loaded
      children: [
        {
          name: 'PageThree_Section',
          path: 'sections/:sectionId',
          component: () => import('@/components/SectionComponent.vue'),
        },
      ],
    },
  ],
})

export default router
