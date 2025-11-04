import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import LessonPage from '../views/LessonPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import Layout from '../components/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Welcome',
        component: WelcomePage
      },
      {
        path: 'lessons',
        name: 'Lessons',
        component: LessonPage
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: CheckoutPage
      }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
