import Layout from '@/views/layout.vue'
import bigdata from '@/views/bigdata/bigdata.vue'
export const routerMap = [
  {path: '/',
    // alias: '/home_page',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '响应式布局'
        },
        component: () => import('@/views/FirstHome/FirstHome.vue')
      }
    ]
  },
  {
    path: '/optimize',
    name: 'optimize',
    component: Layout,
    meta: {
      title: 'optimize'
    },
    children: [
      {
        path: 'optimize',
        name: 'optimize',
        meta: {
          title: 'optimize'
        },
        component: () => import('@/views/optimize.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        props: {
          food: 'banana'
        },
        meta: {
          title: '关于'
        }
      },
      {
        path: '/count-to',
        name: 'count_to',
        meta: {
          title: 'count_to'
        },
        component: () => import('@/views/count-to.vue')
      },
      {
        path: '/menu_page',
        name: 'menu_page',
        meta: {
          title: 'menu_page'
        },
        component: () => import('@/views/menu-page.vue')
      },
      {
        path: '/upload',
        name: 'upload',
        meta: {
          title: 'upload'
        },
        component: () => import('@/views/upload.vue')
      },
      {
        path: '/form',
        name: 'form',
        meta: {
          title: 'form'
        },
        component: () => import('@/views/form.vue')
      }
    ]
  },
  {
    path: '/component',
    name: 'component',
    component: Layout,
    meta: {
      title: '表格'
    },
    children: [
      {
        path: 'table',
        name: 'table_page',
        meta: {
          title: '表格'
        },
        component: () => import('@/views/table.vue')
      },
      {
        path: 'folder_tree',
        name: 'folder_tree',
        meta: {
          title: '文件夹'
        },
        component: () => import('@/views/folder-tree/folder-tree.vue')
      },
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          title: '参数'
        },
        component: () => import('@/views/argu.vue')
      }
    ]
  },
  {
    path: '/render_page',
    name: 'render_page',
    meta: {
      title: 'render_page'
    },
    component: () => import('@/views/render-page.vue')
  },
  {
    path: '/split-pane',
    name: 'split_pane',
    meta: {
      title: 'split_pane'
    },
    component: () => import('@/views/split-pane.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    meta: {
      title: 'parent'
    },
    component: () => import('@/views/parent.vue'),
    children: [
      {
        path: 'child',
        name: 'child',
        meta: {
          title: 'child'
        },
        component: () => import('@/views/child.vue')
      }
    ]
  },
  {
    path: '/named_view',
    name: 'named_view',
    meta: {
      title: 'named_view'
    },
    components: {
      default: () => import('@/views/child.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      title: 'main'
    },
    redirect: to => '/'
  },
  {
    path: '/store',
    name: 'store',
    meta: {
      title: 'sotre'
    },
    component: () => import('@/views/store.vue')
  },
  {
    path: '/data',
    name: 'data',
    meta: {
      title: '数据优化'
    },
    component: Layout,
    children: [
      {
        path: 'bigdata',
        name: 'bigdata',
        meta: {
          title: '大数据表格性能优化'
        },
        component: bigdata
      }
    ]
  }
]

export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/icon_page',
    name: 'icon_page',
    meta: {
      title: '图标'
    },
    component: () => import('@/views/icon_page.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
