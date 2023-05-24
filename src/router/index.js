import {
    createRouter,
    createWebHistory
} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/info/:id(\\d+)',
            name: 'infodetail',
            component: () => import('../views/InfoDetail.vue')
        },
        {
            path: '/live',
            name: 'livenews',
            // component: LiveNewsView,
            children: [{
                    path: '',
                    name: 'livenews',
                    component: () => import('../views/LiveNewsView.vue')
                },
                {
                    path: ':id(\\d+)',
                    name: 'newsdetail',
                    component: () => import('../views/LiveNewsDetail.vue')
                }
            ]
        },
        {
            path: '/hot',
            name: 'hotnews',
            component: () => import('../views/HotNewsView.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/search',
            name: 'search',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/SearchView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound', 
            component: () => import('@/views/404.vue')
        }
    ]
})

export default router