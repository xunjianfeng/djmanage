import VueRouter from 'vue-router'
const HjRouter = [{
    path: '/home',
    component: () =>
        import ('@/views/home/index'),
    meta: {
        ssr: true
    }
}]
export default HjRouter