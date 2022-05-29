import VueRouter from 'vue-router'
const HomeRouter = {
    path: '/home',
    component: () => import('@/views/home/index'),
    meta: {
      ssr: true
    }
  }
export default HomeRouter