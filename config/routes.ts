export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    name: 'Dashboard',
    icon: 'DashboardOutlined',
    path: '/dashboard',
    component: './Dashboard',
  },
  {
    name: 'Manage Property',
    path: '/property',
    component: './ManageProperty',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
