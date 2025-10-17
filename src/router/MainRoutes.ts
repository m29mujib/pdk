const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'Analytical',
            path: '/dashboards/analytical',
            component: () => import('@/views/dashboard/Analytical.vue')
        },
        {
            name: 'eCommerce',
            path: '/dashboards/ecommerce',
            component: () => import('@/views/dashboard/eCommerce.vue')
        },
        // Front Pages
        {
            name: 'Homepage',
            path: '/front-page/homepage',
            component: () => import('@/views/front-pages/Homepage.vue')
        },
        {
            name: 'About Us',
            path: '/front-page/about-us',
            component: () => import('@/views/front-pages/AboutUs.vue')
        },
        {
            name: 'Blog',
            path: '/front-page/blog',
            component: () => import('@/views/front-pages/Blog.vue')
        },
        {
            name: 'Contact Us',
            path: '/front-page/contact-us',
            component: () => import('@/views/front-pages/ContactUs.vue')
        },
        {
            name: 'Portfolio',
            path: '/front-page/portfolio',
            component: () => import('@/views/front-pages/Portfolio.vue')
        },
        {
            name: 'Pricing',
            path: '/front-page/pricing',
            component: () => import('@/views/front-pages/Pricing.vue')
        },
        // UI Components
        {
            name: 'Typography',
            path: '/ui/typography',
            component: () => import('@/views/components/Typography.vue')
        },
        {
            name: 'Shadow',
            path: '/ui/shadow',
            component: () => import('@/views/components/Shadow.vue')
        },
        {
            name: 'Icons',
            path: '/icons',
            component: () => import('@/views/pages/Icons.vue')
        },
        {
            name: 'Starter',
            path: '/sample-page',
            component: () => import('@/views/pages/SamplePage.vue')
        }
    ]
};

export default MainRoutes;
