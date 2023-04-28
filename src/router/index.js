import {
    createRouter,
    createWebHistory
} from 'vue-router'
import LiveNewsView from '../views/LiveNewsView.vue'
import LiveNewsDetail from '../views/LiveNewsDetail.vue'
import HotNewsView from '../views/HotNewsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: LiveNewsView
        },
        {
            path: '/livenews',
            name: 'livenews',
            // component: LiveNewsView,
            children: [{
                    path: '',
                    name: 'livenews',
                    component: LiveNewsView
                },
                {
                    path: ':id(\\d+)',
                    name: 'newsdetail',
                    component: LiveNewsDetail
                }
            ]
        },
        {
            path: '/hotnews',
            name: 'hotnews',
            component: HotNewsView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router