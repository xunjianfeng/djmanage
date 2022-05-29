import VueRouter from 'vue-router'
const SqRouter = [{
        path: '/tournament/round_bracket',
        component: () =>
            import ('../views/tournament/round_bracket'),
        meta: {
            ssr: true
        }
    },
    {
        path: '/tournament/round_Information',
        component: () =>
            import ('../views/tournament/round_Information'),
        meta: {
            ssr: true
        }
    },
    {
        path: '/tournament/round_participants',
        component: () =>
            import ('../views/tournament/round_participants'),
        meta: {
            ssr: true
        }
    },
    {
        path: '/tournament/round_standings',
        component: () =>
            import ('../views/tournament/round_standings'),
        meta: {
            ssr: true
        }
    }
]
export default SqRouter