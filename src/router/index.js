<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/manager',
      name: 'manager',
      component: () => import('../components/views/Manager.vue'),
      meta: { requiresAuth: true }, // 标记需要登录验证的路由
      children: [
        {
          path: 'home',
          meta: { title: '主页', roles: ['ADMIN', 'EMP'] },
          component: () => import('../components/views/Home.vue'),
        },
        {
          path: 'data',
          meta: { title: '数据展示页面', roles: ['ADMIN'] },
          component: () => import('../components/views/Data.vue'),
        },
        {
          path: 'employee',
          meta: { title: '员工信息', roles: ['ADMIN'] },
          component: () => import('../components/views/Employee.vue'),
        },
        {
          path: 'admin',
          meta: { title: '管理员信息', roles: ['ADMIN'] },
          component: () => import('../components/views/Admin.vue'),
        },
        {
          path: 'person',
          meta: { title: '个人信息', roles: ['ADMIN', 'EMP'] },
          component: () => import('../components/views/Person.vue'),
        },
        {
          path: 'article',
          meta: { title: '文章信息', roles: ['ADMIN'] },
          component: () => import('../components/views/Article.vue'),
        },
        {
          path: 'password',
          meta: { title: '修改密码', roles: ['ADMIN', 'EMP'] },
          component: () => import('../components/views/Password.vue'),
        },
        {
          path: 'department',
          meta: { title: '部门信息', roles: ['ADMIN'] },
          component: () => import('../components/views/Department.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: '登录' },
      component: () => import('../components/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      meta: { title: '注册' },
      component: () => import('../components/views/Register.vue'),
    },
    {
      path: '/404',
      name: 'NotFount',
      meta: { title: '404' },
      component: () => import('../components/views/404.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
  ],
});

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  const userStore = useUserStore();

  // 检查该路由是否被requiresAuth标记，然后拿到user store的登录状态属性
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login');
    return;
  }

  // 同时还要判断目标路径是否设置了可访问角色
  if (to.meta.roles) {
    const userRole = userStore.userRole;
    // 然后通过includes返回布尔值判断当前路由可访问角色是否包含当前登录角色
    if (!to.meta.roles.includes(userRole)) {
      next('/404');
      return;
    }
  }

  next();
});

export default router;
=======
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user.js'

const router = createRouter({  
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { 
      path: '/manager', 
      name: 'manager',  
      component: () => import('../components/views/Manager.vue'), 
      meta: { requiresAuth: true }, // 标记需要登录验证的路由
      children: [
        { path: 'home', meta: { title: '主页', roles: ['ADMIN', 'EMP'] }, component: () => import('../components/views/Home.vue') },
        { path: 'data', meta: { title: '数据展示页面', roles: ['ADMIN'] }, component: () => import('../components/views/Data.vue') },
        { path: 'employee', meta: { title: '员工信息', roles: ['ADMIN'] }, component: () => import('../components/views/Employee.vue') },
        { path: 'admin', meta: { title: '管理员信息', roles: ['ADMIN'] }, component: () => import('../components/views/Admin.vue') },
        { path: 'person', meta: { title: '个人信息', roles: ['ADMIN', 'EMP'] }, component: () => import('../components/views/Person.vue') },
        { path: 'article', meta: { title: '文章信息', roles: ['ADMIN'] }, component: () => import('../components/views/Article.vue') },
        { path: 'password', meta: { title: '修改密码', roles: ['ADMIN', 'EMP'] }, component: () => import('../components/views/Password.vue') },
        { path: 'department', meta: { title: '部门信息', roles: ['ADMIN'] }, component: () => import('../components/views/Department.vue') },
      ]
    },
    { path: '/login', name: 'Login', meta: { title: '登录' }, component: () => import('../components/views/Login.vue') },
    { path: '/register', name: 'Register', meta: { title: '注册' }, component: () => import('../components/views/Register.vue') },
    { path: '/404', name: 'NotFount', meta: { title: '404' }, component: () => import('../components/views/404.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/404' }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  
  const userStore = useUserStore()
  
  // 检查是否需要登录和是否存在角色
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
    return
  }
  
  // 检查角色权限
  if (to.meta.roles) {
    const userRole = userStore.userRole
    if (!userRole || !to.meta.roles.includes(userRole)) {
      next('/404')
      return
    }
  }
  
  next()
})

export default router
>>>>>>> c0a64c83aee6dd6363c32cb780aae9bc3415dcce
