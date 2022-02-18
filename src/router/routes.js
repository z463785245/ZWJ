export default [
    {
        path:'/auth/register',
        name:'Register',
        component:() => import ('@/views/auth/Register.vue')
    },
    // 首页路由配置
    {
        path:'/',
        name:'Home',
        alias: '/topics',
        component:() => import('@/views/Home.vue')
    },
    {
        path:'*',
        redirect: '/'
    },
    {
        path:'/auth/login',
        name:'Login',
        component: () =>import('@/views/auth/Login.vue')
    },
    // 编辑资料路由
    {
        path:'/users/1/edit',
        component:() =>import('@/views/users/Edit.vue'),
        children:[
            {
                path:'',
                name:'EditProfile',
                component:() =>import('@/views/users/Profile.vue'),
                // auth 为 true，标识当前路由需要登录才能访问
                meta: { auth:true }
            },
            // EditAvatar
            {
                path: '/users/1/edit_avatar',
                name: 'EditAvatar',
                component: () => import('@/views/users/Avatar.vue'),
                meta: { auth: true }
            },
            // EditPassword
            {
                path: '/users/1/edit_password',
                name: 'EditPassword',
                component: () => import('@/views/users/Password.vue'),
                meta: { auth: true }
            }
        ]
    },
    {
        path:'/articles/create',
        name:'Create',
        component:() =>import('@/views/articles/Create.vue'),
        meta: { auth:true }
    },
    // {
    //     path:'/articles/:articleId/content',
    //     name:'Content',
    //     component:() => import('@/views/articles/Content.vue')
    // },
    // Edit
    {
        path:'/articles/:articleId/edit',
        name:'Edit',
        component:() => import('@/views/articles/Create.vue'),
        meta: { auth:true }
    },
    // Search
    {
        path:'/search',
        name:'Search',
        component:() => import('@/views/Search.vue')
    },
    {
        path: '/:user',
        component: () => import('@/views/articles/Column'),
        children: [
          {
            path: '',
            name: 'Column',
            component: () => import('@/views/articles/List.vue')
          },
          {
            path: '/articles/:articleId/content',
            name: 'Content',
            component: () => import('@/views/articles/Content.vue')
          }
        ]
    },
]