import Layout from '@/views/layout.vue'
import bigdata from '@/views/bigdata/bigdata.vue'
export const routerMap = [
  {path: '/',
    // alias: '/home_page',
    name: 'home',
    meta: {
      title: '首页',
      icon:'md-add'
    },
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '响应式布局',
          icon:'md-add'
        },
        component: () => import('@/views/FirstHome/FirstHome.vue')
      }
    ]
  },
  {
    path:'/join',
    name:'join',
    meta:{
      name:'加入我们',
      icon:'md-add'
    },
    component:Layout,
    children:[
      {
        path:'/about',
        name:'about',
        meta:{
          title:'关于',
          icon:'md-add'
        },
        component:()=>import('@/views/about/about.vue')
      }
    ]
  },
  {
    path: '/realData',
    name: 'realData',
    meta: {
      title: '实时数据'
    },
    component: Layout,
    children: [
      {
        path: 'dataWatch',
        name: 'dataWatch',
        meta: {
          title: '实时数据监控',
          icon:'md-add'
        },
        component: ()=>import('@/views/DataWatch/dataWatch.vue')
      }
    ]
  },
  {
    path: '/optimize',
    name: 'optimize',
    component: Layout,
    meta: {
      title: 'optimize',
      icon:'md-add'
    },
    children: [
      {
        path: 'optimize',
        name: 'optimize',
        meta: {
          title: 'optimize',
          icon:'md-add'
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
          title: '关于',
          icon:'md-add'
        }
      },
      {
        path: '/count-to',
        name: 'count_to',
        meta: {
          title: 'count_to',
          icon:'md-add'
        },
        component: () => import('@/views/count-to.vue')
      },
      {
        path: '/menu_page',
        name: 'menu_page',
        meta: {
          title: 'menu_page',
          icon:'md-add'
        },
        component: () => import('@/views/menu-page.vue')
      },
      {
        path: '/upload',
        name: 'upload',
        meta: {
          title: 'upload',
          icon:'md-add'
        },
        component: () => import('@/views/upload.vue')
      },
      {
        path: '/form',
        name: 'form',
        meta: {
          title: 'form',
          icon:'md-add'
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
      title: '表格列表',
      icon:'md-add'
    },
    children: [
      {
        path: 'table',
        name: 'table_page',
        meta: {
          title: '表格',
          icon:'md-add'
        },
        component: () => import('@/views/table.vue')
      },
      {
        path: 'folder_tree',
        name: 'folder_tree',
        meta: {
          title: '文件夹',
          icon:'md-add'
        },
        component: () => import('@/views/folder-tree/folder-tree.vue')
      },
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          title: '参数',
          icon:'md-add'
        },
        component: () => import('@/views/argu.vue')
      }
    ]
  },
  {
    path: '/render_page',
    name: 'render_page',
    meta: {
      title: 'render_page',
      icon:'md-add'
    },
    component: () => import('@/views/render-page.vue')
  },
  {
    path: '/split-pane',
    name: 'split_pane',
    meta: {
      title: 'split_pane',
      icon:'md-add'
    },
    component: () => import('@/views/split-pane.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    meta: {
      title: 'parent',
      icon:'md-add'
    },
    component: () => import('@/views/parent.vue'),
    children: [
      {
        path: 'child',
        name: 'child',
        meta: {
          title: 'child',
          icon:'md-add'
        },
        component: () => import('@/views/child.vue')
      }
    ]
  },
  {
    path: '/named_view',
    name: 'named_view',
    meta: {
      title: 'named_view',
      icon:'md-add'
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
      title: 'main',
      icon:'md-add'
    },
    redirect: to => '/'
  },
  {
    path: '/store',
    name: 'store',
    meta: {
      title: 'sotre',
      icon:'md-add'
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
          title: '大数据表格性能优化',
          icon:'md-add'
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
      title: '图标',
      icon:'md-add'
    },
    component: () => import('@/views/icon_page.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]