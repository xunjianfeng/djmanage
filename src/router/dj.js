import VueRouter from 'vue-router'
const DjRouter = [{
    path: '/home',
    component: () =>
        import ('@/views/home/index'),
    meta: {
        ssr: true
    }
}]
export default DjRouter